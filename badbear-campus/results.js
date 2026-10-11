export const STATES = {NSP:"No se presentó", LF:"Límite de faltas"};
export function resultText(nota, estado="") {
  return STATES[estado] ? estado+" · "+STATES[estado] : nota == null ? "" : String(nota)+" / 20";
}
