# Creates ONLY the dedicated Campus service; no existing exam/music resources are modified.
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$npxCommandCampus = Get-Command npx.cmd -ErrorAction SilentlyContinue
if (-not $npxCommandCampus) { throw 'Instala Node.js LTS y vuelve a ejecutar este archivo.' }
$npxCampus = $npxCommandCampus.Source
function Invoke-CampusWrangler {
    param([string[]]$Arguments)
    & $npxCampus --yes wrangler@4 @Arguments
    if ($LASTEXITCODE -ne 0) { throw ('Wrangler no pudo completar: ' + ($Arguments -join ' ')) }
}
function New-CampusSecret {
    $bytes = New-Object byte[] 32
    $generator = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    try { $generator.GetBytes($bytes) } finally { $generator.Dispose() }
    return [BitConverter]::ToString($bytes).Replace('-', '').ToLowerInvariant()
}
function Read-CampusSecret {
    param([string]$Path)
    $secret = Import-Clixml -LiteralPath $Path
    $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secret)
    try { return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer) }
    finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer) }
}
Push-Location $PSScriptRoot
$adminSecret = $null
$pepperSecret = $null
try {
    Write-Host 'BADBEAR.CAMPUS: conecta tu cuenta de Cloudflare en la ventana que se abrira.'
    Invoke-CampusWrangler -Arguments @('login')
    $databasesText = Invoke-CampusWrangler -Arguments @('d1', 'list', '--json')
    $databases = ($databasesText -join "`n") | ConvertFrom-Json
    $database = @($databases | Where-Object { $_.name -eq 'badbear-campus' }) | Select-Object -First 1
    $created = $false
    if (-not $database) {
        Invoke-CampusWrangler -Arguments @('d1', 'create', 'badbear-campus')
        $databasesText = Invoke-CampusWrangler -Arguments @('d1', 'list', '--json')
        $databases = ($databasesText -join "`n") | ConvertFrom-Json
        $database = @($databases | Where-Object { $_.name -eq 'badbear-campus' }) | Select-Object -First 1
        $created = $true
    }
    if (-not $database) { throw 'No se encontro la base de Campus. No se desplego el servicio.' }
    $privateDir = Join-Path $env:LOCALAPPDATA 'BadbearCampus'
    New-Item -ItemType Directory -Force -Path $privateDir | Out-Null
    $adminPath = Join-Path $privateDir 'administrador.xml'
    $pepperPath = Join-Path $privateDir 'proteccion.xml'
    # Never rotate an existing password pepper silently: doing so invalidates all passwords.
    if (-not $created -and (-not (Test-Path $adminPath) -or -not (Test-Path $pepperPath))) {
        throw 'Campus ya existe, pero faltan las credenciales protegidas de este equipo. No se cambiaran las claves. Configura el servicio desde el equipo original o recupera sus secretos en Cloudflare.'
    }
    if ($created) {
        $adminSecret = New-CampusSecret
        $pepperSecret = New-CampusSecret
        ConvertTo-SecureString $adminSecret -AsPlainText -Force | Export-Clixml -LiteralPath $adminPath
        ConvertTo-SecureString $pepperSecret -AsPlainText -Force | Export-Clixml -LiteralPath $pepperPath
    } else {
        $adminSecret = Read-CampusSecret -Path $adminPath
        $pepperSecret = Read-CampusSecret -Path $pepperPath
    }
    $config = Get-Content -LiteralPath 'wrangler.json' -Raw | ConvertFrom-Json
    $config.d1_databases[0].database_id = $database.uuid
    $utf8Campus = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText((Join-Path $PSScriptRoot 'wrangler.json'), ($config | ConvertTo-Json -Depth 8), $utf8Campus)
    Invoke-CampusWrangler -Arguments @('d1', 'execute', 'badbear-campus', '--remote', '--file', 'schema.sql', '--yes')
    'y' | & $npxCampus --yes wrangler@4 d1 migrations apply badbear-campus --remote
    if ($LASTEXITCODE -ne 0) { throw 'No se aplicaron las migraciones de Campus.' }
    Invoke-CampusWrangler -Arguments @('deploy')
    $adminSecret | & $npxCampus --yes wrangler@4 secret put ADMIN_API_TOKEN
    if ($LASTEXITCODE -ne 0) { throw 'No se guardo la credencial administrativa en Cloudflare.' }
    $pepperSecret | & $npxCampus --yes wrangler@4 secret put PASSWORD_PEPPER
    if ($LASTEXITCODE -ne 0) { throw 'No se guardo la proteccion de contrasenas en Cloudflare.' }
    $campusReady = $false
    for ($campusAttempt = 0; $campusAttempt -lt 6; $campusAttempt++) {
        try {
            $health = Invoke-RestMethod -Uri 'https://badbear-campus-api.wajomea-group.workers.dev/api/health' -Method Get -TimeoutSec 10
            if ($health.estado -eq 'operativo') { $campusReady = $true; break }
        } catch {
            # Secret deployments can take a few seconds to become available.
        }
        if ($campusAttempt -lt 5) { Start-Sleep -Seconds 5 }
    }
    if (-not $campusReady) { throw 'Las claves se guardaron, pero el servicio aun no confirma disponibilidad. Conserva LOCALAPPDATA\BadbearCampus y comprueba el estado antes de volver a desplegar.' }
    Write-Host "`nBADBEAR.CAMPUS operativo. Abre https://wajomea.group/badbear-campus/admin.html" -ForegroundColor Green
    Write-Host 'Credencial exclusiva del administrador (copiala al panel y no la compartas):'
    Write-Host $adminSecret -ForegroundColor Yellow
    Write-Host 'Las claves quedan protegidas para tu usuario de Windows en LOCALAPPDATA\BadbearCampus. Al ejecutar este archivo de nuevo se conservan.'
} finally {
    $adminSecret = $null
    $pepperSecret = $null
    Pop-Location
}
