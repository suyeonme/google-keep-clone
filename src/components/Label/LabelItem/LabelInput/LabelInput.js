import React from 'react';
import styled from 'styled-components';

import { TodoItemInput as Input } from '../../../TodoList/TodoInput/TodoInput';
import Search from '../../../../icons/search.svg';

const InputContainer = styled.div`
  position: relative;
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  background: url(${Search}) no-repeat center center;
  background-size: cover;
`;

function LabelInput({ label, onChange }) {
  return (
    <InputContainer>
      <Input
        placeholder="Enter label name"
        value={label}
        onChange={(e) => onChange(e.target.value)}
        labelInput
      />
      <SearchIcon />
    </InputContainer>
  );
}

export default React.memo(LabelInput);
