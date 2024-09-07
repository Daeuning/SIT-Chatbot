import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  width: 700px; /* ProgressBar의 너비를 줄이기 */
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
  width: 20px;
  height: 20px;
  background-color: ${(props) => (props.active ? '#2e7d32' : '#fff')};
  border: 2px solid #2e7d32;
  border-radius: 50%;
  position: absolute;
  top: -15px;  /* 조정된 위치 */
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
  top: 25px; /* Adjust as needed */
  left: ${(props) => props.left}%;
  transform: translateX(-50%);
  white-space: nowrap;  /* 텍스트가 한 줄로 나오도록 설정 */
  overflow: hidden;
  text-overflow: ellipsis;  /* 텍스트가 넘칠 때 줄임표 표시 */
`;

const ProgressBar = ({ checkpoints }) => {
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
