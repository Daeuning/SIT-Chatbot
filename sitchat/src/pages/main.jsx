import React from 'react';
import styled from 'styled-components';
import Chatbot from "../features/Chatbot.jsx";
import ProgressBar from "../features/ProgressBar.jsx";
import SideBar from "../features/SideBar.jsx";
import { COLORS } from "../styles/colors.jsx";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
`;

const ChatSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  flex: 1;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center; 
  width: 900px;  /* 너비 유지 */
  margin-top: 30px;
  margin-bottom: 50px;
  border: 1px solid ${COLORS.light_grey};
  border-radius: 30px;
  padding: 35px 60px 35px 60px;
  box-sizing: border-box;
`;

const ChatContainer = styled.div`
  display: flex;
  width: 900px;  /* 너비 일치 */
`

function Main() {
  const checkpoints = [
    { label: "소수의 이해", active: true },
    { label: "모듈로 산술", active: true },
    { label: "오일러 토션트 함수", active: false },
    { label: "공개 키 생성", active: false },
    { label: "비밀 키 생성", active: false },
    { label: "RSA를 통한 암호화", active: false },
  ];

  return (
    <Container>
      <SideBar />
      <ChatSection>
        <ProgressBarContainer>
          <ProgressBar checkpoints={checkpoints} />
        </ProgressBarContainer>
        <ChatContainer>
          <Chatbot />
        </ChatContainer>
      </ChatSection>
    </Container>
  );
}

export default Main;
