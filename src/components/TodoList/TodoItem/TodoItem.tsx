import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import deleteIcon from 'icons/close.svg';
import dragIcon from 'icons/drag-indicator.svg';
import Tool from 'containers/Toolbar/Tool/Tool';
import { TodoItemInput } from 'components/TodoList/TodoInput/TodoInput';

import { Todo, TodoItemID } from 'components/TodoList/TodoList';

export const Wrapper = styled('li')<{ isEditable: boolean }>`
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

interface TodoItemProp {
  todo: Todo;
  todos?: Todo[];
  isEditable?: boolean;
  readOnly?: boolean;
  inputFocus?: boolean;
  noteID?: string;
  onCheck?: (id: TodoItemID) => void;
  onDelete?: (noteID: string, todoID: TodoItemID, todos: Todo[]) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, id: TodoItemID) => void;
  onBlur?: (noteID: string | undefined, todos: Todo[] | undefined) => void;
}

interface isHover {
  hoverID: string | number;
  onHover: boolean;
}

const TodoItem = ({
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
}: TodoItemProp) => {
  const { id, todoItem, isDone } = todo;
  const [isHover, setIsHover] = useState<isHover>({
    hoverID: '',
    onHover: false,
  });
  const { hoverID, onHover } = isHover;

  const handleOnMouseOver = (id: TodoItemID) => {
    if (isEditable) setIsHover({ hoverID: id, onHover: true });
  };

  const handleOnMouseLeave = (id: TodoItemID) => {
    if (isEditable) setIsHover({ hoverID: id, onHover: false });
  };

  return (
    <Wrapper
      isEditable
      onMouseEnter={() => handleOnMouseOver(id)}
      onMouseLeave={() => handleOnMouseLeave(id)}
    >
      {isEditable && hoverID === id && onHover && <DragIcon alt="drag icon" />}
      <Checkbox
        type="checkbox"
        id="checkbox"
        checked={isDone}
        onChange={onCheck ? () => onCheck(id) : undefined}
      />
      <TodoItemInput
        placeholder="New List"
        value={todoItem && todoItem}
        readOnly={readOnly}
        autoFocus={inputFocus}
        onBlur={onBlur ? () => onBlur(noteID, todos) : undefined}
        onChange={onChange ? (e) => onChange(e, id) : undefined}
      />
      {/* {isEditable && hoverID === id && onHover && (
          <Tool
            isEditable
            title="Delete Todo"
            bgImage={deleteIcon}
            deleteTodo={onDelete && todos ? () => onDelete(noteID, id, todos) : undefined}
          />
        )} */}
    </Wrapper>
  );
};

export default React.memo(TodoItem);
