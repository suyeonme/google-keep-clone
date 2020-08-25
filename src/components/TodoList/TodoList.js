import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { NoteTitle } from '../../containers/Notes/Note/NoteElements';
import Plus from '../../icons/plus.svg';
import DeleteIcon from '../../icons/delete.svg';
import Tool from '../../components/Toolbar/Tool';
// TODO
// Add functions (delete, drag, truncate)
// Add border onFocus
// Add Completed Items

// Custom Checkbox
// PlusIcon -> Checkbox and auto-creating an additional todo
// In case of content doesn't exist when click checkbox
// lost check when open editable note

const TodoListContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  padding: ${(props) => props.isNote && '12px 12px 0 12px'};
  ${'' /*   border-top: ${(props) =>
    props.isFocus ? '1px solid #ccc' : '1px solid transparent'};
  border-bottom: ${(props) =>
    props.isFocus ? '1px solid #ccc' : '1px solid transparent'}; */}
  &:first-of-type {
    margin-top: 1.2rem;
  }
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

function TodoList({ content, onBlur }) {
  const [isHover, setIsHover] = useState({ hoverID: '', onHover: false });
  const { hoverID, onHover } = isHover;

  const isEditable = useSelector((state) => state.isSelected);
  let todos = content ? convertNoteToTodo(content) : [];

  const convertTodoToNote = (arr) => {
    return arr.map((todo) => todo.todoItem).join('\r\n');
  };

  function convertNoteToTodo(str) {
    return str.split(/\n/g).reduce((todos, todo, i) => {
      return [...todos, { id: i, todoItem: todo }];
    }, []);
  }

  const saveEditedTodo = (e, id, arr) => {
    const editedTodo = arr.find((el) => el.id === id);

    if (editedTodo && editedTodo['todoItem']) {
      const newContent = e.currentTarget.innerHTML;
      return (editedTodo['todoItem'] = newContent);
    }
  };

  const handleUpdateTodo = (e, id, arr) => {
    saveEditedTodo(e, id, arr);
    const newTodos = convertTodoToNote(arr);
    onBlur(newTodos);
  };

  const handleDeleteTodo = (id, arr) => {
    //const index = arr.findIndex((todo) => todo.id === id);
    //let newTodos = arr.splice(index, 1);
    //newTodos = convertTodoToNote(arr);

    let newTodos = arr.filter((el) => el.id !== id);
    newTodos = convertTodoToNote(newTodos);
    onBlur(newTodos);
  };

  const handleOnMouseOver = (id) => {
    setIsHover({ hoverID: id, onHover: true });
  };

  const handleOnMouseLeave = (id) => {
    setIsHover({ hoverID: id, onHover: false });
  };

  if (isEditable && todos) {
    const todoList = todos.map((todo, i) => (
      <TodoListContainer
        key={i}
        isNote
        onMouseEnter={() => handleOnMouseOver(todo.id)}
        onMouseLeave={() => handleOnMouseLeave(todo.id)}
      >
        <Checkbox type="checkbox" />
        <NoteTitle
          isTodoItem
          size="medium"
          placeholder="Add Todo"
          onBlur={(e) => handleUpdateTodo(e, todo.id, todos)}
          contentEditable
          suppressContentEditableWarning="true"
        >
          {todo.todoItem}
        </NoteTitle>
        {hoverID === todo.id && onHover && (
          <Tool
            title="Delete Todo"
            bgImage={DeleteIcon}
            deleteTodo={() => handleDeleteTodo(todo.id, todos)}
          />
        )}
      </TodoListContainer>
    ));

    return todoList;
  }

  if (!isEditable && todos) {
    const todoList = todos.map((todo, i) => (
      <TodoListContainer key={i} isNote>
        <Checkbox type="checkbox" />
        <NoteTitle size="small">{todo.todoItem}</NoteTitle>
      </TodoListContainer>
    ));

    return todoList;
  }
  return null;
}

export default TodoList;
