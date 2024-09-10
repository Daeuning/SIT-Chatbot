import React from 'react';
import styled from 'styled-components';
import { COLORS } from "../styles/colors.jsx";

const Container = styled.div`
    display: flex;
    align-items: center; 
    justify-content: center;
    border-radius: 30px;
    border: 1px solid #D9D9D9;
`;

const ContentContainer = styled.div `
    display: flex;
    display-direction: column;
    align-items: center; 
    gap: 12px;
`

const InputContainer = styled.input`
    display: flex;
    display-direction: row;
    align-items: center; 
    justify-content: center;
    gap: 6px;
`

const InputForm = styled.form`
    display: flex;
    align-items: center;
    border-radius: 8px;
    border: 1px solid #D9D9D9;
    padding: 9px 10px 9px 20px; 
`

const InputText = styled.form`
    display: flex;
    color:${COLORS.normal_grey};
`

const Button = styled.button`
    display: flex;
    align-items: center; 
    justify-content: center;
    background-color: ${COLORS.light_grey}
`

const Guide = styled.div`
    font-weight: 14px;
    color: ${COLORS.basic_font};
`

const InputTarget = () => {
    return (
      <Container>
        <ContentContainer>
            <Guide>
                이번 대화에서 해결할 문제나 주제를 설정해 주세요
            </Guide>
            <InputContainer>
                <InputForm>
                    <InputText />
                </InputForm>
                <Button>
                </Button>
            </InputContainer>
        </ContentContainer>
      </Container>
    );
  };
  
  export default InputTarget;