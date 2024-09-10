import React, { useEffect, useState } from 'react';
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

const ProgressBar = ({ evaluationNumber }) => {
  const pointsarray = [
    { step: 1, label: "RSA 암호화 방법", active: evaluationNumber == 1 },
    { step: 2, label: "소수의 곱", active: evaluationNumber == 2 },
    { step: 3, label: "오일러 토션트 함수", active: evaluationNumber == 3 },
    { step: 4, label: "공개 키 생성", active: evaluationNumber == 4 },
    { step: 5, label: "비밀 키 생성", active: evaluationNumber == 5 },
    { step: 6, label: "RSA를 통한 암호화", active: evaluationNumber == 6 },
  ];

  const [checkpoints, setCheckpoints] = useState([
    { step: 0, label: "", active: false },
    { step: 0, label: "", active: false },
    { step: 0, label: "", active: false },
    { step: 6, label: "RSA를 통한 암호화", active: evaluationNumber >= 6 },
  ]);

  useEffect(() => {
    const newPoint = pointsarray.find((point) => point.step === evaluationNumber);

    if (newPoint) {
      let newCheckpoints = [...checkpoints];

      if (evaluationNumber === 6) {
        const activeCheckpoints = newCheckpoints.filter((checkpoint, index) => {
          return checkpoint.active && index !== 0 && index !== newCheckpoints.length - 1;
        });
  
        newCheckpoints = [
          newCheckpoints[0], 
          ...activeCheckpoints,
          newPoint, 
        ];
      } else {
        
        const activeMarkers = newCheckpoints.filter((cp) => cp.active).length;
        const isMarkerAlreadyActive = newCheckpoints.some((cp) => cp.step === evaluationNumber);

        if (!isMarkerAlreadyActive) {
          if (activeMarkers === 0) {
            newCheckpoints.splice(0, 1, newPoint);
          } else if (activeMarkers === 1) {
            newCheckpoints.splice(1, 1, newPoint);
          } else if (activeMarkers === 2) {
            newCheckpoints.splice(2, 1);
            const insertIndex = newCheckpoints.findIndex(
              (cp, index) =>
                cp.step < evaluationNumber &&
                newCheckpoints[index + 1] &&
                newCheckpoints[index + 1].step > evaluationNumber
            );
            if (insertIndex !== -1) {
              newCheckpoints.splice(insertIndex + 1, 0, newPoint);
            } else {
              newCheckpoints.push(newPoint);
            }
          } else if (activeMarkers === 3) {
            const insertIndex = newCheckpoints.findIndex(
              (cp, index) =>
                cp.step < evaluationNumber &&
                newCheckpoints[index + 1] &&
                newCheckpoints[index + 1].step > evaluationNumber
            );
            if (insertIndex !== -1) {
              newCheckpoints.splice(insertIndex + 1, 0, newPoint);
            } else {
              newCheckpoints.push(newPoint);
            }
          }
        }
      }

      setCheckpoints(newCheckpoints);
    }
  }, [evaluationNumber]);

  const activeIndex = checkpoints.findLastIndex((cp) => cp.active);

  const progressPercentage = activeIndex === -1 ? 0 : (100 / (checkpoints.length - 1)) * activeIndex;

  return (
    <Container>
      <LabelContainer>
        {checkpoints.map((checkpoint, index) => (
          <Label key={index} left={(index / (checkpoints.length - 1)) * 100}>
            {checkpoint.label}
          </Label>
        ))}
      </LabelContainer>
      <ProgressTrack>
        <FilledTrack width={progressPercentage} />
        {checkpoints.map((checkpoint, index) => (
          <Marker key={index} active={checkpoint.active} left={(index / (checkpoints.length - 1)) * 100} />
        ))}
      </ProgressTrack>
    </Container>
  );
};

export default ProgressBar;

