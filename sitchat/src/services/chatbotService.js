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




