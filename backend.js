// backend.js
require('dotenv').config(); // Load environment variables

const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const cors = require('cors');
const path = require('path');

const app = express();

// Enable CORS if frontend is hosted separately
app.use(cors({
    origin: '*', // Update this to your frontend's URL when deployed for better security
    methods: ['POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Securely access the API key
});

const assistantId = "asst_BvrFPSsSNhed6wOdnjwjH2GK"; // Bert's assistant ID

app.post('/chat', async (req, res) => {
  const { message, threadId } = req.body;

  try {
    // Create or retrieve the thread
    let thread;
    if (threadId) {
      thread = { id: threadId };
    } else {
      thread = await openai.beta.threads.create();
    }

    // Add the user's message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message
    });

    // Run the thread and stream the response
    let responseText = "";
    await openai.beta.threads.runs.stream(thread.id, {
      assistant_id: assistantId
    })
      .on('textDelta', (textDelta) => {
        responseText += textDelta.value;
      })
      .on('end', () => {
        res.json({ threadId: thread.id, response: responseText });
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to communicate with assistant." });
  }
});

// Use PORT from environment or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
