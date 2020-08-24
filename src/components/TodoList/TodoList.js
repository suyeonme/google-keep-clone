import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import uniqid from 'uniqid';

import { NoteTitle } from '../../containers/Notes/Note/NoteElements';
import Plus from '../../icons/plus.svg';
// TODO
// PlusIcon -> Checkbox
// Add functions (delete, check, drag)

const TodoListContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  padding: ${(props) => props.isNote && '12px 12px 0 12px'};
  border-top: ${(props) =>
    props.isFocus ? '1px solid #ccc' : '1px solid transparent'};
  border-bottom: ${(props) =>
    props.isFocus ? '1px solid #ccc' : '1px solid transparent'};
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
`;

const convertNoteToTodo = (content) => {
  const todoList = content.split(/\n/g).reduce((acc, cur) => {
    return [...acc, { id: uniqid(), todoItem: cur }];
  }, []);

  return todoList;
};

const convertTodoToNote = (todos) => {
  // todoList = [{id: 1, todoItem: 'A'}, {...}, {...}]
  // [A, B, C, D]
  // .join('/\n/g')
  const content = todos.map((todo) => todo.todoItem).join('\r\n');
  return content;

  return Object.values(list)
    .map((listItem) => listItem.listItem)
    .join('\r\n');
};

const createNewTodo = () => {
  // if (!content)
  // use in inputField
  const newTodoItem = { id: uniqid(), todoItem: '' };
};

function TodoList({ size, placeholder, content, onChangeTodo, id, onBlur }) {
  let todos = content ? convertNoteToTodo(content) : [];
  const isEditable = useSelector((state) => state.isSelected);

  // when change todo, convert to content and setState
  // onBlur
  // const name = e.target.id;
  // const value = e.currentTarget.textContent;
  // setEditableNote({ ...editableNote, [name]: value });

  const handleChangeTodo = (e, todos, todoID) => {
    // update edited todo in todos
    // [a, b, c, d] -> [a, b, e, d]
    todos.map((todo) =>
      todo.id === todoID
        ? { ...todo, todoItem: e.currentTarget.textContent }
        : todo,
    );
  };

  if (isEditable && content) {
    todos.map((todo, i) => (
      <TodoListContainer key={i} isNote>
        <Checkbox type="checkbox" />
        <NoteTitle
          id="content"
          size="small"
          //onBlur={onBlur}
          contentEditable
          suppressContentEditableWarning="true"
        >
          {todo}
        </NoteTitle>
      </TodoListContainer>
    ));

    return todos;
  }

  if (!isEditable && content) {
    todos.map((todo, i) => (
      <TodoListContainer key={i} isNote>
        <Checkbox type="checkbox" />
        <NoteTitle size="small">{todo}</NoteTitle>
      </TodoListContainer>
    ));

    return todos;
  }

  // Discard
  const [isFocus, setIsFocus] = useState(false);
  const contentArr = content ? handleLineBreak(content) : [];

  function handleSaveBack(arr) {
    let newArr = arr.join();
    newArr.replace(/,/g, /\n/g);
  }

  if (content && !isEditable) {
    const children = contentArr.map((c, i) => (
      <TodoListContainer key={i} isNote>
        <Checkbox type="checkbox" />
        <NoteTitle size="small">{c}</NoteTitle>
      </TodoListContainer>
    ));

    return children;
  }

  if (content && isEditable) {
    const children = contentArr.map((c, i) => (
      <TodoListContainer key={i} isNote>
        <Checkbox type="checkbox" />
        <NoteTitle
          id="content"
          size="small"
          onBlur={onBlur}
          contentEditable
          suppressContentEditableWarning="true"
        >
          {c}
        </NoteTitle>
      </TodoListContainer>
    ));

    return children;
  }

  return null;
}

export default TodoList;

/* Original 
function TodoList({ size, placeholder, content, onChangeTodo, id, onBlur }) {
  const [isFocus, setIsFocus] = useState(false);
  const contentArr = content ? handleLineBreak(content) : [];
  const isEditable = useSelector((state) => state.isSelected);

  function handleSaveBack(arr) {
    let newArr = arr.join();
    newArr.replace(/,/g, /\n/g);
  }

  if (content && !isEditable) {
    const children = contentArr.map((c, i) => (
      <TodoListContainer key={i} isNote>
        <Checkbox type="checkbox" />
        <NoteTitle size="small">{c}</NoteTitle>
      </TodoListContainer>
    ));

    return children;
  }

  if (content && isEditable) {
    const children = contentArr.map((c, i) => (
      <TodoListContainer key={i} isNote>
        <Checkbox type="checkbox" />
        <NoteTitle
          id="content"
          size="small"
          onBlur={onBlur}
          contentEditable
          suppressContentEditableWarning="true"
        >
          {c}
        </NoteTitle>
      </TodoListContainer>
    ));

    return children;
  }

  return null;
}

export default TodoList; */
