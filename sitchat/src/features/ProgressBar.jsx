import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  width: 700px; 
`;

const ProgressTrack = styled.div`
  height: 10px;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  margin-bottom: 20px;
`;

const FilledTrack = styled.div`
  height: 100%;
  background-color: #c8e6c9;
  border-radius: 5px;
  width: ${(props) => props.width}%;
  transition: width 0.5s ease-in-out;
`;

const Marker = styled.div`
  width: 18px;
  height: 18px;
  background-color: #fff;
  box-shadow: ${(props) => props.active ? '0 0 0 4px #2e7d32 inset' : '0 0 0 1px #D9D9D9 inset'}; 
  border-radius: 50%;
  position: absolute;
  top: -4px;  
  left: ${(props) => props.left}%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
`;

const Label = styled.span`
  font-size: 14px;
  text-align: center;
  position: absolute;
  top: 25px; 
  left: ${(props) => props.left}%;
  transform: translateX(-50%);
  white-space: nowrap;  
  overflow: hidden;
  text-overflow: ellipsis;  
`;

const ProgressBar = () => {
  const checkpoints = [
    { step: 1, label: "소수의 이해", active: true },
    { step: 2, label: "모듈로 산술", active: true },
    { step: 3, label: "오일러 토션트 함수", active: false },
    { step: 4, label: "공개 키 생성", active: false },
    { step: 5, label: "비밀 키 생성", active: false },
    { step: 6, label: "RSA를 통한 암호화", active: false },
  ];

  const activeIndex = checkpoints.findLastIndex(cp => cp.active);
  const progressPercentage = (100 / (checkpoints.length - 1)) * activeIndex;

  return (
    <Container>
      <LabelContainer>
        {checkpoints.map((checkpoint, index) => (
          <Label
            key={index}
            left={(index / (checkpoints.length - 1)) * 100}
          >
            {checkpoint.label}
          </Label>
        ))}
      </LabelContainer>
      <ProgressTrack>
        <FilledTrack width={progressPercentage} />
        {checkpoints.map((checkpoint, index) => (
          <Marker
            key={index}
            active={checkpoint.active}
            left={(index / (checkpoints.length - 1)) * 100}
          />
        ))}
      </ProgressTrack>
    </Container>
  );
};

export default ProgressBar;
