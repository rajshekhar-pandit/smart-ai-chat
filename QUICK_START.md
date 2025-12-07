# ⚡ Quick Start (5 Minutes)

Get your AI Chat App running instantly!

## 🎯 TL;DR - Do This Now

### 1. Get Keys (2 min)
```
🔑 Groq Key: https://console.groq.com → API Keys → Create Key
📊 MongoDB: https://mongodb.com/cloud/atlas → Create Free Cluster → Get Connection String
```

### 2. Setup Backend (2 min)
```powershell
cd backend
npm install
# Create .env with your keys:
# MONGODB_URI=mongodb+srv://...
# GROQ_API_KEY=gsk_...
# FRONTEND_URL=http://localhost:3000
npm start  # Port 5000
```

### 3. Setup Frontend (1 min)
```powershell
# New terminal
cd frontend
npm install
# Create .env:
# REACT_APP_API_URL=http://localhost:5000/api
npm start  # Port 3000 opens in browser
```

### 4. Test It
- Type: "Hello!"
- Click Send
- Wait for AI response ✨
- Refresh page - messages stay! ✅

## 📋 Files You Need

| File | What It Does |
|------|-------------|
| `backend/.env` | Your API keys & MongoDB URL |
| `frontend/.env` | Backend API URL |
| `backend/server.js` | Express server |
| `backend/models/Conversation.js` | Database schema |
| `backend/routes/messages.js` | Chat API endpoints |
| `frontend/src/App.js` | React chat interface |
| `frontend/src/App.css` | Chat styling |

## 🚀 Deploy in 30 Minutes

1. Push to GitHub
2. Deploy backend to Railway (free)
3. Deploy frontend to Vercel (free)
4. Add environment variables
5. Done! ✨

See `DEPLOYMENT_GUIDE.md` for full steps.

## 📖 Full Documentation

- **README.md** - Complete project overview
- **LOCAL_TESTING.md** - Detailed testing guide
- **DEPLOYMENT_GUIDE.md** - Step-by-step deployment
- **backend/README.md** - Backend details
- **frontend/README.md** - Frontend details

## ✅ Checklist

- [ ] Groq API key obtained
- [ ] MongoDB connection string saved
- [ ] Backend running on :5000
- [ ] Frontend running on :3000
- [ ] Can send and receive messages
- [ ] Chat history persists on refresh
- [ ] Ready to deploy!

## 🆘 Quick Troubleshooting

| Issue | Fix |
|-------|-----|
| "Cannot connect to API" | Check FRONTEND_URL in backend .env |
| "MongoDB error" | Check MONGODB_URI format and credentials |
| "No AI response" | Check GROQ_API_KEY is valid |
| "CORS error" | Restart backend after changing .env |

## 📞 Need Help?

1. Check the detailed docs above
2. Review error message in terminal
3. Check MongoDB Atlas/Groq console status
4. Verify all .env variables are set

---

**Estimated Time: 45 minutes from start to live app!**
