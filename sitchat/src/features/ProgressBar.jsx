import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  background-color: #f0f0f0;
`;

const ProgressTrack = styled.div`
  height: 10px;
  width: ${(props) => props.width}%;
  background-color: #c8e6c9;
  border-radius: 5px;
  position: absolute;
`;

const Marker = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => (props.active ? '#2e7d32' : '#fff')};
  border: 2px solid #2e7d32;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;


const Label = styled.span`
  margin-top: 5px;
  font-size: 14px;
`;

const ProgressBar = ({ checkpoints }) => {
  const progressPercentage = (100 / (checkpoints.length - 1)) * (checkpoints.filter(cp => cp.active).length - 1);
  
  return (
    <Container>
      <div style={{ position: 'relative', width: '100%' }}>
        <ProgressTrack width={progressPercentage} />
        <LabelContainer>
          {checkpoints.map((checkpoint, index) => (
            <div key={index} style={{ textAlign: 'center', flex: 1, position: 'relative' }}>
              <Marker active={checkpoint.active}></Marker>
              <Label>{checkpoint.label}</Label>
            </div>
          ))}
        </LabelContainer>
      </div>
    </Container>
  );
};

export default ProgressBar;
