import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import update from 'immutability-helper';

import CompletedTodo from 'components/TodoList/CompletedTodo/CompletedTodo';
import TodoItem from 'components/TodoList/TodoItem/TodoItem';
import TodoInput from 'components/TodoList/TodoInput/TodoInput';
import Draggable from 'components/Draggable/Draggable';
import { convertTodoToNote } from 'shared/utility';
import { editNote } from 'shared/firebase';

const Wrapper = styled.ul`
  max-height: 223px;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

function TodoList({ todoContent = [], id, setNote, isInputField }) {
  const [todos, setTodos] = useState(todoContent);
  const [showDoneList, setShowDoneList] = useState(true);

  const editableNote = useSelector((state) => state.notes.editableNote);
  const isEditable = editableNote ? true : false;
  const todoTask = todos && todos.filter((todo) => !todo.isDone);
  const doneTask = todos && todos.filter((todo) => todo.isDone);

  const handleAdd = useCallback(
    (newTodo) => {
      todos === undefined ? setTodos([newTodo]) : setTodos([...todos, newTodo]);
    },
    [todos],
  );

  const handleDelete = useCallback(
    (noteID, todoID, todos) => {
      let newTodos = todos.filter((t) => t.id !== todoID);
      setTodos(newTodos);
      const value = convertTodoToNote(newTodos);

      if (isInputField) {
        setNote((prev) => ({ ...prev, content: value }));
      } else if (noteID) {
        editNote(noteID, 'content', value);
      }
    },
    [isInputField, setNote],
  );

  const handleBlur = useCallback(
    (noteID, todos) => {
      const value = convertTodoToNote(todos);

      if (isInputField) {
        setNote((prev) => ({ ...prev, content: value }));
      } else if (noteID) {
        editNote(noteID, 'content', value);
      }
    },
    [isInputField, setNote],
  );

  const handleChange = useCallback(
    (e, id) => {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, todoItem: e.target.value } : todo,
      );
      setTodos(newTodos);
    },
    [todos],
  );

  const handleCheckbox = useCallback(
    (id) => {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
      );
      setTodos(newTodos);
    },
    [todos],
  );

  const handleMove = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = todos[dragIndex];

      setTodos(
        update(todos, {
          $splice: [
            [dragIndex, 1], // Delete
            [hoverIndex, 0, dragCard], // Add
          ],
        }),
      );
    },
    [todos],
  );

  const todoItemProps = {
    todos,
    onCheck: handleCheckbox,
    onChange: handleChange,
    onBlur: handleBlur,
    onDelete: handleDelete,
  };

  if (isInputField) {
    if (todos.length === 0) {
      const todoList = todos.map((todo, i, todoArr) => (
        <Draggable handleMove={handleMove} index={i} id={todo.id} key={todo.id}>
          <TodoItem
            isEditable
            todo={todo}
            inputFocus={i === todoArr.length - 1}
            readOnly={isEditable}
            {...todoItemProps}
          />
        </Draggable>
      ));
      return (
        <>
          {todoList}
          <TodoInput onAdd={handleAdd} />
        </>
      );
    }

    if (todos.length > 0) {
      const todoList = todos.map((todo, i, todoArr) => (
        <Draggable handleMove={handleMove} index={i} id={todo.id} key={todo.id}>
          <TodoItem
            todo={todo}
            inputFocus={i === todoArr.length - 1}
            readOnly={isEditable}
            isEditable
            {...todoItemProps}
          />
        </Draggable>
      ));

      return (
        <>
          {todoList}
          <TodoInput onAdd={handleAdd} />
        </>
      );
    }
  }

  if (isEditable) {
    if (!todos) {
      setTodos([]);
      return <TodoInput onAdd={handleAdd} />;
    }

    if (todos) {
      let todoList = todoTask.map((todo, i, todoArr) => (
        <Draggable handleMove={handleMove} index={i} id={todo.id} key={todo.id}>
          <TodoItem
            todo={todo}
            inputFocus={i === todoArr.length - 1}
            readOnly={!isEditable}
            noteID={id}
            isEditable
            {...todoItemProps}
          />
        </Draggable>
      ));

      let doneList = doneTask.map((todo, i) => (
        <TodoItem todo={todo} noteID={id} isEditable {...todoItemProps} />
      ));

      return (
        <Container>
          {todoList}
          {editableNote && id === editableNote.id && (
            <TodoInput onAdd={handleAdd} />
          )}
          {doneTask.length > 0 && (
            <CompletedTodo
              doneTaskCount={doneTask.length}
              clicked={() => setShowDoneList(!showDoneList)}
            />
          )}
          {showDoneList && doneList}
        </Container>
      );
    }
  }

  if (!isEditable && !isInputField && todos) {
    const todoList = todoTask.map((todo, i) => (
      <TodoItem
        key={i}
        todo={todo}
        onCheck={handleCheckbox}
        readOnly={!isEditable}
      />
    ));

    return (
      <>
        <Wrapper>{todoList}</Wrapper>
        {doneTask.length > 0 && (
          <CompletedTodo doneTaskCount={doneTask.length} isNote />
        )}
      </>
    );
  }

  return null;
}

TodoList.PropTypes = {
  id: PropTypes.string.isRequired,
  isInputField: PropTypes.bool,
  todoContent: PropTypes.array,
  setNote: PropTypes.func,
};

TodoList.defaultProps = {
  todoContent: [],
};

export default React.memo(TodoList);

// import React, { useState, useCallback } from 'react';
// import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import CompletedTodo from 'components/TodoList/CompletedTodo/CompletedTodo';
// import TodoItem from 'components/TodoList/TodoItem/TodoItem';
// import TodoInput from 'components/TodoList/TodoInput/TodoInput';
// import { convertTodoToNote } from 'shared/utility';
// import { editNote } from 'shared/firebase';

// const TodoItemContainer = styled.div`
//   max-height: 223px;
//   overflow: hidden;
// `;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100%;
//   overflow: auto;
// `;

// function TodoList({ todoContent = [], id, setNote, isInputField }) {
//   const [todos, setTodos] = useState(todoContent);
//   const [showDoneList, setShowDoneList] = useState(true);

//   const editableNote = useSelector((state) => state.notes.editableNote);
//   const isEditable = editableNote ? true : false;
//   const todoTask = todos && todos.filter((todo) => !todo.isDone);
//   const doneTask = todos && todos.filter((todo) => todo.isDone);

//   const handleAdd = useCallback(
//     (newTodo) => {
//       todos === undefined ? setTodos([newTodo]) : setTodos([...todos, newTodo]);
//     },
//     [todos],
//   );

//   const handleDelete = useCallback(
//     (noteID, todoID, todos) => {
//       let newTodos = todos.filter((t) => t.id !== todoID);
//       setTodos(newTodos);
//       const value = convertTodoToNote(newTodos);

//       if (isInputField) {
//         setNote((prev) => ({ ...prev, content: value }));
//       } else if (noteID) {
//         editNote(noteID, 'content', value);
//       }
//     },
//     [isInputField, setNote],
//   );

//   const handleBlur = useCallback(
//     (noteID, todos) => {
//       const value = convertTodoToNote(todos);

//       if (isInputField) {
//         setNote((prev) => ({ ...prev, content: value }));
//       } else if (noteID) {
//         editNote(noteID, 'content', value);
//       }
//     },
//     [isInputField, setNote],
//   );

//   const handleChange = useCallback(
//     (e, id) => {
//       const newTodos = todos.map((todo) =>
//         todo.id === id ? { ...todo, todoItem: e.target.value } : todo,
//       );
//       setTodos(newTodos);
//     },
//     [todos],
//   );

//   const handleCheckbox = useCallback(
//     (id) => {
//       const newTodos = todos.map((todo) =>
//         todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
//       );
//       setTodos(newTodos);
//     },
//     [todos],
//   );

//   const todoItemProps = {
//     todos,
//     onCheck: handleCheckbox,
//     onChange: handleChange,
//     onBlur: handleBlur,
//     onDelete: handleDelete,
//   };

//   if (isInputField) {
//     if (todos.length === 0) {
//       const todoList = todos.map((todo, i, todoArr) => (
//         <TodoItem
//           key={i}
//           todo={todo}
//           inputFocus={i === todoArr.length - 1}
//           readOnly={isEditable}
//           isEditable
//           {...todoItemProps}
//         />
//       ));
//       return (
//         <>
//           {todoList}
//           <TodoInput onAdd={handleAdd} />
//         </>
//       );
//     }

//     if (todos.length > 0) {
//       const todoList = todos.map((todo, i, todoArr) => (
//         <TodoItem
//           key={i}
//           todo={todo}
//           inputFocus={i === todoArr.length - 1}
//           readOnly={isEditable}
//           isEditable
//           {...todoItemProps}
//         />
//       ));

//       return (
//         <>
//           {todoList}
//           <TodoInput onAdd={handleAdd} />
//         </>
//       );
//     }
//   }

//   if (isEditable) {
//     if (!todos) {
//       setTodos([]);
//       return <TodoInput onAdd={handleAdd} />;
//     }

//     if (todos) {
//       let todoList = todoTask.map((todo, i, todoArr) => (
//         <TodoItem
//           key={i}
//           todo={todo}
//           inputFocus={i === todoArr.length - 1}
//           readOnly={!isEditable}
//           noteID={id}
//           isEditable
//           {...todoItemProps}
//         />
//       ));

//       let doneList = doneTask.map((todo, i) => (
//         <TodoItem
//           key={i}
//           todo={todo}
//           noteID={id}
//           isEditable
//           {...todoItemProps}
//         />
//       ));

//       return (
//         <Container>
//           {todoList}
//           {editableNote && id === editableNote.id && (
//             <TodoInput onAdd={handleAdd} />
//           )}
//           {doneTask.length > 0 && (
//             <CompletedTodo
//               doneTaskCount={doneTask.length}
//               clicked={() => setShowDoneList(!showDoneList)}
//             />
//           )}
//           {showDoneList && doneList}
//         </Container>
//       );
//     }
//   }

//   if (!isEditable && !isInputField && todos) {
//     const todoList = todoTask.map((todo, i) => (
//       <TodoItem
//         key={i}
//         todo={todo}
//         onCheck={handleCheckbox}
//         readOnly={!isEditable}
//       />
//     ));

//     return (
//       <>
//         <TodoItemContainer>{todoList}</TodoItemContainer>
//         {doneTask.length > 0 && (
//           <CompletedTodo doneTaskCount={doneTask.length} isNote />
//         )}
//       </>
//     );
//   }

//   return null;
// }

// TodoList.PropTypes = {
//   id: PropTypes.string.isRequired,
//   isInputField: PropTypes.bool,
//   todoContent: PropTypes.array,
//   setNote: PropTypes.func,
// };

// TodoList.defaultProps = {
//   todoContent: [],
// };

// export default React.memo(TodoList);
