import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { NoteTitle } from '../../containers/Notes/Note/NoteElements';
import Plus from '../../icons/plus.svg';
import DeleteIcon from '../../icons/delete.svg';
import Tool from '../../components/Toolbar/Tool';

import CompletedTodo from './CompletedTodo/CompletedTodo';
// TODO
// Add Completed Items (add isDone to todoItem object)

// Add border onFocus
// lost check when open editable note
// Custom Checkbox
// Add functions (drag, truncate)
// PlusIcon -> Checkbox and auto-creating an additional todo
// In case of content doesn't exist when click checkbox

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

  const saveEditedTodo = (e, id) => {
    // Last character not updated (update and delete)
    // One tempo is late
    const newContent = e.currentTarget.innerHTML;

    const editedTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, todoItem: newContent } : todo,
    );

    setTodos(editedTodo);
    console.log(todos);
    onBlur(todos);
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

  //////////////// isDone
  const handleCheckbox = (e, id) => {
    //const doneTask = e.target.checked;

    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
    );
    console.log('[newTodos]' + JSON.stringify(newTodos));
    setTodos(newTodos);
    console.log('[todos]' + JSON.stringify(todos)); // newTodos are working
  };

  //////////////////
  if (isEditable && todos) {
    let todoList = todos.map((todo, i) => (
      <TodoListContainer
        key={i}
        onMouseEnter={() => handleOnMouseOver(todo.id)}
        onMouseLeave={() => handleOnMouseLeave(todo.id)}
      >
        <Checkbox type="checkbox" onClick={(e) => handleCheckbox(e, todo.id)} />
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

    return (todoList = (
      <>
        {todoList}
        {/* {doneTasks > 0 && <CompletedTodo doneTasks={doneTasks} />} */}
      </>
    ));
  }

  if (!isEditable && todos) {
    const todoList = todos.map((todo, i) => (
      <TodoListContainer key={i}>
        <Checkbox type="checkbox" />
        <NoteTitle size="small">{todo.todoItem}</NoteTitle>
      </TodoListContainer>
    ));

    return todoList;
  }
  return null;
}

export default TodoList;

// function TodoList({ content, onBlur }) {
//   const [isHover, setIsHover] = useState({ hoverID: '', onHover: false });
//   const { hoverID, onHover } = isHover;

//   const isEditable = useSelector((state) => state.isSelected);
//   let todos = content ? convertNoteToTodo(content) : [];

//   const convertTodoToNote = (arr) => {
//     return arr.map((todo) => todo.todoItem).join('\r\n');
//   };

//   function convertNoteToTodo(str) {
//     return str.split(/\n/g).reduce((todos, todo, i) => {
//       return [...todos, { id: i, todoItem: todo, isDone: false }];
//     }, []);
//   }

//   const saveEditedTodo = (e, id, arr) => {
//     const editedTodo = arr.find((el) => el.id === id);

//     if (editedTodo && editedTodo['todoItem']) {
//       const newContent = e.currentTarget.innerHTML;
//       return (editedTodo['todoItem'] = newContent);
//     }
//   };

//   const handleUpdateTodo = (e, id, arr) => {
//     saveEditedTodo(e, id, arr);
//     const newTodos = convertTodoToNote(arr);
//     onBlur(newTodos);
//   };

//   const handleDeleteTodo = (id, arr) => {
//     let newTodos = arr.filter((el) => el.id !== id);
//     newTodos = convertTodoToNote(newTodos);
//     onBlur(newTodos);
//   };

//   const handleOnMouseOver = (id) => {
//     setIsHover({ hoverID: id, onHover: true });
//   };

//   const handleOnMouseLeave = (id) => {
//     setIsHover({ hoverID: id, onHover: false });
//   };

//   //////////////// Checkbox
//   // NOTE state
//   // const [isDone, setIsDone] = useState(todos);
//   // const doneTasks = isDone.filter((todo) => todo.isDone).length;

//   // const handleClick = (id) => {
//   //   const newState = isDone.map((el) =>
//   //     el.id === id ? { ...el, isDone: !el.isDone } : el,
//   //   );
//   //   setIsDone(newState);
//   // };

//   let todoArr = [];
//   function handleClick(e, id) {
//     const isChecked = e.target.checked;
//     const newArr = todos.map((el) =>
//       el.id === id ? { ...el, isDone: isChecked } : el,
//     );
//     // todos = newArr;
//     //console.log(newArr.filter((el) => el.isDone).length);
//   }

//   //////////////////
//   if (isEditable && todos) {
//     let todoList = todos.map((todo, i) => (
//       <TodoListContainer
//         key={i}
//         onMouseEnter={() => handleOnMouseOver(todo.id)}
//         onMouseLeave={() => handleOnMouseLeave(todo.id)}
//       >
//         <Checkbox type="checkbox" onChange={(e) => handleClick(e, todo.id)} />
//         <NoteTitle
//           isTodoItem
//           size="medium"
//           placeholder="Add Todo"
//           onBlur={(e) => handleUpdateTodo(e, todo.id, todos)}
//           contentEditable
//           suppressContentEditableWarning="true"
//         >
//           {todo.todoItem}
//         </NoteTitle>
//         {hoverID === todo.id && onHover && (
//           <Tool
//             title="Delete Todo"
//             bgImage={DeleteIcon}
//             deleteTodo={() => handleDeleteTodo(todo.id, todos)}
//           />
//         )}
//       </TodoListContainer>
//     ));

//     return (todoList = (
//       <>
//         {todoList}
//         {/* {doneTasks > 0 && <CompletedTodo doneTasks={doneTasks} />} */}
//       </>
//     ));
//   }

//   if (!isEditable && todos) {
//     const todoList = todos.map((todo, i) => (
//       <TodoListContainer key={i}>
//         <Checkbox type="checkbox" />
//         <NoteTitle size="small">{todo.todoItem}</NoteTitle>
//       </TodoListContainer>
//     ));

//     return todoList;
//   }
//   return null;
// }

// export default TodoList;
