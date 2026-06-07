# Build script — Agência Elefef Site 2026
# Executa o build a partir de C:\Temp\elefef-build (caminho ASCII puro)
# necessário por bug Node.js v24 com caracteres acentuados no path

$SOURCE = $PSScriptRoot
$BUILD  = "C:\Temp\elefef-build"

Write-Host "Sincronizando arquivos fonte -> $BUILD ..." -ForegroundColor Cyan
robocopy $SOURCE $BUILD /E /XD node_modules dist .astro .git /XF "*.log" /NFL /NDL /NJH

Write-Host "Instalando dependências..." -ForegroundColor Cyan
Set-Location $BUILD
npm install

Write-Host "Buildando..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Copiando dist/ de volta para o projeto..." -ForegroundColor Cyan
    robocopy "$BUILD\dist" "$SOURCE\dist" /E /MIR /NFL /NDL /NJH
    Write-Host "Build concluído! dist/ atualizado em:" -ForegroundColor Green
    Write-Host "  $SOURCE\dist" -ForegroundColor Green
} else {
    Write-Host "ERRO no build. Verifique os logs acima." -ForegroundColor Red
}
