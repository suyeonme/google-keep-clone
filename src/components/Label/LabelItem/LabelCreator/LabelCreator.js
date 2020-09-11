import React from 'react';
import styled from 'styled-components';

import Plus from '../../../../icons/plus.svg';

const Container = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #dadce0;
  cursor: pointer;
  padding: 5px 10px;

  &:hover {
    background-color: #f1f3f4;
  }
`;

const PlusIcon = styled.div`
  width: 10px;
  height: 10px;
  background: url(${Plus}) no-repeat center center;
  background-size: cover;
`;

const Description = styled.p`
  margin-left: 7px;
  padding-top: 2px;
  vertical-align: top;
`;

function LabelCreator({ label, onClick, id, onAdd, isInputField, setNote }) {
  const handleClick = (id, label) => {
    onClick(label);
    isInputField ? setNote(label) : onAdd(id, label);
  };

  return (
    <Container onClick={() => handleClick(id, label)}>
      <PlusIcon />
      <Description>
        Create <strong>"{label}"</strong>
      </Description>
    </Container>
  );
}

export default LabelCreator;
