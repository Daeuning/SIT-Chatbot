import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown'; 

const Container = styled.div`
    display: flex;
    flex-direction: row; 
    justify-content: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')}; 
    margin: 10px;
`;

const MessageBubble = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1px 20px;
    margin: 10px 0px;
    border-radius: ${(props) => (props.isUser ? '30px 30px 0px 30px' : '0px 30px 30px 30px')};
    background-color: ${(props) => (props.isUser ? '#f5f5f5' : 'rgba(121, 173, 147, 0.1)')};
    color: ${(props) => (props.isUser ? '#373D47' : '#0D6634')};
    word-wrap: break-word;
    text-align: ${(props) => (props.isUser ? 'right' : 'left')};


`;

const DialogBox = ({ text, isUser }) => {
    return (
        <Container isUser={isUser}>
            <MessageBubble isUser={isUser}>
                <ReactMarkdown>{text}</ReactMarkdown>
            </MessageBubble>
        </Container>
    );
};

export default DialogBox;
