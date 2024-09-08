import axios from 'axios';

export const sendMessageToApi = async (input) => {
  try {
    const response = await axios.post('http://localhost:8080/api/chat', { message: input });
    return response.data.message;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const sendEvaluationToApi = async (userMessage, gptMessage) => {
  try {
    const response = await axios.post('http://localhost:8080/api/evaluate', {
      userMessage: userMessage.content,
      gptMessage: gptMessage.content,
      instruction: "이 질문에 대한 답변이 올바른지 판단해줘. 맞으면 true를 반환하고, 틀리면 false를 반환해줘."
    });
    return response.data.evaluation;
  } catch (error) {
    console.error('Error sending evaluation:', error);
    throw error;
  }
};


