import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import Tool from 'containers/Toolbar/Tool/Tool';
import { TodoItemInput } from 'components/TodoList/TodoInput/TodoInput';
import DeleteIcon from 'icons/delete.svg';

export const TodoListContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 30px;
  padding: 0 11px 0 11px;
  margin: 1px 0;

  ${({ isEditable }) =>
    isEditable &&
    css`
    &:focus-within {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    `}
`;

export const Checkbox = styled.input`
  margin-right: 1rem;

  &:checked + ${TodoItemInput} {
    text-decoration-line: line-through;
    color: #80868a;
  }
`;

function TodoItem({
  todo,
  isEditable,
  onCheck,
  onDelete,
  inputFocus,
  readOnly,
  onChange,
  onBlur,
  noteID,
  todos,
}) {
  const { id, todoItem, isDone } = todo;
  const [isHover, setIsHover] = useState({ hoverID: '', onHover: false });
  const { hoverID, onHover } = isHover;

  const handleOnMouseOver = (id) => setIsHover({ hoverID: id, onHover: true });
  const handleOnMouseLeave = (id) =>
    setIsHover({ hoverID: id, onHover: false });

  return (
    <TodoListContainer
      isEditable={isEditable}
      onMouseEnter={isEditable ? () => handleOnMouseOver(id) : null}
      onMouseLeave={isEditable ? () => handleOnMouseLeave(id) : null}
    >
      <Checkbox
        type="checkbox"
        id="checkbox"
        checked={isDone}
        onChange={() => onCheck(id)}
      />
      <TodoItemInput
        placeholder="New List"
        value={todoItem && todoItem}
        autoFocus={inputFocus}
        onChange={(e) => onChange(e, id)}
        onBlur={onBlur ? () => onBlur(noteID, todos) : null}
        readOnly={readOnly}
      />
      {isEditable && hoverID === id && onHover && (
        <Tool
          isEditable
          title="Delete Todo"
          bgImage={DeleteIcon}
          deleteTodo={() => onDelete(noteID, id, todos)}
        />
      )}
    </TodoListContainer>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onCheck: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onDelete: PropTypes.func,
  onChange: PropTypes.func,
  inputFocus: PropTypes.bool,
  readOnly: PropTypes.bool,
  isEditable: PropTypes.bool,
  noteID: PropTypes.string,
  todos: PropTypes.array,
};

export default React.memo(TodoItem);
