# 🚀 Complete Deployment Guide

Follow these steps to deploy your AI Chat App live!

## Step 1: Setup Free Services (5 minutes)

### A. Create Groq Account & Get API Key
1. Go to https://console.groq.com
2. Sign up with email/Google
3. Go to "API keys" section
4. Create new API key
5. Copy the key (starts with `gsk_`)
6. Save it safely - you'll need it later

### B. Setup MongoDB Atlas (Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create account (free tier available)
3. Create cluster (free tier, US region)
4. Click "Connect" → "Drivers" → Node.js
5. Copy connection string: `mongodb+srv://user:password@cluster.mongodb.net/ai-chat`
6. Replace `<password>` with your password
7. Keep this connection string safe

### C. Create GitHub Account (if needed)
1. Go to https://github.com
2. Sign up or login
3. Create new repository called `ai-chat-app`

## Step 2: Push Code to GitHub (5 minutes)

Open PowerShell in your `intern` folder:

```powershell
# Initialize git
git init

# Configure git
git config user.name "Your Name"
git config user.email "your@email.com"

# Add all files
git add .

# Create initial commit
git commit -m "Initial AI Chat App with history"

# Add remote (replace USERNAME and REPO)
git remote add origin https://github.com/YOUR_USERNAME/ai-chat-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Your code is now on GitHub! ✅

## Step 3: Deploy Backend to Railway (10 minutes)

### Railway Setup
1. Go to https://railway.app
2. Click "Start New Project"
3. Click "Deploy from GitHub"
4. Connect your GitHub account
5. Select `ai-chat-app` repository
6. Select `backend` as root directory
7. Click Deploy

### Configure Environment Variables
1. In Railway dashboard, click your project
2. Click "Variables" tab
3. Add these variables:

| Variable | Value | 
|----------|-------|
| `MONGODB_URI` | Your MongoDB connection string |
| `GROQ_API_KEY` | Your Groq API key |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | We'll update this later |

**Example MongoDB URI:**
```
mongodb+srv://myuser:mypassword@cluster0.mongodb.net/ai-chat
```

4. Click "Deploy"
5. Wait for deployment to complete
6. Click on your service → Copy URL (looks like `https://ai-chat-backend-production.up.railway.app`)
7. **SAVE THIS URL** - you need it next!

Railway provides free hosting! ✅

## Step 4: Deploy Frontend to Vercel (10 minutes)

### Vercel Setup
1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Connect GitHub if needed
5. Select your `ai-chat-app` repository
6. **Important:** Set "Root Directory" to `frontend`

### Configure Environment Variables
1. In Vercel dashboard, scroll to "Environment Variables"
2. Add this variable:
   - **Name:** `REACT_APP_API_URL`
   - **Value:** Your Railway backend URL + `/api` (example: `https://ai-chat-backend-production.up.railway.app/api`)

3. Click "Deploy"
4. Wait for deployment
5. Get your Vercel URL (looks like `https://ai-chat-app.vercel.app`)
6. **SAVE THIS URL** - this is your live app! 🎉

### Update Backend FRONTEND_URL
1. Go back to Railway dashboard
2. Update the `FRONTEND_URL` variable to your Vercel URL
3. This prevents CORS errors

Vercel provides free frontend hosting! ✅

## Step 5: Test Your Live App (5 minutes)

1. Open your Vercel URL in browser
2. Type a message like: "Hello! What can you do?"
3. Click Send button
4. Wait for AI response (should appear in 2-5 seconds)
5. **Refresh the page** - verify chat history still appears! ✅
6. Click "🗑️ Clear" to clear all messages

**Congratulations! Your app is live!** 🎉

## Step 6: Capture Screenshots (5 minutes)

Take these 5 screenshots for submission:

### Screenshot 1: Chat Interface
- Show the app with several user and AI messages
- Display the input box and send button
- **File name:** `1-chat-interface.png`

### Screenshot 2: History Persistence
- Show chat messages
- Refresh page (press F5)
- Show same messages appear after refresh
- **File name:** `2-history-persistence.png`

### Screenshot 3: Backend Running
- Open PowerShell in backend folder
- Run: `npm start`
- Show server is running on port 5000
- Show MongoDB connected message
- **File name:** `3-backend-running.png`

### Screenshot 4: MongoDB Messages
- Go to MongoDB Atlas dashboard
- Navigate to Collections → ai-chat → Conversation
- Show stored messages in database
- **File name:** `4-mongodb-messages.png`

### Screenshot 5: Clear History
- Show chat with messages
- Click clear button
- Show empty chat after clearing
- **File name:** `5-clear-history.png`

## Step 7: Create Submission Document

Create a file called `SUBMISSION.md`:

```markdown
# AI Chat App - Assignment Submission

## Live App URL
https://your-vercel-url.vercel.app

## GitHub Repository
https://github.com/your-username/ai-chat-app

## How to Test
1. Visit the live app URL above
2. Type a message and click Send
3. Wait for AI response
4. Refresh page to verify chat history persists
5. Click "🗑️ Clear" to clear all messages

## Tech Stack Used
- **Frontend:** React.js with modern CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas (free tier)
- **AI Service:** Groq API (free tier)
- **Hosting:** Vercel (frontend) + Railway (backend)

## Key Features
✅ Real-time chat with AI
✅ Chat history persists in MongoDB
✅ History restored on page refresh
✅ Clear history functionality
✅ Error handling
✅ Responsive design
✅ Free deployment (no credit card needed)

## Screenshots Included
1. Chat interface with messages
2. Page refresh showing persistent history
3. Backend server running
4. MongoDB storing messages
5. Clear history functionality

---
**Submitted:** December 7, 2024
```

## Troubleshooting

### Chat Not Sending Messages
- Check API URL in frontend .env matches Railway backend URL
- Check Railway backend FRONTEND_URL is set to Vercel URL
- Check MongoDB connection string is correct
- Check Groq API key is active

### Messages Not Persisting
- Verify MongoDB connection in Railway variables
- Check MongoDB Atlas cluster is active
- Check database has permission for writes
- Review Railway logs for errors

### UI Issues
- Hard refresh browser (Ctrl+Shift+R)
- Clear browser cache
- Check Vercel deployment logs

### Slow Responses
- Groq API can take 2-5 seconds - this is normal
- Check internet connection
- Check Groq service status

## Important URLs to Save

```
📎 GitHub: https://github.com/your-username/ai-chat-app
🚀 Backend (Railway): https://ai-chat-backend-production.up.railway.app
🌐 Frontend (Vercel): https://ai-chat-app.vercel.app
🔑 Groq Console: https://console.groq.com
📊 MongoDB Atlas: https://cloud.mongodb.com
```

## Free Tier Limits

**MongoDB Atlas:**
- 512 MB storage
- Enough for ~1000s of messages
- No credit card needed

**Groq API:**
- 100 requests per minute (free tier)
- No credit card needed initially

**Vercel:**
- Unlimited deployments
- 100 GB bandwidth/month
- Enough for millions of requests

**Railway:**
- $5 credit monthly (free tier)
- Enough for ~1000 hours of running
- After credit, very affordable

## Support Resources

- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com)
- [Groq API Documentation](https://console.groq.com/docs)

---

## Next Steps After Deployment

1. ✅ Get live URL working
2. ✅ Capture 5 screenshots
3. ✅ Create SUBMISSION.md
4. ✅ Submit to recruiter

**Estimated Total Time:** 45 minutes
**Cost:** $0 (all free tiers)
