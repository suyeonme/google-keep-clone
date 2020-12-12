import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import deleteIcon from 'icons/close.svg';
import dragIcon from 'icons/drag-indicator.svg';
import Tool from 'containers/Toolbar/Tool/Tool';
import { TodoItemInput } from 'components/TodoList/TodoInput/TodoInput';

export const Wrapper = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 30px;
  padding: ${(props) => (props.isEditable ? '0 2.5rem' : '0 1.1rem')};
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

const DragIcon = styled.div`
  position: absolute;
  left: 0.3rem;
  width: 2.2rem;
  height: 2.2rem;
  background: url(${dragIcon}) no-repeat center center;
  background-size: cover;
  cursor: move;
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
    <Wrapper
      isEditable={isEditable}
      onMouseEnter={isEditable ? () => handleOnMouseOver(id) : null}
      onMouseLeave={isEditable ? () => handleOnMouseLeave(id) : null}
    >
      {isEditable && hoverID === id && onHover && <DragIcon alt="drag icon" />}
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
          bgImage={deleteIcon}
          deleteTodo={() => onDelete(noteID, id, todos)}
        />
      )}
    </Wrapper>
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
