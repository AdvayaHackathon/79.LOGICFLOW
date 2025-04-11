const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://chinthanps0:qEaOT83jZMqoYYzW@cluster0.hpknsly.mongodb.net/doctori?retryWrites=true&w=majority&appName=Cluster0', {
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB Error:', err));

// Schema to store chat data
const chatSchema = new mongoose.Schema({
  userMessage: String,
  aiResponse: String,
  timestamp: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', chatSchema);

// API to store chat
app.post('/api/save-chat', async (req, res) => {
  const { userMessage, aiResponse } = req.body;
  try {
    const newChat = new Chat({ userMessage, aiResponse });
    await newChat.save();
    res.status(200).json({ message: 'Chat saved successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save chat' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
