import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';  // Redux 상태를 불러오기 위한 import
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
  width: 900px; 
  margin-top: 30px;
  margin-bottom: 30px;
  border: 1px solid ${COLORS.light_grey};
  border-radius: 30px;
  padding: 35px 60px 35px 60px;
  box-sizing: border-box;
`;

const ChatContainer = styled.div`
  display: flex;
  width: 900px;
  height: 80%;
`;

function Main() {

  const evaluationState = useSelector((state) => state.evaluation);

  return (
    <Container>
      <SideBar />
      <ChatSection>
        <ProgressBarContainer>
          <ProgressBar evaluationNumber={evaluationState.evaluationNumber} />
        </ProgressBarContainer>
        <ChatContainer>
          <Chatbot/>
        </ChatContainer>
      </ChatSection>
    </Container>
  );
}

export default Main;
