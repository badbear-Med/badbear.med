$ErrorActionPreference = 'Stop'
Push-Location $PSScriptRoot
try {
    & npx.cmd --yes wrangler@4 deploy
    if ($LASTEXITCODE -ne 0) { throw 'No se desplego la puerta de acceso de Campus.' }
    $health = Invoke-RestMethod 'https://wajomea.group/__campus/status' -TimeoutSec 15
    if ($health.gateway -ne $true) { throw 'No se confirmo la ruta protegida. Comprueba que el dominio use el proxy de Cloudflare.' }
    Write-Host 'Puerta de acceso activa. Comprueba en una ventana privada que BADBEAR.MED y los archivos directos exigen entrar por Campus.' -ForegroundColor Green
} finally { Pop-Location }
