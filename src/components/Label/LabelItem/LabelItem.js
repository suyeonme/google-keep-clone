import React from 'react';
import styled from 'styled-components';

import { Checkbox } from '../../TodoList/TodoItem/TodoItem';

const LabelItemContainer = styled.div`
  background: inherit;
  cursor: pointer;
  padding: 5px 10px 5px;
  display: flex;

  &:hover {
    background-color: #f1f3f4;
  }
  &:focus-within {
    background-color: #ebebeb;
  }
`;

const Label = styled.label`
  cursor: inherit;
  width: 100%;
`;

function LabelItem({ label, id, onAdd, setNote, isInputField }) {
  const handleChange = (id, label) => {
    isInputField ? setNote(label) : onAdd(id, label);
  };

  return (
    <LabelItemContainer>
      <Checkbox
        id={label}
        type="checkbox"
        onChange={() => handleChange(id, label)}
        //onChange={() => onAdd(id, label)}
        //checked={labels.map((l) => l === label)}
      />
      <Label htmlFor={label}>{label}</Label>
    </LabelItemContainer>
  );
}

export default React.memo(LabelItem);
