import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import CompletedTodo from './CompletedTodo/CompletedTodo';
import TodoItem from './TodoItem/TodoItem';
import TodoInput from './TodoInput/TodoInput';

// TODO
// Issue: Lost check between note -- editable note (todos.isDone)

// Custom Checkbox
// Add border onFocus
// Add functions (drag, truncate)
// Trim white space

function TodoList({
  todoContent = [],
  id,
  isInputField,
  onSaveEditableNote,
  onSaveNote,
}) {
  const [todos, setTodos] = useState(todoContent);
  const [showDoneList, setShowDoneList] = useState(true);
  console.log(todos);

  const editableNote = useSelector((state) => state.notes.editableNote);
  const isEditable = editableNote ? true : false;
  const todoTask = todos && todos.filter((todo) => !todo.isDone);
  const doneTask = todos && todos.filter((todo) => todo.isDone);

  const handleAddTodo = useCallback(
    (newTodo) => {
      todos === undefined ? setTodos([newTodo]) : setTodos([...todos, newTodo]);
    },
    [todos],
  );

  const handleDeleteTodo = useCallback(
    (id) => {
      let newTodos = todos.filter((el) => el.id !== id);
      setTodos(newTodos);
      onSaveEditableNote ? onSaveEditableNote(newTodos) : onSaveNote(newTodos);
    },
    [onSaveEditableNote, onSaveNote, todos],
  );

  const saveEditedTodo = useCallback(
    (e, id) => {
      const newContent = e.currentTarget.value;
      const editedTodo = todos.map((todo) =>
        todo.id === id ? { ...todo, todoItem: newContent } : todo,
      );
      setTodos(editedTodo);
      onSaveEditableNote(editedTodo);
    },
    [onSaveEditableNote, todos],
  );

  const handleChangeTodo = useCallback(
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

  if (isInputField) {
    if (todos.length === 0) {
      const todoList = todos.map((todo, i, todoArr) => (
        <TodoItem
          key={i}
          isEditable
          todo={todo}
          inputFocus={i === todoArr.length - 1}
          onCheck={handleCheckbox}
          onChange={handleChangeTodo}
          onBlur={() => onSaveNote(todos)}
          readOnly={isEditable}
        />
      ));
      return (
        <>
          {todoList}
          <TodoInput setTodos={handleAddTodo} />
        </>
      );
    }

    if (todos.length > 0) {
      const todoList = todos.map((todo, i, todoArr) => (
        <TodoItem
          key={i}
          isEditable
          todo={todo}
          inputFocus={i === todoArr.length - 1}
          onCheck={handleCheckbox}
          onChange={handleChangeTodo}
          onBlur={() => onSaveNote(todos)}
          onDelete={handleDeleteTodo}
          readOnly={isEditable}
        />
      ));

      return (
        <>
          {todoList}
          <TodoInput setTodos={handleAddTodo} />
        </>
      );
    }
  }

  if (isEditable) {
    if (!todos) {
      setTodos([]);
      return <TodoInput setTodos={handleAddTodo} />;
    }

    if (todos) {
      let todoList = todoTask.map((todo, i, todoArr) => (
        <TodoItem
          key={i}
          isEditable
          todo={todo}
          inputFocus={i === todoArr.length - 1}
          onCheck={handleCheckbox}
          onDelete={handleDeleteTodo}
          onChange={saveEditedTodo}
          readOnly={!isEditable}
        />
      ));

      let doneList = doneTask.map((todo, i) => (
        <TodoItem
          key={i}
          isEditable
          todo={todo}
          onCheck={handleCheckbox}
          onDelete={handleDeleteTodo}
          onChange={saveEditedTodo}
        />
      ));

      return (
        <div>
          {todoList}
          {editableNote && id === editableNote.id && (
            <TodoInput setTodos={handleAddTodo} />
          )}
          {doneTask.length > 0 && (
            <CompletedTodo
              doneTaskCount={doneTask.length}
              clicked={() => setShowDoneList(!showDoneList)}
            />
          )}
          {showDoneList && doneList}
        </div>
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
        {todoList}
        {doneTask.length > 0 && (
          <CompletedTodo doneTaskCount={doneTask.length} isNote />
        )}
      </>
    );
  }

  return null;
}

export default React.memo(TodoList);
