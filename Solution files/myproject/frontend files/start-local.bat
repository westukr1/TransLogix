@echo off
setlocal

set "ROOT=%~dp0"
if "%ROOT:~-1%"=="\" set "ROOT=%ROOT:~0,-1%"

set "BACKEND=%ROOT%\..\backend files\TransLogix_djangoProject"
set "AUTH_FRONTEND=%ROOT%\auth-app"
set "OPERATOR_FRONTEND=%ROOT%\nextpointlogix-ui"

echo Starting TransLogix locally...
echo.

if not exist "%BACKEND%\manage.py" (
  echo ERROR: Django manage.py was not found:
  echo "%BACKEND%\manage.py"
  pause
  exit /b 1
)

if not exist "%AUTH_FRONTEND%\package.json" (
  echo ERROR: auth-app package.json was not found:
  echo "%AUTH_FRONTEND%\package.json"
  pause
  exit /b 1
)

if not exist "%OPERATOR_FRONTEND%\package.json" (
  echo ERROR: operator UI package.json was not found:
  echo "%OPERATOR_FRONTEND%\package.json"
  pause
  exit /b 1
)

set "PYTHON_EXE=%BACKEND%\.venv\Scripts\python.exe"
if not exist "%PYTHON_EXE%" set "PYTHON_EXE=python"

set "DJANGO_DEBUG=True"
set "DJANGO_ALLOWED_HOSTS=127.0.0.1,localhost"
set "GOOGLE_MAPS_API_KEY=local-dev-placeholder"
set "FRONTEND_URL=http://localhost:3001/"
set "OPERATOR_URL=http://localhost:3003/"
set "API_BASE_URL=http://127.0.0.1:8000/api"
set "LOCAL_TEMP=%ROOT%\.tmp"
set "CHROME_EXE="

if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "CHROME_EXE=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not defined CHROME_EXE if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set "CHROME_EXE=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not defined CHROME_EXE if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" set "CHROME_EXE=%LocalAppData%\Google\Chrome\Application\chrome.exe"

echo Backend:  http://127.0.0.1:8000/
echo Auth UI:  %FRONTEND_URL%
echo Operator: %OPERATOR_URL%
echo API:      %API_BASE_URL%
echo.

if not exist "%LOCAL_TEMP%" mkdir "%LOCAL_TEMP%"

(
  echo {
  echo   "apiBaseUrl": "%API_BASE_URL%",
  echo   "operatorUiUrl": "%OPERATOR_URL%"
  echo }
) > "%AUTH_FRONTEND%\public\config.json"

start "TransLogix Backend" cmd /k "cd /d "%BACKEND%" && set "DJANGO_DEBUG=%DJANGO_DEBUG%" && set "DJANGO_ALLOWED_HOSTS=%DJANGO_ALLOWED_HOSTS%" && set "GOOGLE_MAPS_API_KEY=%GOOGLE_MAPS_API_KEY%" && "%PYTHON_EXE%" manage.py runserver 127.0.0.1:8000"
timeout /t 2 /nobreak >nul
start "TransLogix Auth Frontend" cmd /k "cd /d "%AUTH_FRONTEND%" && set "BROWSER=none" && set "TEMP=%LOCAL_TEMP%" && set "TMP=%LOCAL_TEMP%" && npm start"
timeout /t 2 /nobreak >nul
start "TransLogix Operator UI" cmd /k "cd /d "%OPERATOR_FRONTEND%" && set "BROWSER=none" && set "TEMP=%LOCAL_TEMP%" && set "TMP=%LOCAL_TEMP%" && set "REACT_APP_API_BASE_URL=http://127.0.0.1:8000" && npm start"
echo Waiting for React dev servers to compile...
timeout /t 35 /nobreak >nul

if defined CHROME_EXE (
  start "TransLogix Chrome" "%CHROME_EXE%" "%FRONTEND_URL%"
  start "TransLogix Operator Chrome" "%CHROME_EXE%" "%OPERATOR_URL%"
) else (
  start "" "%FRONTEND_URL%"
  start "" "%OPERATOR_URL%"
)

echo Started. You can close this window.
echo Close the Backend, Auth Frontend, and Operator UI command windows to stop the app.
pause
