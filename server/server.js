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
  const previousMessages = req.body.history || [];  
  console.log('User Message:', userPrompt);
  console.log('Previous Messages:', previousMessages);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: "system", content: "사용자가 알기 쉽게 마크다운 형식으로 답변을 정리해서 보내줘"},
        ...previousMessages,  
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 800
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
  const { userMessage, gptMessage, checkpoints } = req.body; 
  console.log('Evaluating Message:', userMessage);
  console.log('GPT Message:', gptMessage);
  console.log('Checkpoints:', checkpoints);
  try {
    if (!userMessage || !gptMessage) {
      return res.status(400).send('Invalid request: userMessage and gptMessage are required.');
    }
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: "system", content: `답변은 숫자 또는 'false'만 반환해야해`},
        { role: "system", content: `1. 만약 질문과 답변이 적절하지 않거나, RSA 암호화와 관련이 없는 경우, false라는 단어만 반환해.`},
        { role: "system", content: `2. RSA 암호화의 단계와 관련된 질문/답변이 적절하다고 판단될 경우, 1을 반환해`},
        { role: "system", content: `3. 사용자가 소수의 곱을 요청하고 gpt가 그 값을 계산한 답변이 적절하다고 판단될 경우, 2을 반환해`},
        { role: "system", content: `4. 오일러 토션트 함수과 관련된 질문/답변이 적절하다고 판단될 경우 3를 반환해`},
        { role: "system", content: `5. 다음 조건을 만족할 경우 4를 반환해.
          1) 사용자의 질문에 공개 키와 관한 내용이 포함되어 있어야해
          2) GPT의 답변에 최대공약수, gce, 서로소, e 라는 내용이 하나라도 들어가 있어야 해 
          조건을 만족하지 않을 경우에는 false라는 단어만 반환해`},
        { role: "system", content: `6. RSA 암호화에서 비밀 키와 관련된 질문/답변이 적절하다고 판단될 경우 5를 반환해 단, 유클리드 알고리즘과 관련된 내용이나 mod와 관련된 내용이 없을 경우 false라는 단어만 반환해`},
        { role: "system", content: `7. 다음 조건을 만족할 경우 6을 반환해.
          1) 사용자 질문에 공개 키와 개인 키에 관한 내용이 포함되어 있어야해
          2) 사용자 질문에 어떤 문자를 주고 RSA를 통해 암호화를 해달라는 내용이 포함되어야 있어야해
          3) GPT의 답변에 실제로 문자를 암호화한 과정이 포함되어 있어야 해.
          조건을 만족하지 않을 경우에는 false라는 단어만 반환해`},
        { role: 'user', content: userMessage },
        { role: 'assistant', content: gptMessage }
      ],
      max_tokens: 800
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
