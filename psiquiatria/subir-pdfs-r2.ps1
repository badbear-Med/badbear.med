# Sube PDF de clases de Psiquiatría a Cloudflare R2 sin agregarlos a GitHub.
# Requisitos: PowerShell, Node.js/npx y acceso a Wrangler (npx wrangler login).
# Uso: .\psiquiatria\subir-pdfs-r2.ps1 -Simular
#      .\psiquiatria\subir-pdfs-r2.ps1
#      .\psiquiatria\subir-pdfs-r2.ps1 -CarpetaOrigen "E:\Mis-PDF"

[CmdletBinding()]
param(
    [string]$CarpetaOrigen = (Join-Path $PSScriptRoot "pdfs\clases"),
    [switch]$Simular
)

$ErrorActionPreference = "Stop"
$bucket = "wajomea-group"
$prefijo = "psiquiatria/pdfs/clases"
$dominio = "https://media.wajomea.group"

if (-not (Test-Path -LiteralPath $CarpetaOrigen -PathType Container)) {
    New-Item -ItemType Directory -Force -Path $CarpetaOrigen | Out-Null
    Write-Host "Carpeta creada: $CarpetaOrigen" -ForegroundColor Green
}
$CarpetaOrigen = (Resolve-Path -LiteralPath $CarpetaOrigen).Path

$archivos = @()
for ($i = 1; $i -le 18; $i++) {
    $nombre = "clase-{0:D2}.pdf" -f $i
    $origen = Join-Path $CarpetaOrigen $nombre
    if (Test-Path -LiteralPath $origen -PathType Leaf) {
        $info = Get-Item -LiteralPath $origen
        if ($info.Length -eq 0) {
            Write-Warning "Se omite archivo vacio: $nombre"
            continue
        }
        if ($info.Length -gt 315MB) {
            Write-Warning "Se omite $nombre (mas de 315 MB): cargar por el panel o S3 multipart."
            continue
        }
        $archivos += [pscustomobject]@{
            Nombre = $nombre
            Origen = $info.FullName
            TamanoMB = [math]::Round($info.Length / 1MB, 2)
            Clave = "$prefijo/$nombre"
            Url = "$dominio/$prefijo/$nombre"
        }
    }
}

Write-Host ""
Write-Host "Carpeta de origen: $CarpetaOrigen"
Write-Host "Destino: R2 $bucket/$prefijo/"
if ($archivos.Count -eq 0) {
    Write-Warning "No se encontraron archivos clase-01.pdf ... clase-18.pdf. Colocalos en la carpeta indicada o usa -CarpetaOrigen."
    return
}
$archivos | Select-Object Nombre, TamanoMB, Url | Format-Table -AutoSize

if ($Simular) {
    Write-Host "SIMULACION: no se ha subido ni modificado ningun archivo." -ForegroundColor Cyan
    return
}

if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
    throw "npx no esta disponible. Instala Node.js, o utiliza la interfaz web de Cloudflare R2 para cargar los PDF."
}

Write-Host ""
Write-Warning "Si un objeto de R2 ya existe con el mismo nombre, se reemplazara. El script no elimina archivos locales."
$respuesta = Read-Host "Escribe SUBIR para comenzar o pulsa Enter para cancelar"
if ($respuesta -cne "SUBIR") {
    Write-Host "Cancelado. No se realizaron subidas."
    return
}

$exitos = 0
$fallos = 0
foreach ($file in $archivos) {
    Write-Host ""
    Write-Host "Subiendo $($file.Nombre) ($($file.TamanoMB) MB)..." -ForegroundColor Cyan
    & npx wrangler r2 object put "$bucket/$($file.Clave)" --file "$($file.Origen)" --remote --content-type "application/pdf"
    if ($LASTEXITCODE -eq 0) {
        $exitos++
        Write-Host "OK -> $($file.Url)" -ForegroundColor Green
    } else {
        $fallos++
        Write-Warning "Error al subir $($file.Nombre). Codigo: $LASTEXITCODE"
    }
}
Write-Host ""
Write-Host "Resultado: $exitos enviados; $fallos con error."
Write-Host "Los PDF originales permanecen en su ubicacion. Comprueba las URL publicas antes de vincularlas al aula."
