# Configure the existing Worker; keep all API keys out of Git and terminal output.
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$npxCampusMail = (Get-Command npx.cmd -ErrorAction Stop).Source
Push-Location $PSScriptRoot
$mailKeyPointer = [IntPtr]::Zero
$mailKeyPlain = $null
try {
    Write-Host 'Primero: crea una cuenta gratuita en https://resend.com y verifica el dominio notificaciones.wajomea.group.'
    Write-Host 'Añade en Cloudflare DNS solamente los registros que Resend indique para ese subdominio.'
    Write-Host 'Crea una API key con permiso Sending access limitado al dominio verificado. No compartas la clave por chat.'
    $mailSender = (Read-Host 'Correo remitente (Enter: campus@notificaciones.wajomea.group)').Trim().ToLowerInvariant()
    if (-not $mailSender) { $mailSender = 'campus@notificaciones.wajomea.group' }
    if ($mailSender -notmatch '^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$') { throw 'Correo remitente invalido.' }
    $mailKeySecure = Read-Host 'Pega la API key de Resend (la entrada queda oculta)' -AsSecureString
    $mailKeyPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($mailKeySecure)
    $mailKeyPlain = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($mailKeyPointer)
    if ($mailKeyPlain -notmatch '^re_[a-zA-Z0-9_\-]{10,}$') { throw 'La clave no parece una API key de Resend.' }
    $mailKeyPlain | & $npxCampusMail --yes wrangler@4 secret put RESEND_API_KEY --name badbear-campus-api
    if ($LASTEXITCODE -ne 0) { throw 'No se guardo RESEND_API_KEY. Comprueba el acceso de Wrangler a tu cuenta.' }
    $mailKeyPlain = $null
    $mailSender | & $npxCampusMail --yes wrangler@4 secret put CAMPUS_EMAIL_FROM --name badbear-campus-api
    if ($LASTEXITCODE -ne 0) { throw 'No se guardo el remitente de correo.' }
    & (Join-Path $PSScriptRoot 'Actualizar-Campus.ps1')
    $mailHealth = Invoke-RestMethod -Uri 'https://badbear-campus-api.wajomea-group.workers.dev/api/health' -TimeoutSec 10
    if (-not $mailHealth.acceso_correo) { throw 'El servicio todavia no confirma la configuracion de correo. Revisa los secretos y la migracion 0002.' }
    Write-Host 'Configuracion de correo instalada. Carga el CSV codigo,correo desde Administracion central.' -ForegroundColor Green
    Write-Host 'La comprobacion confirma la configuracion, no la entrega. Solicita un enlace con una cuenta de prueba y comprueba el mensaje y el panel de Resend.'
} finally {
    $mailKeyPlain = $null
    if ($mailKeyPointer -ne [IntPtr]::Zero) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($mailKeyPointer) }
    if (Get-Variable mailKeySecure -ErrorAction SilentlyContinue) { $mailKeySecure.Dispose() }
    Pop-Location
}
