// Only the central same-origin parent can connect an embedded administration panel.
export function centralBridge(area,{connect,disconnect}) {
  const embedded=window.parent!==window&&new URLSearchParams(location.search).get("panel")==="central";
  const report=connected=>{if(embedded)window.parent.postMessage({type:"WG_ADMIN_STATUS",area,connected:connected===true},location.origin);};
  if(!embedded)return report;
  document.body.classList.add("central-panel");
  window.addEventListener("message",event=>{
    if(event.origin!==location.origin||event.source!==window.parent||event.data?.area!==area)return;
    if(event.data.type==="WG_ADMIN_CONNECT"&&typeof event.data.credential==="string")connect(event.data.credential);
    if(event.data.type==="WG_ADMIN_DISCONNECT")disconnect();
  });
  window.parent.postMessage({type:"WG_ADMIN_READY",area},location.origin);
  return report;
}
