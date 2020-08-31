import React from 'react';
import styled from 'styled-components';

import Plus from '../../../icons/plus.svg';
import { TodoListContainer } from '../TodoItem/TodoItem';

const PlusIcon = styled.div`
  width: 20px;
  height: 100%;
  margin-right: 1rem;
  background: url(${Plus}) center center no-repeat;
  background-size: 50%;
`;

const TodoItemInput = styled.input`
  font-family: inherit;
  font-size: 1.4rem;
  letter-spacing: 0.5px;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;

  &::placeholder {
    font-weight: 500;
  }
`;

function TodoInput(props) {
  return (
    <TodoListContainer isFocus>
      <PlusIcon />
      <TodoItemInput placeholder="List Item" />
    </TodoListContainer>
  );
}

export default TodoInput;
