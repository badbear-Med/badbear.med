export const API = "https://badbear-campus-api.wajomea-group.workers.dev";
export async function call(path, token = "", options = {}) {
  let result;
  try { result = await fetch(API+path, {...options,credentials:"omit",cache:"no-store",headers:{...(token?{Authorization:"Bearer "+token}:{}),...options.headers},signal:AbortSignal.timeout(20000)}); }
  catch { throw new Error("No se pudo conectar con el portal. Inténtalo nuevamente en unos minutos."); }
  const data = await result.json().catch(()=>({}));
  if (!result.ok) { const error = new Error(data.error||"No se completó la operación."); error.status=result.status; throw error; }
  return data;
}
export const post = (path, token, data) => call(path,token,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
export const $ = id => document.getElementById(id);
export function message(text, kind="") { $("status").textContent=text; $("status").className="status "+kind; }
export async function availability() {
  const badge=$("service"); try { const data=await call("/api/health"); badge.textContent=data.estado==="operativo"?"Portal disponible":"Conexión en preparación"; badge.classList.toggle("ready",data.estado==="operativo"); }
  catch { badge.textContent="Conexión en preparación"; }
}
export function table(columns, rows, caption="") {
  const wrap=document.createElement("div");wrap.className="table-wrap";const tab=document.createElement("table");
  if(caption){const cap=document.createElement("caption");cap.textContent=caption;tab.append(cap)}
  const head=document.createElement("thead"),tr=document.createElement("tr");
  for(const column of columns){const th=document.createElement("th");th.scope="col";th.textContent=column.label;tr.append(th)}head.append(tr);tab.append(head);
  const body=document.createElement("tbody");for(const row of rows){const line=document.createElement("tr");for(const col of columns){const cell=document.createElement("td");cell.textContent=String(row[col.key]??"");if(col.key==="nota")cell.className="grade";line.append(cell)}body.append(line)}tab.append(body);wrap.append(tab);return wrap;
}
export async function busy(action) {
  const buttons=[...document.querySelectorAll("button")],previous=buttons.map(x=>x.disabled);buttons.forEach(x=>x.disabled=true);
  try { await action(); } catch(error) { message(error.message,"error"); }
  finally { buttons.forEach((x,i)=>x.disabled=previous[i]); }
}
