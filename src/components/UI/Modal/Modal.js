import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  bottom: 10px;
  left: 10px;
  z-index: 2;
  width: 452px;
  font-size: 15px;
  color: white;
  background: #323232;
  margin: 10px;
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CloseBtn = styled.div`
  font-size: 30px;
  cursor: pointer;
`;

// Close modal

function Modal(props) {
  return (
    <ModalContainer>
      {props.children}
      <CloseBtn> &times; </CloseBtn>
    </ModalContainer>
  );
}

export default Modal;
