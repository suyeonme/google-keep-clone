import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import uniqid from 'uniqid';

import { NoteTitle } from '../../containers/Notes/Note/NoteElements';
import Plus from '../../icons/plus.svg';
// TODO
// Save todo when edited
// Convert it to string and setState
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

const convertTodoToNote = (todos) => {
  return todos.map((todo) => todo.todoItem).join('\r\n');
};

const handleUpdateTodo = (e) => {
  // Convert value to string
  // SetState
};

function TodoList({ content, onBlur }) {
  const isEditable = useSelector((state) => state.isSelected);
  let todos = content ? convertNoteToTodo(content) : [];

  function convertNoteToTodo(content) {
    return content.split(/\n/g).reduce((acc, cur) => {
      return [...acc, { id: uniqid(), todoItem: cur }];
    }, []);
  }

  const handleEditTodo = (e, id) => {
    const editedTodo = e.currentTarget.innerHTML;
    const findTodo = todos.find((t) => t.id === id);

    if (findTodo && findTodo['todoItem']) findTodo['todoItem'] = editedTodo;
  };

  if (isEditable && todos) {
    const todoList = todos.map((todo, i) => (
      <TodoListContainer key={i} isNote>
        <Checkbox type="checkbox" />
        <NoteTitle
          id="content"
          size="small"
          onBlur={(e) => handleEditTodo(e, todo.id)}
          //onBlur={onBlur}
          contentEditable
          suppressContentEditableWarning="true"
        >
          {todo.todoItem}
        </NoteTitle>
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

/*  When need name of each todoItem 
    const todoList = str.split(/\n/g).reduce((acc, cur) => {
    const id = uniqid();
    return {
      ...acc,
      [id]: {
        id,
        todoItem: cur,
      },
    };
  }, {});
  return Object.values(todoList) */

/*   const createNewTodo = () => {
    // if (!content) use in inputField
    const newTodoItem = { id: uniqid(), todoItem: '' };
  }; */

/*   const convertNoteToTodo = (content) => {
    content.trim();
    return content.split(/\r?\n|\r/g).reduce((acc, cur) => {
      return [...acc, { id: uniqid(), todoItem: cur }];
    }, []);
  };
  
  const convertTodoToNote = (todos) => {
    return todos.map((todo) => todo.todoItem).join('\r\n');
  };
  
  function TodoList({ size, placeholder, content, onChangeTodo, onBlur }) {
    let todos = content ? convertNoteToTodo(content) : [];
    const isEditable = useSelector((state) => state.isSelected);
  
    useEffect(() => {
      todos = content ? convertNoteToTodo(content) : [];
    }, [content]);
  
    const handleChangeTodo = (e, todoID) => {
      // [{id: 1, todoItem: 'apple'}, {...}, {...}]
      const editedTodoItem = e.currentTarget.textContent;
  
      todos.forEach((todo) =>
        todo.id === todoID ? { ...todo, todoItem: editedTodoItem } : todo,
      );
    };
  
    const handleUpdateTodo = (e) => {
      // Convert value to string
      // SetState
    };
  
    if (isEditable && content) {
      const todoList = todos.map((todo, i) => (
        <TodoListContainer key={i} isNote>
          <Checkbox type="checkbox" />
          <NoteTitle
            id="content"
            size="small"
            //onInput={(e) => handleChangeTodo(e, todo.id)}
            onInput={(e) => console.log(e.currentTarget.textContent)}
            //onBlur={onBlur}
            contentEditable
            suppressContentEditableWarning="true"
          >
            {todo.todoItem}
          </NoteTitle>
        </TodoListContainer>
      ));
  
      return todoList;
    }
  
    if (!isEditable && content) {
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
  
  export default TodoList; */
