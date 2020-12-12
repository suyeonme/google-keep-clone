import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

import plus from 'icons/plus.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 30px;
  padding: 0 2.5rem;
  margin: 1px 0;

  &:focus-within {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
`;

const PlusIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 1rem;
  background: url(${plus}) center center no-repeat;
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
  font-size: 1.4rem;
  letter-spacing: ${(props) => props.addingTodo && '0.5px'};
`;

function TodoInput({ onAdd }) {
  const [todoInput, setTodoInput] = useState('');

  const handleChange = (e) => {
    const newTodoItem = {
      id: uniqid(),
      todoItem: e.target.value,
      isDone: false,
    };

    onAdd(newTodoItem);
    setTodoInput('');
  };

  return (
    <Wrapper isFocus>
      <PlusIcon />
      <TodoItemInput
        autoFocus
        addingTodo
        placeholder="List Item"
        value={todoInput}
        onChange={handleChange}
      />
    </Wrapper>
  );
}

TodoInput.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default React.memo(TodoInput);
