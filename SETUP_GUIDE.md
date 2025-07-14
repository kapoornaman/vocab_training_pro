# 🚀 Vocab Training Pro - Setup Guide

## Prerequisites
- Node.js installed on your machine
- Git (to clone the repository)

## 📝 Step-by-Step Setup

### 1. Clone the Repository
```bash
git clone https://github.com/kapoornaman/vocab_training_pro.git
cd vocab_training_pro
```

### 2. Install Backend Dependencies
```bash
cd server
npm install
cd ..
```

### 3. Install Frontend Dependencies
```bash
cd client
npm install
cd ..
```

### 4. Start the Backend Server
**Open Terminal 1:**
```bash
cd server
PORT=3001 node index.js
```

You should see: `Server is listening on port 3001`

### 5. Start the Frontend (New Terminal)
**Open Terminal 2:**
```bash
cd client
npm start
```

The browser should automatically open to `http://localhost:3000`

## 🌐 Access the Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001

## 🔧 Troubleshooting Network Issues

### If you get "Network Error" or "Failed to fetch":

1. **Check if backend is running:**
   ```bash
   curl http://localhost:3001
   ```
   Should return: `It's running`

2. **Check if both processes are running:**
   ```bash
   ps aux | grep -E "(node index.js|react-scripts)" | grep -v grep
   ```

3. **Kill existing processes and restart:**
   ```bash
   # Kill any existing processes
   pkill -f "node index.js"
   pkill -f "react-scripts"
   
   # Then restart both servers
   ```

4. **Port conflicts:** If port 3001 is busy, try:
   ```bash
   PORT=3002 node index.js
   ```
   Then update the API URL in the frontend components.

## 🔒 Security Vulnerabilities

The npm audit warnings are in development dependencies and won't affect runtime. To fix them:

```bash
cd client
npm audit fix
```

If that doesn't work and you want to force fix (may cause breaking changes):
```bash
npm audit fix --force
```

## ✅ Verification Steps

1. Backend responds: `curl http://localhost:3001` → "It's running"
2. Frontend loads: Open `http://localhost:3000` in browser
3. API works: `curl http://localhost:3001/api/vocab/all` → `[]` (empty array)
4. Generate words: Click "Generate New Words" button in the UI

## 📞 Common Issues

**"ECONNREFUSED" Error:**
- Backend server is not running
- Wrong port number
- Firewall blocking connections

**"Cannot find module" Error:**
- Run `npm install` in both `server` and `client` directories

**Port already in use:**
- Change port: `PORT=3002 node index.js`
- Kill existing process: `lsof -ti:3001 | xargs kill`

## 🎯 Success Indicators

✅ Terminal 1: "Server is listening on port 3001"
✅ Terminal 2: "webpack compiled successfully"
✅ Browser: Beautiful vocab trainer UI loads
✅ Generate button: Creates new vocabulary words

---

**Need help? Share the exact error message you're seeing!** 