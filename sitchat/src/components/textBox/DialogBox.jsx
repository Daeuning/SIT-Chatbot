import React, { useEffect } from 'react';
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
    background-color: ${(props) => {
        if (!props.isUser && props.isStep) {
            return 'rgba(121, 173, 147, 0.1)';
        } else if (!props.isUser && !props.isStep) {
            return '#fff';
        }
        return '#f5f5f5';
    }};
    border: ${(props) => (!props.isUser && !props.isStep ? '1px solid #D9D9D9' : 'none')};
    color: ${(props) => {
        if (!props.isUser && props.isStep) {
            return '#0D6634';
        } else if (!props.isUser && !props.isStep) {
            return '#373D47';
        }
        return '#373D47';
    }};
    word-wrap: break-word;
    text-align: ${(props) => (props.isUser ? 'right' : 'left')};
`;

const DialogBox = ({ text, isUser, isStep }) => {

    useEffect(() => {
        console.log('isStep value:', isStep);
    }, [isStep]);

    return (
        <Container isUser={isUser}>
            <MessageBubble isUser={isUser} isStep={isStep}>
                <ReactMarkdown>{text}</ReactMarkdown>
            </MessageBubble>
        </Container>
    );
};

export default DialogBox;
