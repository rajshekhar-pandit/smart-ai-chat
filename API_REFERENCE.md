# 🔌 API Reference

Complete API documentation for the AI Chat Backend.

## Base URL

**Local Development:**
```
http://localhost:5000/api
```

**Production (Railway):**
```
https://your-backend-url.up.railway.app/api
```

## Endpoints

### 1. GET /messages
Fetch all stored chat messages.

**URL:** `GET /api/messages`

**Response (200 OK):**
```json
{
  "success": true,
  "messages": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "role": "user",
      "content": "What is machine learning?",
      "timestamp": "2024-01-01T12:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "role": "assistant",
      "content": "Machine learning is a subset of AI that enables systems to learn...",
      "timestamp": "2024-01-01T12:00:05.000Z"
    }
  ]
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Failed to fetch messages"
}
```

**cURL Example:**
```bash
curl http://localhost:5000/api/messages
```

**JavaScript Example:**
```javascript
fetch('http://localhost:5000/api/messages')
  .then(res => res.json())
  .then(data => console.log(data.messages))
```

---

### 2. POST /messages
Send a new user message and get AI response.

**URL:** `POST /api/messages`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "Hello! How are you?"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "messages": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "role": "user",
      "content": "Hello! How are you?",
      "timestamp": "2024-01-01T12:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "role": "assistant",
      "content": "I'm doing well, thank you for asking! How can I assist you today?",
      "timestamp": "2024-01-01T12:00:05.000Z"
    }
  ],
  "lastMessage": {
    "role": "assistant",
    "content": "I'm doing well, thank you for asking! How can I assist you today?"
  }
}
```

**Error Responses:**

Empty message (400):
```json
{
  "success": false,
  "error": "Message cannot be empty"
}
```

AI Error (500):
```json
{
  "success": false,
  "error": "Failed to get AI response: API key invalid"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'
```

**JavaScript Example:**
```javascript
fetch('http://localhost:5000/api/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    message: 'What is React?'
  })
})
  .then(res => res.json())
  .then(data => {
    console.log('All messages:', data.messages);
    console.log('Latest AI response:', data.lastMessage.content);
  })
```

**Python Example:**
```python
import requests

response = requests.post(
  'http://localhost:5000/api/messages',
  json={'message': 'Hello!'}
)
data = response.json()
print(data['messages'])
```

**Response Time:**
- Typical: 2-5 seconds (Groq API latency)
- Min: 1-2 seconds
- Max: 10+ seconds (if Groq API is slow)

---

### 3. DELETE /messages
Clear all chat messages.

**URL:** `DELETE /api/messages`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Chat history cleared"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Failed to clear messages"
}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:5000/api/messages
```

**JavaScript Example:**
```javascript
fetch('http://localhost:5000/api/messages', {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => console.log(data.message))
```

---

### 4. GET /health
Check if backend server is running.

**URL:** `GET http://localhost:5000/health`

**Response (200 OK):**
```json
{
  "status": "Backend is running"
}
```

**cURL Example:**
```bash
curl http://localhost:5000/health
```

---

## Data Models

### Message Object
```javascript
{
  _id: ObjectId,              // MongoDB ID
  role: "user" | "assistant", // Who sent it
  content: string,            // Message text
  timestamp: Date             // When sent
}
```

### Conversation Object
```javascript
{
  _id: ObjectId,              // Conversation ID
  messages: [Message],        // Array of messages
  createdAt: Date,            // When created
  updatedAt: Date             // Last update
}
```

---

## Error Codes

| Code | Error | Cause | Fix |
|------|-------|-------|-----|
| 400 | Message cannot be empty | User sent blank message | Validate input |
| 500 | Failed to fetch messages | Database error | Check MongoDB connection |
| 500 | Failed to get AI response | Groq API error | Check Groq API key |
| 500 | Failed to clear messages | Database error | Restart MongoDB |
| CORS | Origin not allowed | Frontend URL wrong | Update FRONTEND_URL |

---

## Rate Limiting

**Current:** No rate limiting (use carefully on production)

**Groq API Limits:**
- Free tier: 100 requests/minute
- Paid tier: Higher limits

---

## Authentication

**Current:** No authentication (stateless)

**Future:** Consider adding JWT tokens for production

---

## CORS Headers

**Allowed Origins:**
```
http://localhost:3000          # Local development
https://your-vercel-url.app    # Production frontend
```

**Allowed Methods:**
- GET
- POST
- DELETE
- OPTIONS

**Allowed Headers:**
- Content-Type
- Accept

---

## Request/Response Examples by Language

### Node.js/Express
```javascript
const axios = require('axios');

// Send message
async function sendMessage(msg) {
  const response = await axios.post(
    'http://localhost:5000/api/messages',
    { message: msg }
  );
  return response.data;
}

// Fetch history
async function getHistory() {
  const response = await axios.get('http://localhost:5000/api/messages');
  return response.data.messages;
}

// Clear history
async function clearChat() {
  await axios.delete('http://localhost:5000/api/messages');
}
```

### Python
```python
import requests

BASE_URL = 'http://localhost:5000/api'

# Send message
def send_message(msg):
    response = requests.post(
        f'{BASE_URL}/messages',
        json={'message': msg}
    )
    return response.json()

# Fetch history
def get_history():
    response = requests.get(f'{BASE_URL}/messages')
    return response.json()['messages']

# Clear history
def clear_chat():
    requests.delete(f'{BASE_URL}/messages')
```

### React/JavaScript
```javascript
const API_URL = 'http://localhost:5000/api';

// Send message
const sendMessage = async (message) => {
  const response = await fetch(`${API_URL}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  return response.json();
};

// Fetch history
const getHistory = async () => {
  const response = await fetch(`${API_URL}/messages`);
  const data = await response.json();
  return data.messages;
};

// Clear history
const clearHistory = async () => {
  await fetch(`${API_URL}/messages`, { method: 'DELETE' });
};
```

---

## Testing Endpoints

### Using Postman
1. Import these URLs
2. Set method (GET/POST/DELETE)
3. Add JSON body for POST
4. Send request
5. Check response

### Using Command Line

**Get History:**
```bash
curl http://localhost:5000/api/messages
```

**Send Message:**
```bash
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"message":"Hi!"}'
```

**Clear History:**
```bash
curl -X DELETE http://localhost:5000/api/messages
```

### Using Thunder Client (VS Code)
1. Install Thunder Client extension
2. Create GET request to `/api/messages`
3. Create POST request to `/api/messages` with body
4. Test all endpoints

---

## Performance Benchmarks

**Endpoint Response Times (Typical):**

| Endpoint | Time | Notes |
|----------|------|-------|
| GET /messages | 100-200ms | Database query |
| POST /messages | 2-5 seconds | Includes Groq API wait |
| DELETE /messages | 100-200ms | Database delete |
| GET /health | <10ms | No processing |

**Payload Sizes:**

| Type | Size | Limit |
|------|------|-------|
| User Message | 1-5 KB | 5000 chars |
| AI Response | 2-10 KB | 2000 chars (Groq limit) |
| Full History | 10-100 KB | ~500 messages |

---

## Versioning

**Current API Version:** 1.0
**Date:** December 2024

Future versions may include:
- User authentication (v2.0)
- Multiple conversations (v2.0)
- Message editing/deletion (v2.0)
- Rate limiting (v2.0)

---

## Support

For API issues:
1. Check MongoDB connection
2. Check Groq API key
3. Review request format
4. Check backend logs
5. Verify CORS settings

See README.md for detailed troubleshooting.
