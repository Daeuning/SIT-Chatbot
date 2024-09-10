import React, { useEffect } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown'; 
import { COLORS } from "../../styles/colors.jsx";

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
    border: ${(props) => (!props.isUser && !props.isStep ? '1px solid rgba(217, 217, 217, 0.5)' : 'none')};
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

const LabelContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center; 
`
const Label = styled.div`
    font-size: 14px;
    color: ${COLORS.basic_font};
`;

const checkpoints = [
    { step: 1, label: "소수의 이해", active: true },
    { step: 2, label: "모듈로 산술", active: true },
    { step: 3, label: "오일러 토션트 함수", active: false },
    { step: 4, label: "공개 키 생성", active: false },
    { step: 5, label: "비밀 키 생성", active: false },
    { step: 6, label: "RSA를 통한 암호화", active: false },
];

const DialogBox = ({ text, isUser, isStep }) => {
    const matchingCheckpoint = checkpoints.find((checkpoint) => {
        const stepToCompare = typeof isStep === 'string' ? parseInt(isStep, 10) : isStep;
        return checkpoint.step === stepToCompare;
    });

    useEffect(() => {
        console.log('isStep value:', isStep);
    }, [isStep]);

    return (
        <Container isUser={isUser}>
            <div>
                {!isUser && matchingCheckpoint && (
                    <LabelContainer>
                        <span class="material-symbols-outlined md-22 md-dark_green">check_circle</span>
                        <Label>{matchingCheckpoint.label}</Label>
                    </LabelContainer>
                )}
                <MessageBubble isUser={isUser} isStep={isStep}>
                    <ReactMarkdown>{text}</ReactMarkdown>
                </MessageBubble>
            </div>
        </Container>
    );
};

export default DialogBox;
