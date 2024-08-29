require('dotenv').config();
const express = require('express');
const path = require('path'); 
const OpenAI = require("openai");
const cors = require('cors'); 

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/chat', async (req, res) => {  
  const userPrompt = req.body.message;  
  console.log(userPrompt);
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ "role": "user", "content": userPrompt }],
      max_tokens: 100
    });
    console.log(response.choices[0].message.content);
    res.json({ message: response.choices[0].message.content }); 
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).send('Internal Server Error');
  }
});

// 서버 시작
app.listen(8080, function () {
  console.log('listening on 8080');
});
