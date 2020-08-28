import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { NoteTitle } from '../../containers/Notes/Note/NoteElements';
import Plus from '../../icons/plus.svg';
import DeleteIcon from '../../icons/delete.svg';
import Tool from '../../components/Toolbar/Tool';
import CompletedTodo from './CompletedTodo/CompletedTodo';

// TODO
// Lost check between note - editable note
// Add border onFocus

// Cannot get latest todos
// PlusIcon -> Checkbox and auto-creating an additional todo
// In case of content doesn't exist when click checkbox;
// InputField
// Custom Checkbox
// Add functions (drag, truncate)

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

function TodoList({ todoContent, onBlur }) {
  const [todos, setTodos] = useState(todoContent);
  const [isHover, setIsHover] = useState({ hoverID: '', onHover: false });
  const { hoverID, onHover } = isHover;

  const isEditable = useSelector((state) => state.isSelected);
  const doneTodo = todos ? todos.filter((todo) => todo.isDone).length : 0;

  ///////////////////
  useEffect(() => {
    //console.log(todos);
  }, [todos]);
  /////////////////////

  const saveEditedTodo = (e, id) => {
    const newContent = e.currentTarget.innerHTML;

    const editedTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, todoItem: newContent } : todo,
    );

    setTodos(editedTodo); // Re-rendering
    onBlur(todos); // Re-rendering
  };

  const handleDeleteTodo = (id) => {
    let newTodos = todos.filter((el) => el.id !== id);
    setTodos(newTodos);
    onBlur(todos);
  };

  const handleOnMouseOver = (id) => {
    setIsHover({ hoverID: id, onHover: true });
  };

  const handleOnMouseLeave = (id) => {
    setIsHover({ hoverID: id, onHover: false });
  };

  const handleCheckbox = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
    );
    setTodos(newTodos);
    console.log('[todos]' + todos);
  };

  const todoTask = todos.filter((todo) => !todo.isDone);
  const doneTask = todos.filter((todo) => todo.isDone);

  if (isEditable && todos) {
    let todoList = todoTask.map((todo, i) => (
      <TodoListContainer
        key={i}
        onMouseEnter={() => handleOnMouseOver(todo.id)}
        onMouseLeave={() => handleOnMouseLeave(todo.id)}
      >
        <Checkbox
          type="checkbox"
          checked={todo.isDone}
          onChange={() => handleCheckbox(todo.id)}
        />
        <NoteTitle
          isTodoItem
          size="medium"
          placeholder="Add Todo"
          onBlur={(e) => saveEditedTodo(e, todo.id)}
          contentEditable
          suppressContentEditableWarning="true"
        >
          {todo.todoItem}
        </NoteTitle>
        {hoverID === todo.id && onHover && (
          <Tool
            title="Delete Todo"
            bgImage={DeleteIcon}
            deleteTodo={() => handleDeleteTodo(todo.id)}
          />
        )}
      </TodoListContainer>
    ));

    let doneList = doneTask.map((todo, i) => (
      <TodoListContainer
        key={i}
        onMouseEnter={() => handleOnMouseOver(todo.id)}
        onMouseLeave={() => handleOnMouseLeave(todo.id)}
      >
        <Checkbox
          type="checkbox"
          onBlur={() => handleCheckbox(todo.id)}
          checked={todo.isDone}
        />
        <NoteTitle
          isTodoItem
          size="medium"
          placeholder="Add Todo"
          onInput={(e) => saveEditedTodo(e, todo.id)}
          contentEditable
          suppressContentEditableWarning="true"
        >
          {todo.todoItem}
        </NoteTitle>
        {hoverID === todo.id && onHover && (
          <Tool
            title="Delete Todo"
            bgImage={DeleteIcon}
            deleteTodo={() => handleDeleteTodo(todo.id)}
          />
        )}
      </TodoListContainer>
    ));

    return (todoList = (
      <div>
        {todoList}
        {doneTodo > 0 && <CompletedTodo doneTodo={doneTodo} />}
        {doneList}
      </div>
    ));
  }

  // if (!isEditable && todos) {
  //   const todoList = todos.map((todo, i) => (
  //     <TodoListContainer key={i}>
  //       <Checkbox type="checkbox" />
  //       <NoteTitle size="small">{todo.todoItem}</NoteTitle>
  //     </TodoListContainer>
  //   ));

  //   return todoList;
  // }
  if (!isEditable && todos) {
    const todoList = todos.map((todo, i) => (
      <TodoListContainer key={i}>
        <Checkbox
          type="checkbox"
          onChange={() => handleCheckbox(todo.id)}
          checked={todo.isDone}
        />
        <NoteTitle size="small">{todo.todoItem}</NoteTitle>
      </TodoListContainer>
    ));

    return todoList;
  }
  return null;
}

export default TodoList;
