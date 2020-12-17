import React from 'react';
import styled from 'styled-components';

import { TodoItemInput } from 'components/TodoList/TodoInput/TodoInput';
import Search from 'icons/search.svg';
import { Dispatcher } from 'shared/types';

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

const LabelItemInput = styled(TodoItemInput)`
  font-weight: 400;
  padding: 8px 12px;
`;

interface LabelInputProp {
  label: string;
  setLabel: Dispatcher<string>;
}

const LabelInput = ({ label, setLabel }: LabelInputProp) => {
  return (
    <InputContainer>
      <LabelItemInput
        placeholder="Enter label name"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <SearchIcon />
    </InputContainer>
  );
};

export default React.memo(LabelInput);
