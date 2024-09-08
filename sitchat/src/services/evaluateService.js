import axios from 'axios';

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