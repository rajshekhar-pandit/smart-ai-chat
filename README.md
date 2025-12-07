# AI Chat App with Saved History 🤖💬

A full-stack AI chat application where users can chat with an AI assistant, and all conversation history is persisted and restored on page reload.

## 🚀 Features

✅ **Real-time Chat Interface** - Modern React-based chat UI with message display and input
✅ **AI Integration** - Uses Groq API (free Mixtral-8x7b model) for intelligent responses
✅ **Persistent Storage** - MongoDB stores all messages with automatic history recovery
✅ **Auto-scroll** - Messages auto-scroll to the latest conversation
✅ **Clear History** - Option to clear entire chat history
✅ **Error Handling** - Graceful error messages and retry capability
✅ **Responsive Design** - Works on desktop and mobile devices
✅ **Loading States** - Visual feedback while AI is generating responses

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Node.js + Express** - Server framework
- **MongoDB** - Database for message persistence
- **Groq SDK** - AI text generation

## 📋 Prerequisites

- Node.js 14+ and npm
- Free Groq API key (from https://console.groq.com)
- MongoDB Atlas account (free tier) or local MongoDB

## 🔧 Local Setup

### 1. Clone and Navigate
```bash
cd intern
```

### 2. Backend Setup

```bash
cd backend

# Create .env file
copy .env.example .env
# Edit .env with your credentials:
# MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ai-chat
# GROQ_API_KEY=your-api-key
# FRONTEND_URL=http://localhost:3000

# Install dependencies
npm install

# Start backend (runs on http://localhost:5000)
npm start
# Or for development with auto-reload:
npm run dev
```

### 3. Frontend Setup (in another terminal)

```bash
cd frontend

# Create .env file
copy .env.example .env
# REACT_APP_API_URL=http://localhost:5000/api

# Install dependencies
npm install

# Start frontend (runs on http://localhost:3000)
npm start
```

### 4. Test the App
- Open http://localhost:3000 in your browser
- Type a message and click Send
- Wait for AI response
- Refresh the page to verify chat history persists
- Clear history with the 🗑️ button

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages` | Fetch all chat history |
| POST | `/api/messages` | Send message and get AI response |
| DELETE | `/api/messages` | Clear all messages |

### Request/Response Examples

**POST /api/messages**
```json
// Request
{
  "message": "Hello, what is AI?"
}

// Response
{
  "success": true,
  "messages": [
    {"role": "user", "content": "Hello, what is AI?"},
    {"role": "assistant", "content": "AI stands for..."}
  ]
}
```

**GET /api/messages**
```json
{
  "success": true,
  "messages": [
    {"role": "user", "content": "...", "timestamp": "2024-01-01T..."},
    {"role": "assistant", "content": "...", "timestamp": "2024-01-01T..."}
  ]
}
```

## 🚀 Deployment

### Deploy Backend to Railway

1. Push code to GitHub
2. Go to https://railway.app
3. Create new project → Deploy from GitHub
4. Set environment variables:
   - MONGODB_URI
   - GROQ_API_KEY
   - FRONTEND_URL (Vercel URL)
5. Railway provides a live URL

### Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Import GitHub repository
3. Set environment variable:
   - REACT_APP_API_URL=https://your-railway-backend-url/api
4. Deploy with one click

## 📸 Screenshots Guide

Capture these for submission:
1. Chat interface with several user and AI messages
2. Page refresh showing persistent history
3. Backend terminal with running server
4. MongoDB dashboard showing stored messages
5. Clear button functionality (before/after)

## 🔐 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-chat
GROQ_API_KEY=your-groq-api-key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

**MongoDB Connection Error**
- Check MongoDB URI in .env
- Verify IP whitelist in MongoDB Atlas (0.0.0.0/0 for local dev)
- Ensure database name matches URI

**Groq API Error**
- Verify API key is valid
- Check Groq API status
- Ensure request format is correct

**CORS Error**
- Backend FRONTEND_URL must match where frontend is running
- For local: http://localhost:3000

**Chat History Not Persisting**
- Check MongoDB connection
- Verify data is being saved in MongoDB
- Check browser console for errors

## 📊 Project Stats

- **Backend**: ~100 lines (server.js, routes, models, services)
- **Frontend**: ~150 lines (React component + CSS)
- **Total Setup Time**: ~30 minutes
- **Dependencies**: 10 core packages

## 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Atlas Setup](https://docs.atlas.mongodb.com/)
- [Groq API Docs](https://console.groq.com/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [Railway Deployment](https://docs.railway.app/)

## 🎯 Next Steps (Optional Enhancements)

- Add user authentication (JWT)
- Implement multiple conversation threads
- Add message editing/deletion
- Export chat as PDF
- Add typing indicators
- Implement rate limiting
- Add message search functionality
- Support for different AI models

## ✅ Submission Checklist

- [ ] Live app URL ready
- [ ] Screenshots captured (interface, history, backend, database)
- [ ] GitHub repo link (optional)
- [ ] README documentation
- [ ] Both frontend and backend running
- [ ] AI responses working
- [ ] Chat history persists after refresh
- [ ] Clear history button works

## 📧 Support

For issues or questions:
1. Check MongoDB/Groq API status
2. Review .env configuration
3. Check browser console for errors
4. Check server logs for backend issues

---

**Created for Software & AI Internship Assignment**
Last Updated: December 2024
