import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      setError('');
      const response = await axios.get(`${API_BASE_URL}/messages`);
      if (response.data.success) {
        setMessages(response.data.messages);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load chat history');
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setError('');

    // Add user message immediately to UI
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/messages`, {
        message: userMessage
      });

      if (response.data.success) {
        setMessages(response.data.messages);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.response?.data?.error || 'Failed to send message. Please try again.');
      // Remove the user message if there was an error
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const clearChat = async () => {
    if (window.confirm('Are you sure you want to clear the entire chat history?')) {
      try {
        await axios.delete(`${API_BASE_URL}/messages`);
        setMessages([]);
        setError('');
      } catch (err) {
        console.error('Error clearing chat:', err);
        setError('Failed to clear chat history');
      }
    }
  };

  return (
    <div className="app">
      <div className="chat-container">
        <div className="chat-header">
          <h1>💬 AI Chat Assistant</h1>
          <button className="clear-btn" onClick={clearChat} title="Clear chat history">
            🗑️ Clear
          </button>
        </div>

        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="empty-state">
              <p>👋 Welcome to AI Chat!</p>
              <p>Start a conversation by typing a message below.</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <div className="message-content">
                  <span className="message-role">
                    {msg.role === 'user' ? '👤' : '🤖'}
                  </span>
                  <p>{msg.content}</p>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="message assistant">
              <div className="message-content">
                <span className="message-role">🤖</span>
                <p className="typing-indicator">
                  <span></span><span></span><span></span>
                </p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <form className="input-form" onSubmit={sendMessage}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
            className="message-input"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="send-btn"
          >
            {loading ? '⏳' : '📤'} Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
