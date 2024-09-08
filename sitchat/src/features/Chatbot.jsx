import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown'; 
import { sendMessageToApi, sendEvaluationToApi } from '../services/chatbotService';
import DialogBox from '../components/textBox/DialogBox.jsx'; 

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const MessagesContainer = styled.div`
  flex: 1;
  width: 100%;
  padding: 20px;
  overflow-y: auto; 
  scrollbar-width: none;
`;

const InputContainer = styled.div`
  display: flex;
  width: 80%;
  height: 40px;
  align-items: center; 
  justify-content: center;
  padding: 5px 13px 5px 20px;
  border-radius: 100px;
  background-color: #F0F0F0;
`;

const Input = styled.input`
  height: 20px;
  flex: 1;
  border: none;
  background-color: #F0F0F0;
  margin-right: 10px;
  font-size: 16px;
  font-family: 'Pretendard';

  &:focus {
    outline: none; 
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center; 
  justify-content: center;
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 50%;
  background-color: #486055;
  cursor: pointer;
`;

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return;
  
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
  
    try {
      const gptMessageContent = await sendMessageToApi(input);
      const gptMessage = { role: 'gpt', content: gptMessageContent };
      const updatedMessages = [...messages, userMessage, gptMessage];
      setMessages(updatedMessages);
  
      const evaluationResponse = await sendEvaluationToApi(userMessage, gptMessage);
      console.log('Evaluation Response:', evaluationResponse);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((msg, index) => (
          <DialogBox key={index} text={msg.content} isUser={msg.role === 'user'} /> 
        ))}
      </MessagesContainer>
      <InputContainer>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} 
          placeholder="메세지 입력하기"
        />
        <Button onClick={handleSend}>
          <span className="material-symbols-outlined md-white md-24">
            arrow_upward
          </span>
        </Button>
      </InputContainer>
    </ChatContainer>
  );
}

export default Chatbot;
