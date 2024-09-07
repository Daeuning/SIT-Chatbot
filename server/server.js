require('dotenv').config();
const express = require('express');
const path = require('path'); 
const OpenAI = require('openai');
const cors = require('cors'); 

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.static(path.join(__dirname, 'public')));

// 챗봇 대화 엔드포인트
app.post('/api/chat', async (req, res) => {  
  const userPrompt = req.body.message;  
  console.log('User Message:', userPrompt);
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userPrompt }],
      max_tokens: 100
    });
    const gptResponse = response.choices[0].message.content;
    console.log('GPT Response:', gptResponse);
    res.json({ message: gptResponse }); 
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/evaluate', async (req, res) => {
  const userPrompt = req.body.message;  
  console.log('Evaluating Message:', userPrompt);
  try {
    
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', 
      messages: [{ role: 'user', content: userPrompt }],
      max_tokens: 100
    });
    const evaluationResponse = response.choices[0].message.content;
    console.log('Evaluation Response:', evaluationResponse);
    res.json({ evaluation: evaluationResponse });
  } catch (error) {
    console.error('Error evaluating message:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(8080, function () {
  console.log('Server is listening on port 8080');
});
