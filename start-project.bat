@echo off
echo 🚀 Starting Vocab Training Pro...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo 📦 Installing dependencies...

REM Install server dependencies
echo Installing server dependencies...
cd server
if not exist node_modules (
    npm install
)
cd ..

REM Install client dependencies
echo Installing client dependencies...
cd client
if not exist node_modules (
    npm install
)
cd ..

echo.
echo 🔧 Starting servers...

REM Start the backend server
echo Starting backend server on port 3001...
cd server
start "Backend Server" cmd /k "set PORT=3001 && node index.js"
cd ..

REM Wait a moment for server to start
timeout /t 3 /nobreak >nul

REM Start the frontend
echo Starting frontend on port 3000...
cd client
start "Frontend Client" cmd /k "npm start"
cd ..

echo.
echo 🎉 Vocab Training Pro is starting!
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend:  http://localhost:3001
echo.
echo Both servers are running in separate windows.
echo Close those windows to stop the servers.
echo.
pause 