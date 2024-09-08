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
    });
    return response.data.evaluation;
  } catch (error) {
    console.error('Error sending evaluation:', error);
    throw error;
  }
};


