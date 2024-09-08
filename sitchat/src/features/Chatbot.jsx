import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown'; 
import { sendMessageToApi, sendEvaluationToApi } from '../services/chatbotService';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f9f9f9;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
  background-color: #fff;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: #fff;
  font-size: 16px;
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

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}
      </MessagesContainer>
      <InputContainer>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <Button onClick={handleSend}>Send</Button>
      </InputContainer>
    </ChatContainer>
  );
}

export default Chatbot;
