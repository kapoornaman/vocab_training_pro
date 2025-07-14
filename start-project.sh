#!/bin/bash

echo "🚀 Starting Vocab Training Pro..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."

# Install server dependencies
echo "Installing server dependencies..."
cd server
if [ ! -d "node_modules" ]; then
    npm install
fi
cd ..

# Install client dependencies
echo "Installing client dependencies..."
cd client
if [ ! -d "node_modules" ]; then
    npm install
fi
cd ..

echo ""
echo "🔧 Starting servers..."

# Function to kill background processes on script exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $SERVER_PID $CLIENT_PID 2>/dev/null
    exit
}

# Set up trap to cleanup on exit
trap cleanup EXIT

# Start the backend server
echo "Starting backend server on port 3001..."
cd server
PORT=3001 node index.js &
SERVER_PID=$!
cd ..

# Wait a moment for server to start
sleep 3

# Check if server started successfully
if curl -s http://localhost:3001 > /dev/null; then
    echo "✅ Backend server started successfully!"
else
    echo "❌ Failed to start backend server!"
    exit 1
fi

# Start the frontend
echo "Starting frontend on port 3000..."
cd client
npm start &
CLIENT_PID=$!
cd ..

echo ""
echo "🎉 Vocab Training Pro is starting!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop the script
wait 