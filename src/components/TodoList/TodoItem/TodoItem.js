import React, { useState } from 'react';
import styled from 'styled-components';

import { NoteTitle } from '../../../containers/Notes/Note/NoteElements';
import DeleteIcon from '../../../icons/delete.svg';
import Tool from '../../Toolbar/Tool';

const Checkbox = styled.input`
  margin-right: 1rem;
  }

  &:checked + ${NoteTitle} {
    text-decoration-line: line-through;
    color: #80868a;
  }
`;

export const TodoListContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  padding: 0 11px 0 11px;
  margin: 1px 0;
  border-top: ${(props) =>
    props.isFocus ? '1px solid #ccc' : '1px solid transparent'};
  border-bottom: ${(props) =>
    props.isFocus ? '1px solid #ccc' : '1px solid transparent'};
`;

const TodoInput = styled.input`
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
`;

function TodoItem({
  todo,
  isEditable,
  isTodoItem,
  onCheck,
  onBlur,
  onDelete,
  onChange,
  inputFocus,
}) {
  const { id, todoItem, isDone } = todo;
  const [isHover, setIsHover] = useState({ hoverID: '', onHover: false });
  const { hoverID, onHover } = isHover;

  const handleOnMouseOver = (id) => {
    setIsHover({ hoverID: id, onHover: true });
  };

  const handleOnMouseLeave = (id) => {
    setIsHover({ hoverID: id, onHover: false });
  };

  return (
    <TodoListContainer
      onMouseEnter={isEditable ? () => handleOnMouseOver(id) : null}
      onMouseLeave={isEditable ? () => handleOnMouseLeave(id) : null}
    >
      <Checkbox type="checkbox" checked={isDone} onChange={() => onCheck(id)} />
      <TodoInput
        placeholder="New List"
        value={todoItem && todoItem}
        autoFocus={inputFocus}
        onChange={onChange ? (e) => onChange(e, id) : null}
        onBlur={(e) => onBlur(e, id)}
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

export default TodoItem;
