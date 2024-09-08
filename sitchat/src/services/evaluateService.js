import axios from 'axios';

const checkpoints = [
    { step: 1, label: "소수의 이해", active: true },
    { step: 2, label: "모듈로 산술", active: true },
    { step: 3, label: "오일러 토션트 함수", active: false },
    { step: 4, label: "공개 키 생성", active: false },
    { step: 5, label: "비밀 키 생성", active: false },
    { step: 6, label: "RSA를 통한 암호화", active: false },
  ];

export const sendEvaluationToApi = async (userMessage, gptMessage) => {
    try {
      const response = await axios.post('http://localhost:8080/api/evaluate', {
        userMessage: userMessage.content,
        gptMessage: gptMessage.content,
        checkpoints: checkpoints
      });
      return response.data.evaluation;
    } catch (error) {
      console.error('Error sending evaluation:', error);
      throw error;
    }
  };