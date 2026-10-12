// CSV UTF-8 with comma/semicolon delimiters, escaped quotes and quoted line breaks.
function readCSV(text,expected) {
  text=text.replace(/^\uFEFF/,"");if(!text.trim())throw Error("El archivo está vacío.");
  let comma=0,semi=0,quote=false;for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quote&&text[i+1]==='"'){i++;continue}quote=!quote}else if(!quote){if(c==='\n'||c==='\r')break;if(c===',')comma++;if(c===';')semi++}}
  const delimiter=semi>comma?';':',';const records=[];let row=[],field="",quoted=false,closed=false,start=true;
  const finishField=()=>{row.push(field);field="";closed=false;start=true};
  const finishRow=()=>{finishField();if(row.some(x=>x.trim()))records.push(row);row=[];if(records.length>201)throw Error("Máximo 200 filas por archivo.")};
  for(let i=0;i<text.length;i++){
    const c=text[i];if(quoted){if(c==='"'){if(text[i+1]==='"'){field+='"';i++}else{quoted=false;closed=true}}else field+=c;continue}
    if(c==='"'){if(!start)throw Error("Comillas inválidas en el CSV.");quoted=true;start=false;continue}
    if(c===delimiter){finishField();continue}
    if(c==='\n'||c==='\r'){if(c==='\r'&&text[i+1]==='\n')i++;finishRow();continue}
    if(closed){if(c===' '||c==='\t')continue;throw Error("Contenido inesperado después de una celda entre comillas.")}
    field+=c;start=false;
  }
  if(quoted)throw Error("El CSV contiene una celda entre comillas sin cerrar.");finishRow();
  if(records.length<2)throw Error("La lista no contiene datos.");
  const headers=records.shift().map(x=>x.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""));
  if(headers.length!==expected.length||new Set(headers).size!==headers.length||expected.some(x=>!headers.includes(x)))throw Error("Las columnas deben ser: "+expected.join(", ")+".");
  return records.map((record,index)=>{if(record.length!==headers.length)throw Error("Fila "+(index+2)+": número de columnas incorrecto.");return Object.fromEntries(headers.map((key,i)=>[key,record[i].trim()]));});
}
export const parseCSV=text=>readCSV(text,["codigo","nombre","curso","periodo","evaluacion","nota","fecha"]);
export const parseContactsCSV=text=>readCSV(text,["codigo","correo"]);

export const parseRosterCSV=text=>readCSV(text,["apellidos y nombres","codigo de estudiante","telefono","dni","correo institucional"]).map(row=>({nombre:row["apellidos y nombres"],codigo:row["codigo de estudiante"],telefono:row.telefono,dni:row.dni,correo:row["correo institucional"]}));

export function parseSimpleGradesCSV(text){
 const clean=text.replace(/^\uFEFF/,"");
 const first=clean.split(/\r?\n/,1)[0].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
 const names=first.includes("apellidos y nombres")?"apellidos y nombres":first.includes("nombre")?"nombre":null;
 const codeName=first.includes("codigo de estudiante")?"codigo de estudiante":"codigo";
 if(first.includes("codigo")&&names){return readCSV(clean,[codeName,names,"nota"]).map(x=>({codigo:x[codeName],nombre:x[names],nota:x.nota}));}
 if(first.includes("codigo"))return readCSV(clean,[codeName,"nota"]).map(x=>({codigo:x[codeName],nota:x.nota}));
 if(names)return readCSV(clean,[names,"nota"]).map(x=>({nombre:x[names],nota:x.nota}));
 throw Error("Usa Código, Nota; Apellidos y Nombres, Nota; o Código, Apellidos y Nombres, Nota.");
}
