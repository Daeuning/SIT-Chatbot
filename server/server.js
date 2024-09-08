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

app.post('/api/chat', async (req, res) => {  
  const userPrompt = req.body.message;  
  console.log('User Message:', userPrompt);
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: "system", "content": "사용자가 알기 쉽게 마크다운 형식으로 답변을 정리해서 보내줘"},
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 3250
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
  const { userMessage, gptMessage } = req.body; // 사용자 메시지와 GPT 메시지 추출
  console.log('Evaluating Message:', userMessage);
  console.log('GPT Message:', gptMessage);
  try {
    if (!userMessage || !gptMessage) {
      return res.status(400).send('Invalid request: userMessage and gptMessage are required.');
    }
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: "system", "content": "너는 사용자가 질문한 " + userMessage + "와 GPT가 답변한" + gptMessage + "를 보고, 사용자 질문에 대한 GPT의 답변이 적절하다고 판단되면 true를 반환하고, 적절하지 않다고 생각되면 false를 반환해줘"},
        { role: 'user', content: userMessage },
        { role: 'assistant', content: gptMessage }
      ],
      max_tokens: 3250
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
