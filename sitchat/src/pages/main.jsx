import React from 'react';
import styled from 'styled-components';
import Chatbot from "../features/Chatbot.jsx"

const Container = styled.div`
  display: flex;
`;

function Main() {

    return (
      <Container>
        <Chatbot />
      </Container>
    );
  }
  
  export default Main;