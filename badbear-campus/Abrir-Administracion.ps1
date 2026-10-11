# Opens the Campus admin panel and copies its existing Windows-protected credential.
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$campusCredentialPath = Join-Path $env:LOCALAPPDATA 'BadbearCampus\administrador.xml'
if (-not (Test-Path -LiteralPath $campusCredentialPath)) {
    throw 'No se encontro la credencial protegida en este usuario de Windows. Usa el equipo y usuario que activaron Campus.'
}
$campusSecureCredential = Import-Clixml -LiteralPath $campusCredentialPath
$campusCredentialPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($campusSecureCredential)
try {
    Set-Clipboard -Value ([Runtime.InteropServices.Marshal]::PtrToStringBSTR($campusCredentialPointer))
} finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($campusCredentialPointer)
}
Write-Host 'Credencial de Campus copiada. Pegala con Ctrl+V en el campo de acceso del administrador.' -ForegroundColor Green
Start-Process 'https://wajomea.group/administracion/index.html#campus'
