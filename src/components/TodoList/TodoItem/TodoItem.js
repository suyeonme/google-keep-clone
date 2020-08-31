import React, { useState } from 'react';
import styled from 'styled-components';

import { NoteTitle } from '../../../containers/Notes/Note/NoteElements';
import Plus from '../../../icons/plus.svg';
import DeleteIcon from '../../../icons/delete.svg';
import Tool from '../../Toolbar/Tool';

const TodoListContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  padding: 0 12px 0 12px;
  ${'' /* margin-top: 12px; */}
  border-top: ${(props) =>
    props.isFocus ? '1px solid #ccc' : '1px solid transparent'};
  border-bottom: ${(props) =>
    props.isFocus ? '1px solid #ccc' : '1px solid transparent'};
`;

const PlusIcon = styled.div`
  width: 20px;
  height: 100%;
  margin-right: 1rem;
  background: url(${Plus}) center center no-repeat;
  background-size: 50%;
`;

const Checkbox = styled.input`
  margin-right: 1rem;
  }

  &:checked + ${NoteTitle} {
    text-decoration-line: line-through;
    color: #80868a;
  }
`;

function TodoItem({
  todo,
  size,
  placeholder,
  isEditable,
  isTodoItem,
  onCheck,
  onBlur,
  onDelete,
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
      <NoteTitle
        size={size}
        placeholder={placeholder}
        isTodoItem={isTodoItem}
        onBlur={(e) => onBlur(e, id)}
        contentEditable={isEditable ? true : false}
        suppressContentEditableWarning={isEditable ? true : false}
      >
        {todoItem}
      </NoteTitle>

      {isEditable && hoverID === id && onHover && (
        <Tool
          title="Delete Todo"
          bgImage={DeleteIcon}
          deleteTodo={() => onDelete(id)}
        />
      )}
    </TodoListContainer>
  );
}

export default TodoItem;
