backend/
├── models/
│   └── Conversation.js          # MongoDB message schema
├── routes/
│   └── messages.js              # API endpoints
├── services/
│   └── aiService.js             # Groq API integration
├── server.js                    # Express server entry point
├── package.json                 # Backend dependencies
└── .env.example                 # Environment variables template

frontend/
├── public/
│   └── index.html               # HTML template
├── src/
│   ├── App.js                   # Main React component
│   ├── App.css                  # Chat UI styles
│   └── index.js                 # React entry point
├── package.json                 # Frontend dependencies
└── .env.example                 # Environment variables template

README.md                         # Project documentation
.gitignore                        # Git ignore rules
