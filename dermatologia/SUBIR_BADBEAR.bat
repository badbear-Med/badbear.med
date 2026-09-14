@echo off
setlocal
cd /d "%~dp0"

echo ============================================
echo   BADBEAR.MED - PUBLICAR MATERIAL
 echo ============================================
echo.

echo [1/4] Actualizando proyecto desde GitHub...
git pull --rebase origin main
if errorlevel 1 goto :error

echo.
echo [2/4] Preparando cambios...
git add .
if errorlevel 1 goto :error

git diff --cached --quiet
if not errorlevel 1 goto :sin_cambios

echo.
echo [3/4] Creando actualizacion...
set FECHA=%date% %time%
git commit -m "Actualiza material BADBEAR.MED"
if errorlevel 1 goto :error

echo.
echo [4/4] Subiendo a GitHub...
git push origin main
if errorlevel 1 goto :error

echo.
echo ============================================
echo   LISTO - MATERIAL PUBLICADO
 echo ============================================
echo GitHub Pages puede tardar unos minutos en actualizarse.
echo.
pause
exit /b 0

:sin_cambios
echo.
echo No hay archivos nuevos o cambios para publicar.
echo.
pause
exit /b 0

:error
echo.
echo ============================================
echo   ERROR: NO SE COMPLETO LA PUBLICACION
 echo ============================================
echo Copia o toma captura de este mensaje y enviamelo.
echo.
pause
exit /b 1
