import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import DeleteIcon from '../../../icons/delete.svg';
import Tool from '../../Toolbar/Tool';
import { TodoItemInput } from '../TodoInput/TodoInput';

export const TodoListContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  padding: 0 11px 0 11px;
  margin: 1px 0;

  &:focus-within {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
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
  onBlur,
  onDelete,
  onChange,
  inputFocus,
  readOnly,
}) {
  const { id, todoItem, isDone } = todo;
  const [isHover, setIsHover] = useState({ hoverID: '', onHover: false });
  const { hoverID, onHover } = isHover;

  const handleOnMouseOver = (id) => setIsHover({ hoverID: id, onHover: true });
  const handleOnMouseLeave = (id) =>
    setIsHover({ hoverID: id, onHover: false });

  return (
    <TodoListContainer
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
        onBlur={onBlur ? (e) => onBlur(e, id) : null}
        readOnly={readOnly}
      />
      {isEditable && hoverID === id && onHover && (
        <Tool
          title="Delete Todo"
          bgImage={DeleteIcon}
          isEditable
          deleteTodo={() => onDelete(id)}
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
};

export default React.memo(TodoItem);
