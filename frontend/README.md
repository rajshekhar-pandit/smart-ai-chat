# Frontend - AI Chat UI

React application for real-time AI chat with message history.

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with backend URL
# REACT_APP_API_URL=http://localhost:5000/api

# Start development server (runs on http://localhost:3000)
npm start

# Build for production
npm run build
```

## Features

- **Real-time Chat** - Send messages and get instant AI responses
- **Chat History** - All messages persist in database and appear on page reload
- **Auto-scroll** - Automatically scrolls to latest message
- **Loading States** - Visual indicator while waiting for AI response
- **Error Handling** - User-friendly error messages
- **Clear History** - Button to clear entire conversation
- **Responsive Design** - Works on desktop and mobile
- **Modern UI** - Gradient background, smooth animations

## Environment Variables

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:5000/api
```

For deployment (Vercel):
```env
REACT_APP_API_URL=https://your-railway-backend.up.railway.app/api
```

## Component Structure

**App.js**
- Main chat component
- Manages messages state
- Handles API calls
- Displays UI

**App.css**
- Chat interface styles
- Gradient animations
- Message styling
- Responsive layout

## Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Go to Vercel** - https://vercel.com
   - Click "Add New" → "Project"
   - Import GitHub repository
   - Select your repo

3. **Add Environment Variable**
   - In Project Settings → Environment Variables
   - Add `REACT_APP_API_URL` with Railway backend URL
   - Example: `https://your-backend.up.railway.app/api`

4. **Deploy**
   - Click "Deploy"
   - Vercel auto-builds and deploys
   - Get live URL immediately

5. **Update Backend FRONTEND_URL**
   - Update Railway environment variable `FRONTEND_URL`
   - Set to your Vercel URL
   - This fixes CORS errors

## API Integration

The app communicates with backend via three endpoints:

### Fetch Chat History
```javascript
GET /api/messages
```
Called on component mount to load existing chat.

### Send Message
```javascript
POST /api/messages
Body: { message: "User input" }
```
Sends message and receives AI response with full chat history.

### Clear History
```javascript
DELETE /api/messages
```
Clears all messages (with confirmation prompt).

## Key Functions

**fetchMessages()**
- Calls GET /api/messages
- Loads chat history from database
- Sets loading state
- Handles errors

**sendMessage(event)**
- Prevents form default
- Validates input not empty
- Calls POST /api/messages
- Updates messages state
- Auto-scrolls to latest

**clearChat()**
- Shows confirmation prompt
- Calls DELETE /api/messages
- Clears messages state
- Resets error state

## Styling Guide

- **Colors**: Purple gradient (#667eea to #764ba2)
- **User Messages**: Purple background, white text, right-aligned
- **Assistant Messages**: Light blue background (#e8eef5), left-aligned
- **Animations**: Slide-in effect, typing indicator, hover effects

## Performance Optimization

- Auto-scroll uses `scrollIntoView` with smooth behavior
- Error messages auto-clear on new messages
- Message loading prevented during sending
- CSS animations use GPU acceleration

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

**API Connection Error**
- Check REACT_APP_API_URL in .env
- Verify backend is running
- Check browser console for CORS errors

**Messages Not Loading**
- Check network tab in DevTools
- Verify backend API is responding
- Check MongoDB connection

**Styling Issues**
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check CSS file is imported correctly

**AI Not Responding**
- Check Groq API key is valid
- Verify backend logs for errors
- Check Groq service status

## Testing

```bash
# Local development
npm start

# Test with backend at http://localhost:5000
# Open http://localhost:3000

# Production build
npm run build
# Output in 'build/' directory
```

## Build Output

```bash
npm run build
```

Creates optimized production build in `build/` folder:
- Minified JS/CSS
- Source maps
- Ready for deployment to Vercel

## Deployment Checklist

- [ ] Environment variables set in Vercel
- [ ] Backend URL correct in .env
- [ ] Backend FRONTEND_URL updated
- [ ] MongoDB connected
- [ ] Groq API key active
- [ ] Test sending messages
- [ ] Test page refresh
- [ ] Test clear history
- [ ] Mobile responsiveness verified

## Live Testing

1. Send a message and verify AI responds
2. Refresh page - verify history persists
3. Clear history - verify all messages removed
4. Test on mobile device
5. Test network connectivity errors

---

**Frontend for AI Chat App Assignment**
Last Updated: December 2024
