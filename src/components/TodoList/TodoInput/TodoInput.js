import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Plus from '../../../icons/plus.svg';
import { TodoListContainer } from '../TodoItem/TodoItem';
import uniqid from 'uniqid';

const PlusIcon = styled.div`
  width: 20px;
  height: 100%;
  margin-right: 1rem;
  background: url(${Plus}) center center no-repeat;
  background-size: 50%;
`;

export const TodoItemInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-family: inherit;
  font-weight: 500;
  cursor: ${(props) => (props.readOnly ? 'pointer' : 'text')};
  background: transparent;
  border-bottom: 1px solid transparent;

  font-size: ${(props) => props.addingTodo && '1.4rem'};
  letter-spacing: ${(props) => props.addingTodo && '0.5px'};
`;

function TodoInput({ setTodos }) {
  const [todoInput, setTodoInput] = useState('');

  const handleChange = (e) => {
    const newTodoItem = {
      id: uniqid(),
      todoItem: e.target.value,
      isDone: false,
    };

    setTodos(newTodoItem);
    setTodoInput('');
  };

  return (
    <TodoListContainer isFocus>
      <PlusIcon />
      <TodoItemInput
        autoFocus
        placeholder="List Item"
        value={todoInput}
        onChange={handleChange}
        addingTodo
      />
    </TodoListContainer>
  );
}

TodoInput.propTypes = {
  setTodos: PropTypes.func.isRequired,
};

export default React.memo(TodoInput);
