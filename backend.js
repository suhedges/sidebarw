require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const cors = require('cors'); 
const path = require('path');

const app = express();


app.use(cors({
    origin: 'https://suhedges.github.io', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'chat_ai.html'));
});


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});


const assistantId = "asst_BvrFPSsSNhed6wOdnjwjH2GK";


app.post('/chat', async (req, res) => {
  const { message, threadId } = req.body;

  try {
    let thread;
    if (threadId) {
      thread = { id: threadId };
    } else {
      thread = await openai.beta.threads.create();
    }

    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message
    });

    let responseText = "";
    
    // Stream the assistant's response
    await openai.beta.threads.runs.stream(thread.id, {
      assistant_id: assistantId
    })
      .on('textDelta', (textDelta) => {

        if (textDelta.value && typeof textDelta.value === 'object') {

          responseText += textDelta.value.content || '';
        } else if (typeof textDelta.value === 'string') {
          responseText += textDelta.value;
        }
      })
      .on('end', () => {
        res.json({ threadId: thread.id, response: responseText });
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
