# Backend - AI Chat API

Node.js + Express backend for AI Chat App with MongoDB persistence.

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your credentials
# - MONGODB_URI: MongoDB Atlas connection string
# - GROQ_API_KEY: Free API key from https://console.groq.com
# - FRONTEND_URL: Where your React app will run

# Start development server
npm run dev

# Or production
npm start
```

## API Endpoints

### GET /api/messages
Returns all stored messages from the conversation.

**Response:**
```json
{
  "success": true,
  "messages": [
    {
      "role": "user",
      "content": "Hello!",
      "timestamp": "2024-01-01T12:00:00.000Z"
    },
    {
      "role": "assistant",
      "content": "Hi there!",
      "timestamp": "2024-01-01T12:00:01.000Z"
    }
  ]
}
```

### POST /api/messages
Send a new message and get AI response.

**Request:**
```json
{
  "message": "What is machine learning?"
}
```

**Response:**
```json
{
  "success": true,
  "messages": [...],
  "lastMessage": {
    "role": "assistant",
    "content": "Machine learning is..."
  }
}
```

### DELETE /api/messages
Clear all messages and start fresh.

**Response:**
```json
{
  "success": true,
  "message": "Chat history cleared"
}
```

## Environment Variables

```env
# MongoDB connection string
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ai-chat

# Groq API key for AI responses
GROQ_API_KEY=gsk_xxxxxxxxxxxxx

# Server port
PORT=5000

# Node environment
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000
```

## Database Schema

**Conversation Collection:**
```javascript
{
  _id: ObjectId,
  messages: [
    {
      role: "user" | "assistant",
      content: string,
      timestamp: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## AI Integration

Uses **Groq API** with the **Mixtral-8x7b-32768** model:
- Free tier available
- Fast inference
- No rate limiting for reasonable use
- [Get API Key](https://console.groq.com)

## Deployment to Railway

1. **Create Railway Account** - https://railway.app

2. **Connect GitHub**
   - Click "New Project" → "Deploy from GitHub"
   - Select repository

3. **Add MongoDB**
   - Add Marketplace plugin → MongoDB
   - Copy connection string to DATABASE_URL

4. **Set Environment Variables**
   ```
   MONGODB_URI=<connection-string>
   GROQ_API_KEY=<your-key>
   FRONTEND_URL=https://your-vercel-url.vercel.app
   NODE_ENV=production
   PORT=5000
   ```

5. **Deploy** - Railway auto-deploys on push

6. **Get URL** - Railway provides a live URL automatically

## Deployment to Render

1. **Create Render Account** - https://render.com

2. **Create Web Service**
   - Create new → Web Service
   - Connect GitHub repo

3. **Set Environment Variables**
   - Add all .env variables in Render dashboard

4. **Deploy** - Render auto-builds and deploys

## Error Handling

All endpoints return standard response format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

Common errors:
- 400: Invalid/empty message
- 500: Database or AI API error

## Testing

```bash
# Check if server is running
curl http://localhost:5000/health

# Get messages
curl http://localhost:5000/api/messages

# Send message
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'

# Clear messages
curl -X DELETE http://localhost:5000/api/messages
```

## Performance

- **Typical response time**: 2-5 seconds (waiting for AI)
- **Database queries**: <100ms
- **Connection pooling**: Automatic with Mongoose
- **Concurrent users**: Scales to 1000+ with Railway Pro

## Monitoring

- Check Railway dashboard for logs
- Monitor MongoDB Atlas metrics
- Use `npm run dev` locally to see detailed logs

## Troubleshooting

**MongoDB Connection Error**
- Verify connection string format
- Allow 0.0.0.0/0 in MongoDB Atlas firewall
- Check username/password encoding

**Groq API Timeout**
- Increase timeout in aiService.js
- Check Groq service status
- Verify API key is active

**CORS Errors**
- Update FRONTEND_URL in .env
- Ensure frontend URL matches exactly

**Messages Not Saving**
- Check MongoDB connection
- Verify permissions in MongoDB Atlas
- Check disk quota on MongoDB

## Files

- `server.js` - Express app setup
- `routes/messages.js` - API endpoints
- `models/Conversation.js` - Message schema
- `services/aiService.js` - Groq integration
- `package.json` - Dependencies
