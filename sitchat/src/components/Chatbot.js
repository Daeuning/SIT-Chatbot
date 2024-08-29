import React, { useState } from 'react';
import axios from 'axios';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const response = await axios.post('http://localhost:8080/api/chat', { message: input });
      const gptMessage = { role: "gpt", content: response.data.message };
      setMessages([...messages, userMessage, gptMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default Chatbot;
