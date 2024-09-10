import React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { COLORS } from "../styles/colors.jsx";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(180deg, rgba(0,0,0,.2), rgba(255,0,0,0) 60%);
  display: flex;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px 40px;
  border-radius: 8px;
  width: 400px;
  height: 180px;
  position: relative;
  margin-top: 50px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
`;


const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  color: #333;

  & strong {
    font-weight: bold;
  }

  &.muted {
    font-size: 12px;
    color: ${COLORS.normal_grey};
    margin-top: 10px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CompleteButton = styled.button`
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  flex: 1;
  margin-right: 10px;
  font-family: 'Pretendard';

  &:hover {
    background-color: #276c29;
  }
`;

const ContinueButton = styled.button`
  background-color: white;
  color: #2e7d32;
  border: 1px solid #2e7d32;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  flex: 1;
  font-family: 'Pretendard';

  &:hover {
    background-color: #f9f9f9;
  }
`;

const TaskCompletionModal = ({ isOpen, onClose, onComplete, onContinue }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>
        <span class="material-symbols-outlined md-24 md-grey">close</span>
        </CloseButton>
        <Title>문제를 해결하셨나요?</Title>
        <Text>
          <strong>Task</strong> 완료와 부합하는 대화가 감지되었습니다.
          <br />
          이대로 <strong>Task</strong>를 완료할까요?
        </Text>
        <Text className="muted">Task를 완료해도 대화를 더 이어갈 수 있습니다.</Text>
        <ButtonGroup>
          <CompleteButton onClick={() => { onComplete(); onClose(); }}>Task 완료하기</CompleteButton>
          <ContinueButton onClick={() => { onContinue(); onClose(); }}>대화 더 이어가기</ContinueButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>,
    document.getElementById('modal-root') 
  );
};

export default TaskCompletionModal;
