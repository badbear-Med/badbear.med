#!/usr/bin/env python3
"""Reconstruye exactamente el PDF original de la rotación desde las partes del repo."""
from pathlib import Path
import hashlib,json

root=Path(__file__).resolve().parents[1]/'cirugia-general/rotacion-dr-sotelo/documentos'
backup=root/'respaldo-original'
meta=json.loads((backup/'integridad.json').read_text(encoding='utf-8'))
chunks=[]
for item in meta['partes']:
    data=(backup/item['archivo']).read_bytes()
    if len(data)!=item['bytes'] or hashlib.sha256(data).hexdigest()!=item['sha256']:
        raise SystemExit('La parte no pasa verificación: '+item['archivo'])
    chunks.append(data)
data=b''.join(chunks)
if len(data)!=meta['bytes'] or hashlib.sha256(data).hexdigest()!=meta['sha256']:
    raise SystemExit('El original reconstruido no pasa verificación.')
output=root/meta['salida']
if output.exists() and output.read_bytes()!=data:
    raise SystemExit('Ya existe un archivo distinto en '+str(output)+'. Revisa antes de reemplazarlo.')
output.write_bytes(data)
print('PDF original restaurado y verificado:',output)
print('SHA-256:',meta['sha256'])
