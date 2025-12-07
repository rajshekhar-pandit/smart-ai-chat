# 🧪 Local Development & Testing Guide

Test your AI Chat App locally before deploying!

## Prerequisites

- **Node.js** 14+ ([Download](https://nodejs.org))
- **MongoDB** (use free MongoDB Atlas or local)
- **Groq API Key** (get free [here](https://console.groq.com))
- **Code Editor** (VS Code recommended)

## Step 1: Get Required Credentials

### A. Groq API Key (2 minutes)
1. Go to https://console.groq.com
2. Sign up with email
3. Go to API Keys section
4. Create new key
5. Copy the key (starts with `gsk_`)

### B. MongoDB Connection String (3 minutes)
Option 1: **MongoDB Atlas (Recommended - Free Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up
3. Create cluster (free tier)
4. Click "Connect" → "Drivers"
5. Copy connection string for Node.js
6. Replace `<password>` with your password
7. Keep this safe!

Option 2: **Local MongoDB**
- Install MongoDB Community
- Connection string: `mongodb://localhost:27017/ai-chat`

## Step 2: Setup Backend

Open PowerShell in your workspace folder:

```powershell
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file with credentials
@"
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ai-chat
GROQ_API_KEY=gsk_your_actual_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
"@ | Out-File .env

# Start backend
npm start
```

You should see:
```
Server running on port 5000
MongoDB connected
```

✅ Backend is ready!

## Step 3: Setup Frontend (New Terminal)

Open another PowerShell window:

```powershell
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
@"
REACT_APP_API_URL=http://localhost:5000/api
"@ | Out-File .env

# Start frontend
npm start
```

Browser should open automatically to `http://localhost:3000`

✅ Frontend is ready!

## Step 4: Test the App

### Test 1: Send a Message
1. In browser, type: "Hello! What's your name?"
2. Click "📤 Send" button
3. Wait 2-5 seconds for AI response
4. Verify response appears in chat

**Expected Result:** ✅ Message sent and AI response received

### Test 2: Chat Continues
1. Type another message: "Tell me about AI"
2. Click Send
3. Verify both previous and new messages appear
4. Verify new AI response appears

**Expected Result:** ✅ Multiple messages in conversation

### Test 3: Page Refresh (CRITICAL TEST)
1. Right-click in browser → Refresh (or press F5)
2. Wait for page to reload
3. Verify ALL previous messages still appear
4. Verify order is correct

**Expected Result:** ✅ Chat history persists! This is key requirement.

### Test 4: Clear History
1. Click "🗑️ Clear" button in top right
2. Click "OK" on confirmation popup
3. Verify all messages disappear
4. Chat area shows "Welcome to AI Chat!"

**Expected Result:** ✅ History cleared successfully

### Test 5: Send New Message After Clear
1. Type: "Hi, I cleared the chat"
2. Click Send
3. Verify only this new message and AI response appear
4. No old messages visible

**Expected Result:** ✅ Fresh chat starts cleanly

### Test 6: Error Handling
1. Disconnect internet (if possible)
2. Try to send a message
3. Should show error message in red
4. Reconnect internet
5. Message should send successfully

**Expected Result:** ✅ Graceful error handling

## Step 5: Verify Database

### Check MongoDB for Saved Messages

**Using MongoDB Atlas UI:**
1. Go to https://cloud.mongodb.com
2. Login to your account
3. Click your cluster
4. Click "Browse Collections"
5. Navigate to: `ai-chat` → `conversations`
6. Expand a conversation document
7. Verify `messages` array contains all chat
8. Each message has `role` ("user" or "assistant") and `content`

**Using MongoDB Shell (if local):**
```bash
mongo
use ai-chat
db.conversations.find().pretty()
```

**Expected Output:**
```json
{
  "_id": ObjectId("..."),
  "messages": [
    {
      "role": "user",
      "content": "Hello!",
      "timestamp": ISODate("2024-01-01T...")
    },
    {
      "role": "assistant",
      "content": "Hi there!",
      "timestamp": ISODate("2024-01-01T...")
    }
  ]
}
```

✅ Messages are persisting in database!

## Step 6: Check Backend Logs

In the backend terminal, you should see:

```
Server running on port 5000
MongoDB connected
POST /api/messages - Received message: "Hello!"
Getting AI response for: "Hello!"
GET /api/messages - Returning 2 messages
DELETE /api/messages - Clearing all messages
```

This shows all API calls are working!

## Common Issues & Fixes

### "Cannot GET /"
- Frontend not running
- Run `npm start` in frontend folder

### "API Error" in Chat
- Check backend is running (port 5000)
- Check FRONTEND_URL is set correctly
- Look at backend logs for errors

### "Messages Not Loading"
- Check MongoDB connection string
- Verify MongoDB cluster is active
- Check .env file has correct MONGODB_URI

### "No AI Response"
- Check Groq API key is valid
- Check .env has correct GROQ_API_KEY
- Check internet connection
- Verify Groq service is online

### "CORS Error"
- Check FRONTEND_URL in backend .env
- Should be `http://localhost:3000`
- Restart backend after changing

### Port 5000 Already in Use
```powershell
# Find process using port 5000
Get-Process | Where-Object { $_.Name -like "*node*" }

# Kill the process
Stop-Process -Name node -Force
```

### Port 3000 Already in Use
```powershell
# Kill React on port 3000
Get-Process | Where-Object { $_.Name -like "*react*" }
Stop-Process -Name node -Force
```

## Performance Testing

### Measure Response Time
1. Open DevTools (F12) → Network tab
2. Send a message
3. Look at POST request to `/api/messages`
4. Check "Time" column
   - Typical: 2-5 seconds (waiting for Groq API)
   - Acceptable: 1-10 seconds
   - Too slow: >15 seconds (check connection)

### Check Message Size
1. In Network tab, click POST request
2. Look at "Response" tab
3. Verify all messages are included
4. Response size typically 1-5 KB per message

## Memory & Storage Check

### Backend Memory Usage
```powershell
# Check Node.js process memory
Get-Process | Where-Object { $_.ProcessName -eq "node" } | Select-Object Name, WorkingSet
```

Expected: 50-200 MB for small chat

### MongoDB Storage
- Local: Check disk space (1 GB+ recommended)
- Atlas: Free tier has 512 MB (enough for ~1000s of messages)

## Load Testing (Optional)

### Send Rapid Messages
```javascript
// In browser console
for(let i = 0; i < 5; i++) {
  fetch('http://localhost:5000/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: `Message ${i}` })
  });
}
```

Expected: All 5 messages sent without errors

## Final Verification Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can send messages successfully
- [ ] AI responds within 10 seconds
- [ ] Chat history appears after refresh
- [ ] Clear button works
- [ ] MongoDB shows saved messages
- [ ] No console errors
- [ ] No CORS errors
- [ ] All 6 tests pass

## Ready to Deploy!

If all tests pass, you're ready to:
1. Push code to GitHub
2. Deploy to Railway (backend)
3. Deploy to Vercel (frontend)
4. Test live app
5. Submit!

See `DEPLOYMENT_GUIDE.md` for deployment instructions.

---

**Total Setup Time:** ~15 minutes
**Testing Time:** ~10 minutes
**Total:** ~25 minutes
