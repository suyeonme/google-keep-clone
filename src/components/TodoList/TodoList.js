import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import CompletedTodo from './CompletedTodo/CompletedTodo';
import TodoItem from './TodoItem/TodoItem';
import TodoInput from './TodoInput/TodoInput';

// TODO
// Delete todo on InputField
// Todos -> Remove white space(trim)

// Issue: Lost check between note -- editable note (todos.isDone)
// Custom Checkbox
// Add border onFocus
// Add functions (drag, truncate)

function TodoList({
  todoContent = [],
  id,
  isInputField,
  onAddTodo,
  onBlurTodo,
}) {
  const [todos, setTodos] = useState(todoContent);
  const [showDoneList, setShowDoneList] = useState(true);

  const isSelected = useSelector((state) => state.isSelected);
  const selectedNote = useSelector((state) => state.selectedNote);

  const handleAddTodo = (newTodo) => {
    todos === undefined ? setTodos([newTodo]) : setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = (id) => {
    let newTodos = todos.filter((el) => el.id !== id);
    setTodos(newTodos);
    onBlurTodo(newTodos);
  };

  const saveEditedTodo = (e, id) => {
    const newContent = e.currentTarget.value;
    const editedTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, todoItem: newContent } : todo,
    );
    setTodos(editedTodo);
    onBlurTodo(editedTodo);
  };

  const handleChangeTodo = (e, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, todoItem: e.target.value } : todo,
    );
    setTodos(newTodos);
  };

  const handleCheckbox = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
    );
    setTodos(newTodos);
  };

  if (isInputField && todos.length === 0) {
    const todoList = todos.map((todo, i, todoArr) => (
      <TodoItem
        key={i}
        isEditable
        todo={todo}
        inputFocus={i === todoArr.length - 1}
        onCheck={handleCheckbox}
        onChange={handleChangeTodo}
        onBlur={() => onAddTodo(todos)}
        readOnly={isSelected}
      />
    ));
    return (
      <>
        {todoList}
        <TodoInput setTodos={handleAddTodo} />
      </>
    );
  }

  if (isInputField && todos.length > 0) {
    const todoList = todos.map((todo, i, todoArr) => (
      <TodoItem
        key={i}
        isEditable
        todo={todo}
        inputFocus={i === todoArr.length - 1}
        onCheck={handleCheckbox}
        onChange={handleChangeTodo}
        onBlur={() => onAddTodo(todos)}
        readOnly={isSelected}
      />
    ));

    return (
      <>
        {todoList}
        <TodoInput setTodos={handleAddTodo} />
      </>
    );
  }

  if (isSelected && !todos) {
    setTodos([]);
    return <TodoInput setTodos={handleAddTodo} />;
  }

  if (isSelected && todos) {
    const todoTask = todos.filter((todo) => !todo.isDone);
    const doneTask = todos.filter((todo) => todo.isDone);

    let todoList = todoTask.map((todo, i, todoArr) => (
      <TodoItem
        key={i}
        isEditable
        todo={todo}
        inputFocus={i === todoArr.length - 1}
        onCheck={handleCheckbox}
        onDelete={handleDeleteTodo}
        onChange={saveEditedTodo}
        readOnly={!isSelected}
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
        {selectedNote && id === selectedNote && (
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

  if (!isSelected && !isInputField && todos) {
    return todos.map((todo, i) => (
      <TodoItem
        key={i}
        todo={todo}
        onCheck={handleCheckbox}
        readOnly={!isSelected}
      />
    ));
  }

  return null;
}

export default TodoList;
