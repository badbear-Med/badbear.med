(function(){
  "use strict";

  const estadoNuevo = new WeakMap();
  const urlsUsadas = new Set();
  const cacheBusquedas = new Map();
  let colaCommons = Promise.resolve();

  function normalizarBB(texto=""){
    return String(texto)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/[^a-z0-9\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function palabrasClave(texto){
    const stop = new Set([
      "clinical","photograph","photo","dermatology","dermatological","skin",
      "cutaneous","patient","patients","case","lesion","lesions","real"
    ]);
    return normalizarBB(texto)
      .split(" ")
      .filter(p => p.length > 2 && !stop.has(p));
  }

  function variantesBusqueda(item){
    const original = String(item?.busqueda || "").trim();
    const claves = palabrasClave(original);
    const base = claves.join(" ");
    const titulo = String(item?.titulo || "").trim();

    const variantes = [
      base,
      original,
      `${base} dermatology`,
      `${base} patient`,
      titulo,
      `${titulo} dermatology`
    ];

    return [...new Set(
      variantes
        .map(x => x.replace(/\s+/g," ").trim())
        .filter(Boolean)
    )];
  }

  function puntuacion(pagina, termino){
    const titulo = normalizarBB(pagina.title || "");
    const meta = pagina.imageinfo?.[0]?.extmetadata || {};
    const descripcion = normalizarBB(meta.ImageDescription?.value || "");
    const texto = `${titulo} ${descripcion}`;
    const claves = palabrasClave(termino);
    let score = 0;

    claves.forEach(p => {
      if(titulo.includes(p)) score += 7;
      if(descripcion.includes(p)) score += 3;
    });

    if(/dermat|skin|cutaneous|patient|clinical|eruption|rash|plaque|papule|vesicle|blister|pustule|ulcer|scabies|psoriasis|herpes|acne|vitiligo|melasma|urticaria|impetigo/.test(texto)) score += 5;

    if(/histolog|microscop|pathology slide|stain|diagram|drawing|illustration|scheme|map|logo|icon|chart|radiograph|x-ray|gross specimen/.test(texto)) score -= 35;

    const info = pagina.imageinfo?.[0] || {};
    const ancho = Number(info.width || 0);
    const alto = Number(info.height || 0);
    if(ancho >= 800 && alto >= 500) score += 3;
    if(ancho >= 1200 && alto >= 800) score += 2;

    return score;
  }

  async function consultaCommons(termino){
    const url = new URL("https://commons.wikimedia.org/w/api.php");
    url.searchParams.set("action","query");
    url.searchParams.set("generator","search");
    url.searchParams.set("gsrsearch",termino);
    url.searchParams.set("gsrnamespace","6");
    url.searchParams.set("gsrlimit","40");
    url.searchParams.set("prop","imageinfo");
    url.searchParams.set("iiprop","url|mime|size|extmetadata");
    url.searchParams.set("iiurlwidth","1200");
    url.searchParams.set("format","json");
    url.searchParams.set("origin","*");

    const res = await fetch(url.toString(), { cache:"no-store" });
    if(!res.ok) throw new Error(`Commons ${res.status}`);
    const data = await res.json();
    const paginas = Object.values(data.query?.pages || {});

    return paginas
      .filter(p => {
        const info = p.imageinfo?.[0];
        if(!info) return false;
        if(!/^image\/(jpeg|png|webp)$/i.test(info.mime || "")) return false;
        if((info.width || 0) < 300 || (info.height || 0) < 220) return false;
        return true;
      })
      .map(p => ({
        page:p,
        score:puntuacion(p, termino),
        url:p.imageinfo[0].thumburl || p.imageinfo[0].url,
        source:p.imageinfo[0].descriptionurl || "https://commons.wikimedia.org/",
        title:p.title || "Wikimedia Commons"
      }))
      .filter(x => x.score > -10)
      .sort((a,b) => b.score - a.score);
  }

  async function buscarRobusto(item){
    const clave = `${item?.titulo || ""}|${item?.busqueda || ""}`;
    if(cacheBusquedas.has(clave)) return cacheBusquedas.get(clave);

    const promesa = (async()=>{
      const vistos = new Set();
      const unidos = [];
      const variantes = variantesBusqueda(item);

      for(const termino of variantes){
        let resultados = [];
        try{
          resultados = await consultaCommons(termino);
        }catch(e){
          await new Promise(r => setTimeout(r, 450));
          try{
            resultados = await consultaCommons(termino);
          }catch(e2){
            resultados = [];
          }
        }

        for(const r of resultados){
          if(!r.url || vistos.has(r.url)) continue;
          vistos.add(r.url);
          unidos.push(r);
        }

        if(unidos.length >= 10) break;
        await new Promise(r => setTimeout(r, 180));
      }

      return unidos.sort((a,b)=>b.score-a.score).slice(0,24);
    })();

    cacheBusquedas.set(clave, promesa);
    return promesa;
  }

  function enCola(tarea){
    const siguiente = colaCommons.then(tarea, tarea);
    colaCommons = siguiente.catch(()=>{});
    return siguiente;
  }

  function siguienteIndice(resultados, inicio){
    if(!resultados.length) return -1;

    for(let salto=1; salto<=resultados.length; salto++){
      const idx = (inicio + salto + resultados.length) % resultados.length;
      if(!urlsUsadas.has(resultados[idx].url)) return idx;
    }

    return (inicio + 1 + resultados.length) % resultados.length;
  }

  function cargarURL(img, url){
    return new Promise(resolve => {
      const ok = () => limpiar(true);
      const error = () => limpiar(false);
      const limpiar = resultado => {
        img.removeEventListener("load", ok);
        img.removeEventListener("error", error);
        resolve(resultado);
      };
      img.addEventListener("load", ok, { once:true });
      img.addEventListener("error", error, { once:true });
      img.src = url;
    });
  }

  window.buscarCommons = async function(termino){
    return consultaCommons(termino);
  };

  window.cargarImagen = async function(card, item, avanzar=false){
    if(!card || !item) return;

    const img = card.querySelector(".atlas-imagen");
    const loading = card.querySelector(".atlas-loading");
    const source = card.querySelector(".atlas-fuente");
    const boton = card.querySelector(".atlas-otra");
    if(!img || !loading || !source) return;

    let estado = estadoNuevo.get(card);

    try{
      if(boton) boton.disabled = true;
      loading.style.display = "flex";
      loading.textContent = estado && estado.resultados?.length
        ? "Cargando otra fotografía clínica…"
        : "Buscando fotografías clínicas reales…";

      if(!estado || !Array.isArray(estado.resultados) || !estado.resultados.length){
        const resultados = await enCola(() => buscarRobusto(item));
        estado = { resultados, indice:-1 };
        estadoNuevo.set(card, estado);
      }

      if(!estado.resultados.length) throw new Error("sin-resultados");

      let indiceObjetivo = estado.indice;
      if(indiceObjetivo < 0 || avanzar){
        indiceObjetivo = siguienteIndice(estado.resultados, indiceObjetivo);
      }

      let cargada = false;
      let intentos = 0;
      let actual = null;

      while(intentos < estado.resultados.length && !cargada){
        actual = estado.resultados[indiceObjetivo];
        cargada = await cargarURL(img, actual.url);
        if(!cargada){
          indiceObjetivo = siguienteIndice(estado.resultados, indiceObjetivo);
        }
        intentos++;
      }

      if(!cargada || !actual) throw new Error("imagenes-no-cargables");

      estado.indice = indiceObjetivo;
      urlsUsadas.add(actual.url);

      loading.style.display = "none";
      img.classList.add("cargada");
      img.alt = `${item.titulo} — ${actual.title.replace(/^File:/i,"")}`;
      source.href = actual.source;
      source.textContent = "Fuente de la fotografía · Wikimedia Commons →";
    }catch(e){
      estadoNuevo.delete(card);
      img.classList.remove("cargada");
      loading.style.display = "flex";
      loading.textContent = "No se encontró una fotografía adecuada. Pulsa ‘Otra imagen’ para reintentar.";
      source.href = `https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=${encodeURIComponent(item.busqueda || item.titulo)}`;
      source.textContent = "Buscar manualmente en Wikimedia Commons →";
    }finally{
      if(boton) boton.disabled = false;
    }
  };
})();
