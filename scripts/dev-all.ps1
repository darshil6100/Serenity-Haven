$projectRoot = Split-Path -Parent $PSScriptRoot

Start-Process powershell `
  -WindowStyle Normal `
  -WorkingDirectory $projectRoot `
  -ArgumentList '-NoProfile', '-NoExit', '-Command', 'npm run dev:server'

npm run dev
