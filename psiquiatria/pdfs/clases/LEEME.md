# PDF de las 18 clases de Psiquiatría

Esta es una carpeta local de entrada para los PDF. Los archivos se suben a Cloudflare R2, no a GitHub.

- Coloca o mueve aquí los documentos con nombres `clase-01.pdf` ... `clase-18.pdf`.
- Si el disco D: está con poco espacio, NO hagas duplicados: utiliza el parámetro `-CarpetaOrigen` del script para subir directamente desde la ubicación original.
- Ejecuta el script `psiquiatria/subir-pdfs-r2.ps1` desde PowerShell, primero con `-Simular` para revisar los archivos.
- Ubicación en R2: bucket `wajomea-group`, prefijo `psiquiatria/pdfs/clases/`.
- No borres el archivo original hasta confirmar que el PDF abre desde el dominio público.
- Al tener las 18 direcciones verificadas, se vincularán a `recursos.ppt` de cada clase en el catálogo `psiquiatria/programa-clases.js`.

**Importante:** que la carpeta exista en GitHub no crea automáticamente la carpeta en R2. R2 agrupa los objetos por prefijos; aparecerá al subir el primer PDF o al usar «Añadir carpeta» en el panel.
