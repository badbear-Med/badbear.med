"""Reconstruye la edición ampliada de WAJOMEÍSMO MASCULINO con Python estándar."""
from pathlib import Path
import json,html
ROOT=Path(__file__).resolve().parents[1]
BOOK=ROOT/'wajomeismo-masculino'
data=json.loads((BOOK/'contenido.json').read_text(encoding='utf-8'))
growth=json.loads((BOOK/'crecimiento.json').read_text(encoding='utf-8'))
sections=data['sections']
e=html.escape
def word_count(value):
    if isinstance(value,str): return len(value.split())
    if isinstance(value,list): return sum(word_count(item) for item in value)
    if isinstance(value,dict): return sum(word_count(item) for item in value.values())
    return 0

for section in sections:
    section['minutes']=max(1,round((section['words']+word_count(growth.get(str(section['number']),{})))/180))

def growth_content(number):
    g=growth[str(number)]
    method=''.join(f'<li><strong>{e(title)}</strong><p>{e(text)}</p></li>' for title,text in g['method'])
    opportunities=''.join(f'<div><h4>{e(title)}</h4><p>{e(text)}</p></div>' for title,text in g['opportunities'])
    rows=''.join(f'<tr><th scope="row">{e(day)}</th><td>{e(action)}</td><td>{e(result)}</td></tr>' for day,action,result in g['plan'])
    questions=''.join(f'<li>{e(q)}</li>' for q in g['questions'])
    explanation=''.join(f'<p>{e(p)}</p>' for p in g['deepening'])
    return f'''<section class="chapter-expansion" id="desarrollo" aria-labelledby="growth-title">
<header class="growth-header"><p class="eyebrow">DESARROLLO Y APLICACIÓN · BADBEAR.BOOKS</p><h2 id="growth-title">{e(g['title'])}</h2><p class="growth-purpose"><strong>Objetivo de crecimiento:</strong> {e(g['purpose'])}</p><p class="growth-label">Ampliación editorial añadida a esta edición. El texto original se conserva en el apartado anterior.</p></header>
<div class="book-text growth-text"><h3>Profundizar la idea</h3>{explanation}
<h3>Cómo llevarla a la práctica</h3><ol class="growth-method">{method}</ol>
<div class="growth-case"><h3>Ejemplo aplicado</h3><p>{e(g['case'])}</p></div>
<h3>Oportunidades para crecer</h3><div class="growth-opportunities">{opportunities}</div>
<section class="growth-exercise"><h3>Ejercicio: {e(g['exercise'][0])}</h3><p>{e(g['exercise'][1])}</p><p class="growth-deliverable">Deja por escrito tu respuesta y un siguiente paso que puedas comprobar.</p></section>
<h3 id="plan-de-crecimiento">Plan de acción de siete días</h3><p>Trabaja un capítulo por vez. Este plan propone una práctica gradual que puedes ajustar a tus compromisos.</p>
<div class="growth-table-wrap"><table class="growth-plan"><caption>Aplicación del capítulo {number:02d}</caption><thead><tr><th scope="col">Día</th><th scope="col">Acción</th><th scope="col">Resultado esperado</th></tr></thead><tbody>{rows}</tbody></table></div>
<h3>Preguntas para evaluar tu avance</h3><ul class="growth-questions">{questions}</ul>
<div class="growth-principle"><strong>Idea para llevar contigo</strong><p>{e(g['principle'])}</p></div></div></section>'''

def header():
    return '''<a class="skip" href="#contenido">Ir al contenido</a>
<header class="site-header"><a class="brand" href="../../index.html">WAJOMEA.<b>GROUP</b></a>
<nav aria-label="Navegación del portal"><a href="../../index.html">Inicio</a><a href="../../badbear-med.html">Medicina</a><a href="../../badbear-music/index.html">Música</a><a href="../index.html" aria-current="page">Libros</a></nav></header>'''

def footer():
    return '<footer class="site-footer"><strong>BADBEAR.BOOKS</strong><span>Una publicación de WAJOMEA.GROUP</span><a href="../index.html">Volver a la biblioteca</a></footer>'

def toc(active=None):
    out='<ol class="toc-list">'
    for s in sections:
        label='Apertura' if s['number']==0 else 'Epílogo' if s['number']==34 else f"{s['number']:02d}"
        current=' aria-current="page"' if active==s['number'] else ''
        out+=f'<li><a href="{s["file"]}"{current}><span class="toc-number">{label}</span><span>{e(s["title"])}</span><small>{s["minutes"]} min</small></a></li>'
    return out+'</ol>'

def page(title,body,description,attrs=''):
    return f'''<!doctype html>
<html lang="es" class="books-access-pending"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>html.books-access-pending #books-page{{display:none!important}}</style>
<title>{e(title)} | BADBEAR.BOOKS</title><meta name="description" content="{e(description)}">
<meta name="theme-color" content="#fffaf3"><link rel="stylesheet" href="../wajomeismo-puro/lector.css?v=20261004-growth1">
<link rel="stylesheet" href="../acceso.css?v=20261004-books-lock2">
<script src="../acceso-config.js?v=20261004-books-lock2" defer></script>
<script src="../acceso.js?v=20261004-books-lock2" defer></script>
<link rel="stylesheet" href="../audiolibro.css?v=20261007-audio1">
<script src="../audiolibro.js?v=20261007-audio1" defer></script>
<script src="lector.js?v=20261007-masculino1" defer></script></head><body {attrs}>
<div id="books-access-loading" class="books-access-loading" role="status">Preparando el acceso a BADBEAR.BOOKS…</div>
<noscript><p class="books-nojs">Activa JavaScript para verificar la clave de acceso a nuestra biblioteca.</p></noscript>
<div id="books-page">{header()}{body}{footer()}</div></body></html>'''

total_minutes=sum(s['minutes'] for s in sections)
def label(s):
    return 'Apertura' if s['number']==0 else 'Epílogo' if s['number']==34 else f"Capítulo {s['number']:02d}"

index=f'''<main id="contenido" class="book-home">
<div class="breadcrumb"><a href="../index.html">BADBEAR.BOOKS</a><span> / </span><span>WAJOMEÍSMO MASCULINO</span></div>
<section class="book-hero" aria-labelledby="book-title"><div class="cover-wrap"><img src="portada.jpeg" width="677" height="1024" alt="Portada original de WAJOMEÍSMO MASCULINO: tratado del hombre wajomeísta"></div>
<div class="book-presentation"><p class="eyebrow">SEGUNDA PUBLICACIÓN · EDICIÓN AMPLIADA</p><h1 id="book-title">WAJOMEÍSMO<br><span>MASCULINO</span></h1><p class="subtitle">{e(data['subtitle'])}</p><p class="book-description">La segunda rama del Wajomeísmo: soledad, criterio, disciplina, vínculos y legado. Lee la apertura, los treinta y tres capítulos y el epílogo, con un desarrollo propio en cada capítulo para reflexionar, practicar y revisar tus decisiones.</p>
<div class="book-facts"><span>33 capítulos completos</span><span>Apertura y epílogo</span><span>33 planes de crecimiento</span><span>Lectura en audio</span><span>≈ {total_minutes} min de lectura</span></div>
<p class="publisher">Autor que figura en la portada: <strong>WAJHOUMEA</strong><br>Una publicación de <strong>WAJOMEA.GROUP</strong> · <strong>BADBEAR.BOOKS</strong></p>
<div class="actions"><a class="button primary" href="apertura.html">Comenzar a leer →</a><a class="button secondary" href="apertura.html#audiolibro">Escuchar el libro</a><a class="button secondary" href="#indice">Ver capítulos</a><a class="button secondary" href="guia-de-lectura.html">Guía de lectura</a><a class="button resume" data-resume hidden href="apertura.html">Continuar lectura</a></div></div></section>
<section id="indice" class="index-panel" aria-labelledby="index-title"><div class="section-heading"><div><p class="eyebrow">ELIGE TU PUNTO DE PARTIDA</p><h2 id="index-title">Índice de la obra</h2></div><p>Lee o escucha cada capítulo en su propia página.<br>Elige texto original, desarrollo o capítulo completo.</p></div>{toc()}</section>
<section class="growth-overview"><p class="eyebrow">DE LA IDEA A UNA DECISIÓN CONCRETA</p><h2>Un desarrollo en cada capítulo</h2><div class="growth-overview-grid"><div><strong>Comprender con criterio</strong><p>Explicaciones que distinguen ideas, metáforas y decisiones prácticas.</p></div><div><strong>Reconocer oportunidades</strong><p>Ejemplos y métodos adaptados a cada tema de la obra.</p></div><div><strong>Practicar y revisar</strong><p>Ejercicio, plan de siete días y preguntas para evaluar tu avance.</p></div></div><a class="button secondary" href="capitulo-01.html#desarrollo">Explorar el desarrollo del capítulo 1 →</a></section>
<section class="edition-note"><h2>Sobre esta edición digital</h2><p>El texto original se conserva en su orden, con la apertura, los capítulos 1 a 33 y el epílogo. El capítulo 25, ausente del índice preliminar del PDF, sí está desarrollado en la obra y se incorpora al índice de esta edición. Se retiran los números de página, el índice preliminar con referencias incompletas y las páginas sin texto de lectura.</p><p>Las ampliaciones se identifican como <strong>Desarrollo y aplicación</strong> y se mantienen separadas del original. Esta obra es un ensayo de opinión; las imágenes de medicina e ingeniería forman parte de su lenguaje. La <a href="guia-de-lectura.html">guía de lectura</a> ofrece herramientas para examinar las ideas con criterio propio.</p><p>El botón <strong>Escuchar el libro</strong> abre la lectura automática en español. Puedes elegir contenido, voz y velocidad, pausar, reanudar y cambiar de fragmento. La disponibilidad de voces depende de tu dispositivo.</p></section></main>'''
(BOOK/'index.html').write_text(page(data['title'],index,'Lee y escucha WAJOMEÍSMO MASCULINO: apertura, 33 capítulos, epílogo y desarrollos de BADBEAR.BOOKS.', 'data-book="wajomeismo-masculino"'),encoding='utf-8')

for pos,s in enumerate(sections):
    n=s['number']; section_label=label(s)
    prev=sections[pos-1] if pos else None
    nxt=sections[pos+1] if pos+1<len(sections) else None
    content='\n'.join(f'<{b["tag"]}>{b["html"]}</{b["tag"]}>' for b in s['blocks'])
    previous=f'<a href="{prev["file"]}"><small>← Anterior</small>{e(prev["title"])}</a>' if prev else '<a href="index.html"><small>← Presentación</small>Sobre el libro</a>'
    following=f'<a href="{nxt["file"]}"><small>Siguiente →</small>{e(nxt["title"])}</a>' if nxt else '<a href="guia-de-lectura.html"><small>Continúa explorando →</small>Guía de lectura</a>'
    expansion=growth_content(n) if 1<=n<=33 else ''
    jumps='<nav class="reading-sections" aria-label="Apartados de este capítulo"><a href="#texto-original">Texto original</a><a href="#desarrollo">Desarrollo y crecimiento</a><a href="#plan-de-crecimiento">Plan de siete días</a><a href="#audiolibro">Escuchar capítulo</a></nav>' if expansion else '<nav class="reading-sections" aria-label="Apartados"><a href="#texto-original">Texto original</a><a href="#audiolibro">Escuchar</a></nav>'
    body=f'''<main id="contenido" class="reader-shell"><div class="breadcrumb"><a href="../index.html">BADBEAR.BOOKS</a><span> / </span><a href="index.html">WAJOMEÍSMO MASCULINO</a></div>
<div class="reader-layout"><aside class="reader-sidebar"><a class="book-mini" href="index.html"><img src="portada.jpeg" width="677" height="1024" alt="Portada de WAJOMEÍSMO MASCULINO"><span><strong>WAJOMEÍSMO MASCULINO</strong><small>Índice y presentación</small></span></a><details class="chapter-menu" open><summary>Capítulos del libro</summary>{toc(n)}<a class="guide-link" href="guia-de-lectura.html">Guía de lectura →</a></details></aside>
<div class="reading-column"><div class="reader-tools" aria-label="Preferencias de lectura"><div class="text-size"><span>Tamaño del texto</span><button type="button" data-font="-1" aria-label="Reducir tamaño del texto">A−</button><button type="button" data-font="1" aria-label="Aumentar tamaño del texto">A+</button></div><label>Tono de página <select id="paper"><option value="light">Claro</option><option value="warm">Cálido</option></select></label><output id="read-status" aria-live="polite">Lectura en línea</output></div>
<article class="chapter" aria-labelledby="chapter-title"><header class="chapter-header"><p class="eyebrow">{'LECTURA AMPLIADA' if expansion else 'TEXTO ORIGINAL'} · {section_label.upper()}</p><h1 id="chapter-title">{e(s['title'])}</h1><p class="chapter-meta">{s['minutes']} min de lectura · WAJOMEA.GROUP</p>{jumps}<div class="progress-track" aria-hidden="true"><span data-progress></span></div></header><div class="original-label" id="texto-original">Texto original del libro</div><div class="book-text">{content}</div>{expansion}</article>
<nav class="chapter-navigation" aria-label="Capítulo anterior y siguiente">{previous}{following}</nav><a class="back-index" href="index.html#indice">Ver el índice completo ↑</a></div></div></main>'''
    attrs=f'data-book="wajomeismo-masculino" data-chapter="{n}" data-chapter-title="{e(s["title"])}"'
    (BOOK/s['file']).write_text(page(f'{section_label}: {s["title"]}',body,f'{section_label} de WAJOMEÍSMO MASCULINO. Lee y escucha en BADBEAR.BOOKS.',attrs),encoding='utf-8')

guide='''<main id="contenido" class="guide-page"><div class="breadcrumb"><a href="../index.html">BADBEAR.BOOKS</a><span> / </span><a href="index.html">WAJOMEÍSMO MASCULINO</a></div><article class="guide-article"><header class="chapter-header"><p class="eyebrow">AMPLIACIÓN EDITORIAL · BADBEAR.BOOKS</p><h1>Guía de lectura y práctica</h1><p class="subtitle">Examina las ideas y elige una acción que puedas sostener.</p></header><div class="book-text">
<h2>Leer la obra en dos capas</h2><p>El apartado «Texto original del libro» conserva la voz del ensayo. «Desarrollo y aplicación» ofrece una ampliación editorial independiente. Puedes leer ambos en orden o trabajar primero el original y regresar después a sus ejercicios. El índice sigue los treinta y tres capítulos desarrollados, incluido el capítulo 25.</p>
<h2>Idea, metáfora y afirmación</h2><p>La obra usa imágenes de cirugía, biología e ingeniería para expresar separación, estabilidad, energía y reconstrucción. Distingue el efecto expresivo de una metáfora de la información necesaria para demostrar una afirmación. Una comparación entre un vínculo y una estructura no convierte a una persona en un material ni establece un diagnóstico.</p><p>En las aplicaciones, trabaja con lo que puedes observar: acuerdos, horarios, decisiones y conductas. Cuando una frase propone una explicación científica, reconoce que necesitaría comprobación independiente antes de emplearse como fundamento de una decisión clínica. La lectura de un ensayo no sustituye esa comprobación.</p>
<div class="exercise"><strong>Tres preguntas para un párrafo</strong><p>¿Qué afirma? ¿Qué razones ofrece? ¿Qué parte corresponde a una metáfora, una opinión o un hecho que habría que verificar?</p></div>
<h2>Autonomía que admite relaciones responsables</h2><p>Para aplicar una reflexión sobre límites, empieza por tu propia participación: qué deseas, qué puedes ofrecer y qué decisión te corresponde. Escucha también las expectativas del otro. Consentimiento, privacidad y respeto de las negativas permiten que ambos decidan libremente.</p><p>Las conductas particulares ofrecen información más precisa que una etiqueta general. Examina lo que una persona hace, las circunstancias y la forma de resolver diferencias. Puedes reconocer incompatibilidad sin asignar una conclusión global sobre el valor de alguien.</p>
<h2>Un capítulo y una práctica por vez</h2><p>Elige el capítulo más relacionado con una dificultad actual. Lee su original, estudia el método y realiza el ejercicio. Usa el plan de siete días para practicar con un alcance manejable. Registra qué hiciste, qué resultado viste y qué cambiarás. Si una práctica no encaja en tu situación, adapta su duración o elige otra.</p><div class="exercise"><strong>Cuaderno de lectura</strong><p>Para cada capítulo, escribe una idea que deseas conservar, una afirmación que necesitas examinar y una acción que probarás. Al final de la semana añade el resultado y tu siguiente ajuste.</p></div>
<h2>Escuchar el texto y su desarrollo</h2><p>Abre la apertura o un capítulo y busca el panel «Audiolibro». «Texto original» conserva la escucha de la obra; «Desarrollo y aplicación» reproduce la ampliación; «Capítulo completo» reúne ambos. Pulsa «Escuchar capítulo» para comenzar. Puedes pausar, reanudar, cambiar de voz o velocidad y elegir una posición por fragmentos.</p><p>La lectura usa las voces de tu dispositivo y necesita mantener la página abierta. Su punto de escucha se conserva localmente cuando el navegador permite almacenamiento. La posición se expresa en fragmentos de texto, no en una duración de grabación. Cada capítulo se inicia desde su propia página.</p>
<h2>Revisión al terminar la obra</h2><p>Reúne las decisiones que probaste. Elige tres prácticas que hayan tenido un resultado útil y define cómo continuarán el próximo mes. Identifica también las ideas con las que no coincides y explica tus razones. La lectura con criterio propio permite aprender, cuestionar y construir una aplicación personal.</p></div><nav class="chapter-navigation" aria-label="Continuar lectura"><a href="index.html#indice"><small>← Volver</small>Índice del libro</a><a href="apertura.html#audiolibro"><small>Escuchar →</small>Apertura de la obra</a></nav></article></main>'''
(BOOK/'guia-de-lectura.html').write_text(page('Guía de lectura y práctica',guide,'Guía de lectura de WAJOMEÍSMO MASCULINO, BADBEAR.BOOKS.'),encoding='utf-8')
print('WAJOMEÍSMO MASCULINO:',len(sections),'secciones,',len(growth),'desarrollos,',total_minutes,'minutos de lectura.')
