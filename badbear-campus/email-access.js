// Email identity comes exclusively from the administrator's private roster.
const GENERIC = {ok:true,mensaje:"Si tu código tiene un correo registrado, recibirás un enlace para crear o recuperar tu contraseña. Revisa también correo no deseado. Espera dos minutos antes de solicitar otro enlace."};
const DAILY_LIMIT = 90, MONTHLY_LIMIT = 2700;
const windows = time => ({day:Math.floor(time/86400),month:Number(new Date(time*1000).toISOString().slice(0,7).replace('-',''))});
function validEmail(value) {
  if (typeof value !== 'string') return '';
  const email=value.trim().toLowerCase();
  return email.length<=254 && /^[a-z0-9.!#$%&'*+\/=?^_`{|}~-]{1,64}@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/.test(email) ? email : '';
}
export function createEmailAccess({Problem,code,now,random,digest,password,passwordHash}) {
  function configuration(env) {
    const from=validEmail(env.CAMPUS_EMAIL_FROM);
    return !!from && typeof env.RESEND_API_KEY==='string' && /^re_[a-zA-Z0-9_-]{10,}$/.test(env.RESEND_API_KEY);
  }
  async function schema(env) {
    try { return !!await env.DB.prepare("SELECT name FROM pragma_table_info('campus_alumnos') WHERE name='correo'").first(); } catch { return false; }
  }
  async function status(env) {
    const migrated=await schema(env),configured=configuration(env),w=windows(now());
    const counts=migrated ? await env.DB.prepare("SELECT identificador,intentos FROM campus_correo_limites WHERE (identificador='envios:dia' AND ventana=?) OR (identificador='envios:mes' AND ventana=?)").bind(w.day,w.month).all() : {results:[]};
    const last=migrated ? await env.DB.prepare("SELECT detalle,creado_en FROM campus_auditoria WHERE accion='correo_acceso' ORDER BY id DESC LIMIT 1").first() : null;
    return {configurado:configured,esquema:migrated,remitente:configured?validEmail(env.CAMPUS_EMAIL_FROM):'',limite_diario:DAILY_LIMIT,limite_mensual:MONTHLY_LIMIT,enviados_hoy:counts.results.find(x=>x.identificador==='envios:dia')?.intentos||0,enviados_mes:counts.results.find(x=>x.identificador==='envios:mes')?.intentos||0,ultimo_envio:last?{...JSON.parse(last.detalle),fecha:last.creado_en}:null};
  }
  async function preview(items,env) {
    if (!await schema(env)) throw new Problem('Actualiza el servicio de Campus para registrar correos.',503);
    if (!Array.isArray(items)||!items.length||items.length>200) throw new Problem('La lista debe contener entre 1 y 200 alumnos.');
    const codes=new Set(),emails=new Set();
    const clean=items.map((item,i)=>{
      const codigo=code(item?.codigo),correo=validEmail(item?.correo);
      if(!correo)throw new Problem('Fila '+(i+2)+': correo inválido.');
      if(codes.has(codigo)||emails.has(correo))throw new Problem('Fila '+(i+2)+': código o correo repetido.');
      codes.add(codigo);emails.add(correo);return {codigo,correo};
    });
    const registered=await env.DB.prepare("SELECT a.codigo,a.nombre,a.correo AS correo_anterior,json_extract(j.value,'$.correo') AS correo FROM json_each(?) j JOIN campus_alumnos a ON a.codigo=json_extract(j.value,'$.codigo') WHERE a.activo=1").bind(JSON.stringify(clean)).all();
    if(registered.results.length!==clean.length)throw new Problem('Hay códigos sin un alumno activo registrado. Publica primero la lista de alumnos y revisa los códigos.',409);
    const conflicts=await env.DB.prepare("SELECT a.codigo FROM json_each(?) j JOIN campus_alumnos a ON a.correo=json_extract(j.value,'$.correo') WHERE a.codigo<>json_extract(j.value,'$.codigo')").bind(JSON.stringify(clean)).all();
    if(conflicts.results.length)throw new Problem('Un correo ya está asignado a otro alumno. Revisa la lista.',409);
    return {items:registered.results,total:clean.length,cambios:registered.results.filter(x=>x.correo_anterior&&x.correo_anterior!==x.correo)};
  }
  async function save(body,env) {
    const check=await preview(body.items,env);
    if(check.cambios.length&&body.reemplazar!==true)throw new Problem('Autoriza el cambio de los correos existentes después de revisar la vista previa.',409);
    const data=JSON.stringify(check.items);
    // CHECK rejects concurrent unexpected replacements and D1 rolls back the complete batch.
    await env.DB.batch([
      env.DB.prepare("UPDATE campus_alumnos SET correo=CASE WHEN ?=1 OR correo IS NULL OR correo=(SELECT json_extract(value,'$.correo') FROM json_each(?) WHERE json_extract(value,'$.codigo')=campus_alumnos.codigo) THEN (SELECT json_extract(value,'$.correo') FROM json_each(?) WHERE json_extract(value,'$.codigo')=campus_alumnos.codigo) ELSE '' END WHERE codigo IN (SELECT json_extract(value,'$.codigo') FROM json_each(?)) AND activo=1").bind(body.reemplazar===true?1:0,data,data,data),
      env.DB.prepare("INSERT INTO campus_auditoria(accion,detalle) VALUES ('registrar_correos',?)").bind(JSON.stringify({total:check.total,codigos:check.items.map(x=>x.codigo)}))
    ]);
    return {ok:true,registrados:check.total};
  }
  async function counter(env,id,window,limit) {
    return !!await env.DB.prepare('INSERT INTO campus_correo_limites(identificador,ventana,intentos) VALUES (?,?,1) ON CONFLICT(identificador,ventana) DO UPDATE SET intentos=intentos+1 WHERE intentos<? RETURNING intentos').bind(id,window,limit).first();
  }
  async function audit(env,codigo,estado,motivo='') {
    await env.DB.prepare("INSERT INTO campus_auditoria(accion,detalle) VALUES ('correo_acceso',?)").bind(JSON.stringify({codigo,estado,motivo})).run();
  }
  async function send(env,user) {
    const w=windows(now());
    try {
      await env.DB.batch([
        env.DB.prepare("INSERT INTO campus_correo_limites(identificador,ventana,intentos) VALUES ('envios:dia',?,1) ON CONFLICT(identificador,ventana) DO UPDATE SET intentos=intentos+1").bind(w.day),
        env.DB.prepare("INSERT INTO campus_correo_limites(identificador,ventana,intentos) VALUES ('envios:mes',?,1) ON CONFLICT(identificador,ventana) DO UPDATE SET intentos=intentos+1").bind(w.month)
      ]);
    } catch(error) {
      const used=await env.DB.prepare("SELECT identificador,intentos FROM campus_correo_limites WHERE (identificador='envios:dia' AND ventana=?) OR (identificador='envios:mes' AND ventana=?)").bind(w.day,w.month).all();
      if(!used.results.some(x=>x.intentos>=(x.identificador==='envios:dia'?DAILY_LIMIT:MONTHLY_LIMIT)))throw error;
      await audit(env,user.codigo,'pendiente','limite_de_envios');return;
    }
    const token=random(),hashed=await digest(token),expires=now()+1800;
    await env.DB.prepare('INSERT INTO campus_correo_tokens(token_hash,codigo,correo,password_version,expira) VALUES (?,?,?,?,?)').bind(hashed,user.codigo,user.correo,user.password_hash,expires).run();
    const link='https://wajomea.group/badbear-campus/index.html#acceso='+token;
    const purpose=user.password_hash?'Recupera tu contraseña':'Activa tu cuenta';
    const payload={from:'BADBEAR.CAMPUS <'+validEmail(env.CAMPUS_EMAIL_FROM)+'>',to:[user.correo],subject:purpose+' · BADBEAR.CAMPUS',text:purpose+' para el código '+user.codigo+'.\n\n'+link+'\n\nEste enlace vence en 30 minutos y se utiliza una sola vez. Abre el enlace y crea tu contraseña para ingresar al Campus. No compartas este mensaje. Si no solicitaste el acceso, puedes ignorarlo: tu contraseña actual sigue vigente.\n\nBADBEAR.CAMPUS · WAJOMEA.GROUP'};
    let accepted=false,reason='sin_respuesta';
    for(let attempt=0;attempt<3;attempt++) {
      try {
        const reply=await fetch('https://api.resend.com/emails',{method:'POST',redirect:'manual',headers:{Authorization:'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':'campus/'+hashed},body:JSON.stringify(payload),signal:AbortSignal.timeout(8000)});
        reason='HTTP_'+reply.status;
        if(reply.ok) { const data=await reply.json();accepted=typeof data?.id==='string'&&!!data.id;reason=accepted?'':'respuesta_invalida';break; }
        if(reply.status!==429&&reply.status<500)break;
        await reply.body?.cancel();
      } catch { reason='error_de_conexion'; }
      if(attempt<2)await new Promise(resolve=>setTimeout(resolve,1000*(attempt+1)));
    }
    // A timeout may occur after provider acceptance. Keep that emailed link usable until expiry.
    if(!accepted&&reason!=='error_de_conexion')await env.DB.prepare('DELETE FROM campus_correo_tokens WHERE token_hash=?').bind(hashed).run();
    await audit(env,user.codigo,accepted?'aceptado':'fallo',reason);
    // Do not log provider bodies, recipients, API keys or the link.
    if(!accepted)console.error('Campus correo:',reason);
    await env.DB.batch([
      env.DB.prepare('DELETE FROM campus_correo_tokens WHERE expira<?').bind(now()),
      env.DB.prepare("DELETE FROM campus_correo_limites WHERE identificador NOT IN ('envios:dia','envios:mes') AND ((identificador LIKE '%:espera' AND ventana<?) OR (identificador NOT LIKE '%:espera' AND ventana<?))").bind(Math.floor(now()/120)-1440,Math.floor(now()/3600)-48)
    ]);
  }
  async function request(req,body,env,ctx) {
    if(!configuration(env)||!await schema(env))throw new Problem('El acceso por correo está en preparación. Inténtalo más tarde o contacta con administración.',503);
    const codigo=code(body.codigo),time=now();
    const ip=await digest('correo-ip:'+(req.headers.get('CF-Connecting-IP')||'unknown'));
    if(!await counter(env,ip,Math.floor(time/3600),100))throw new Problem('Demasiadas solicitudes. Inténtalo más tarde.',429);
    // Account limits are independent of password-login limits; a recovery request cannot lock login.
    const id=await digest('correo-cuenta:'+codigo);
    if(!await counter(env,id,Math.floor(time/3600),3))return GENERIC;
    if(!await counter(env,id+':espera',Math.floor(time/120),1))return GENERIC;
    const task=(async()=>{
      const user=await env.DB.prepare('SELECT codigo,correo,password_hash FROM campus_alumnos WHERE codigo=? AND activo=1 AND correo IS NOT NULL').bind(codigo).first();
      if(user)await send(env,user);
    })().catch(()=>{console.error('Campus correo: no se completó el envío');});
    // Respond before checking account existence, including on provider failure.
    if(ctx?.waitUntil)ctx.waitUntil(task);else await task;
    return GENERIC;
  }
  async function complete(body,env) {
    const token=typeof body.token==='string'?body.token:'';
    if(!/^[a-f0-9]{64}$/.test(token))throw new Problem('El enlace es inválido o venció. Solicita uno nuevo.',401);
    const pass=password(body.password),hashed=await digest(token);
    const user=await env.DB.prepare('SELECT a.codigo FROM campus_correo_tokens t JOIN campus_alumnos a ON a.codigo=t.codigo AND a.correo=t.correo AND a.password_hash IS t.password_version WHERE t.token_hash=? AND t.expira>? AND a.activo=1').bind(hashed,now()).first();
    if(!user)throw new Problem('El enlace es inválido o venció. Solicita uno nuevo.',401);
    if(pass.toUpperCase()===user.codigo)throw new Problem('Elige una contraseña diferente a tu código de alumno.');
    const salt=random(),hash=await passwordHash(pass,salt,env);
    // The condition is checked again at write time, so simultaneous uses cannot both succeed.
    const updated=await env.DB.prepare('UPDATE campus_alumnos SET password_hash=?,salt=?,correo_verificado=1,invitacion_hash=NULL,invitacion_expira=NULL WHERE codigo=? AND activo=1 AND EXISTS (SELECT 1 FROM campus_correo_tokens t WHERE t.codigo=campus_alumnos.codigo AND t.correo=campus_alumnos.correo AND campus_alumnos.password_hash IS t.password_version AND t.token_hash=? AND t.expira>?) RETURNING codigo').bind(hash,salt,user.codigo,hashed,now()).first();
    if(!updated)throw new Problem('El enlace ya se utilizó o venció. Solicita uno nuevo.',409);
    await env.DB.prepare("INSERT INTO campus_auditoria(accion,detalle) VALUES ('confirmar_correo',?)").bind(JSON.stringify({codigo:user.codigo})).run();
    return {ok:true,codigo:user.codigo,mensaje:'Contraseña guardada. Ya puedes iniciar sesión con tu código y tu nueva contraseña.'};
  }
  return {configuration,schema,status,preview,save,request,complete};
}
