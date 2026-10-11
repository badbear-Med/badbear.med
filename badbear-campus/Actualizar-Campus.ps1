# Update the existing Campus database and Worker, preserving current secrets.
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$npxCampusUpdate = (Get-Command npx.cmd -ErrorAction Stop).Source
function Invoke-CampusUpdate {
    param([string[]]$Arguments)
    & $npxCampusUpdate --yes wrangler@4 @Arguments
    if ($LASTEXITCODE -ne 0) { throw ('No se completo: ' + ($Arguments -join ' ')) }
}
Push-Location $PSScriptRoot
try {
    $databasesText = Invoke-CampusUpdate -Arguments @('d1','list','--json')
    $databases = ($databasesText -join "`n") | ConvertFrom-Json
    $database = @($databases | Where-Object { $_.name -eq 'badbear-campus' }) | Select-Object -First 1
    if (-not $database) { throw 'No se encontro badbear-campus. Activa primero el servicio con Activar-Campus.ps1.' }
    $config = Get-Content -LiteralPath 'wrangler.json' -Raw | ConvertFrom-Json
    $config.d1_databases[0].database_id = $database.uuid
    # Preserve local database IDs and unrelated bindings; configure only the dedicated Exams link.
    $campusServices = @()
    if ($config.PSObject.Properties['services']) { $campusServices = @($config.services | Where-Object { $_.binding -ne 'EXAMS_AUTH' }) }
    $campusServices += [PSCustomObject]@{ binding = 'EXAMS_AUTH'; service = 'badbear-exams-api' }
    $config | Add-Member -NotePropertyName 'services' -NotePropertyValue $campusServices -Force
    [System.IO.File]::WriteAllText((Join-Path $PSScriptRoot 'wrangler.json'), ($config | ConvertTo-Json -Depth 8), (New-Object System.Text.UTF8Encoding($false)))
    # D1 tracks successful migrations and rolls back a failed migration.
    'y' | & $npxCampusUpdate --yes wrangler@4 d1 migrations apply badbear-campus --remote
    if ($LASTEXITCODE -ne 0) { throw 'No se aplico la actualizacion de resultados. No se desplego el Worker.' }
    Invoke-CampusUpdate -Arguments @('deploy')
    $ready = $false
    for ($attempt = 0; $attempt -lt 6; $attempt++) {
        try {
            $health = Invoke-RestMethod -Uri 'https://badbear-campus-api.wajomea-group.workers.dev/api/health' -TimeoutSec 10
            if ($health.estado -eq 'operativo' -and $health.estados_asistencia -eq $true -and $health.acceso_unificado -eq $true) { $ready = $true; break }
        } catch {}
        if ($attempt -lt 5) { Start-Sleep -Seconds 5 }
    }
    if (-not $ready) { throw 'No se confirmo la conexion interna Campus-Examenes. Revisa que badbear-exams-api exista en la misma cuenta y que Wrangler muestre env.EXAMS_AUTH.' }
    Write-Host 'Campus y Examenes: entra al escritorio con el mismo correo y contrasena de Examenes.' -ForegroundColor Green
    Start-Process 'https://wajomea.group/administracion/index.html'
} finally { Pop-Location }
