const axios = require('axios');

let groq = null;
// Only initialize Groq SDK if API key is available
if (process.env.GROQ_API_KEY) {
  try {
    const Groq = require('groq-sdk');
    groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    // Verify the SDK initialized correctly
    if (!groq || !groq.chat || !groq.chat.completions) {
      console.warn('Groq SDK initialized but structure is incorrect');
      groq = null;
    }
  } catch (err) {
    console.warn('Groq SDK not available or failed to initialize:', err.message);
    groq = null;
  }
}

async function getAIResponse(userMessage) {
  // If the SDK is available and has the expected method, use it
  if (groq && groq.chat && groq.chat.completions && typeof groq.chat.completions.create === 'function') {
    try {
      const completion = await groq.chat.completions.create({
        messages: [ { role: 'user', content: userMessage } ],
        model: 'llama2-70b-4096',
        max_tokens: 1024,
      });

      // Extract the response from the completion
      if (completion && completion.choices && Array.isArray(completion.choices) && completion.choices[0]) {
        const message = completion.choices[0].message;
        if (message && message.content) {
          return message.content;
        }
      }

      // Fallback to stringifying the response
      return JSON.stringify(completion);
    } catch (error) {
      console.error('Error calling Groq SDK:', error.message || error);
      // fall through to fallback
    }
  }

  // If SDK unavailable or failed, try HTTP request to Groq (best-effort)
  if (process.env.GROQ_API_KEY) {
    try {
      const resp = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
        messages: [ { role: 'user', content: userMessage } ],
        model: 'llama2-70b-4096',
        max_tokens: 1024,
      }, {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 20000
      });

      if (resp.data && resp.data.choices && Array.isArray(resp.data.choices) && resp.data.choices[0]) {
        const message = resp.data.choices[0].message;
        if (message && message.content) {
          return message.content;
        }
      }
      return JSON.stringify(resp.data);
    } catch (err) {
      console.error('HTTP call to Groq failed:', err.message || err);
      // fall through to safe fallback
    }
  }

  // Final safe fallback: simple echo-based reply so the app remains functional
  const reply = `I received: "${userMessage}" — (AI service unavailable, this is a fallback reply)`;
  return reply;
}

module.exports = { getAIResponse };