const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const { getAIResponse } = require('../services/aiService');

// Get all chat history
router.get('/messages', async (req, res) => {
  try {
    let conversation = await Conversation.findOne({});
    
    if (!conversation) {
      conversation = new Conversation({ messages: [] });
      await conversation.save();
    }

    res.json({
      success: true,
      messages: conversation.messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch messages'
    });
  }
});

// Send message and get AI response
router.post('/messages', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Message cannot be empty'
      });
    }

    // Get or create conversation
    let conversation = await Conversation.findOne({});
    if (!conversation) {
      conversation = new Conversation({ messages: [] });
    }

    // Add user message
    conversation.messages.push({
      role: 'user',
      content: message
    });

    // Get AI response
    console.log('Getting AI response for:', message);
    const aiResponse = await getAIResponse(message);

    // Add AI message
    conversation.messages.push({
      role: 'assistant',
      content: aiResponse
    });

    conversation.updatedAt = new Date();
    await conversation.save();

    res.json({
      success: true,
      messages: conversation.messages,
      lastMessage: {
        role: 'assistant',
        content: aiResponse
      }
    });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process message'
    });
  }
});

// Clear chat history
router.delete('/messages', async (req, res) => {
  try {
    await Conversation.deleteMany({});
    
    const newConversation = new Conversation({ messages: [] });
    await newConversation.save();

    res.json({
      success: true,
      message: 'Chat history cleared'
    });
  } catch (error) {
    console.error('Error clearing messages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to clear messages'
    });
  }
});

module.exports = router;
