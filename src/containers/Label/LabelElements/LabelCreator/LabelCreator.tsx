import React from 'react';
import styled from 'styled-components';

import Plus from 'icons/plus.svg';
import { addLabelToStore } from 'shared/firebase';
import { Dispatcher } from 'shared/types';

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

interface LabelCreator {
  id?: string;
  label: string;
  isInputField?: boolean;
  addLabelToNote: (id: string, label: string) => void;
  addLabelToInputField?: (label: string) => void;
  clearLabelInput: Dispatcher<string>;
}

const LabelCreator = ({
  id,
  label,
  isInputField,
  addLabelToNote,
  addLabelToInputField,
  clearLabelInput,
}: LabelCreator) => {
  const handleClick = (label: string) => {
    if (isInputField && addLabelToInputField) {
      addLabelToInputField(label);
      addLabelToStore(label);
    } else if (id) {
      addLabelToNote(id, label);
      clearLabelInput('');
    }
  };

  return (
    <Container onClick={() => handleClick(label)} id="labelCreator">
      <PlusIcon />
      <Description>
        Create <strong>"{label}"</strong>
      </Description>
    </Container>
  );
};

export default React.memo(LabelCreator);
