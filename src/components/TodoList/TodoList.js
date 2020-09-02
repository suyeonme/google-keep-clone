import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CompletedTodo from './CompletedTodo/CompletedTodo';
import { getTodos } from '../../store/actions/notes';
import TodoItem from './TodoItem/TodoItem';
import TodoInput from './TodoInput/TodoInput';

// TODO
// if statement
// - isEditable && not existing todos ? addTodo
// - isEditable && existing todos ? saveEditedTodo
// Delete button
// TodoInput visibility

// Issue: Lost check between note -- editable note (todos.isDone)
// Issue: Update todoItem on EditableNote

// Custom Checkbox
// Add border onFocus
// Add functions (drag, truncate)

function TodoList({ todoContent = [], addTodo, isInputField }) {
  const [todos, setTodos] = useState(todoContent);
  const [showDoneList, setShowDoneList] = useState(true);

  const isEditable = useSelector((state) => state.isSelected);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos(todos));
  }, [dispatch, todos]);

  const saveEditedTodo = (e, id) => {
    const newContent = e.currentTarget.innerHTML;
    const editedTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, todoItem: newContent } : todo,
    );
    setTodos(editedTodo);
  };

  const handleDeleteTodo = (id) => {
    let newTodos = todos.filter((el) => el.id !== id);
    setTodos(newTodos);
  };

  const handleChangeTodo = (e, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, todoItem: e.target.value } : todo,
    );
    setTodos(newTodos);
  };

  const handleAddTodo = (newTodo) => {
    // if (todos === undefined) {
    //   setTodos([newTodo]);
    // } else {
    //   setTodos([...todos, newTodo]);
    // }
    setTodos([...todos, newTodo]);
  };

  const handleCheckbox = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
    );
    setTodos(newTodos);
  };

  if (isInputField && todos.length === 0) {
    const todoList = todos.map((todo, i, arr) => (
      <TodoItem
        key={i}
        isEditable
        todo={todo}
        onBlur={() => addTodo(todos)}
        onCheck={handleCheckbox}
        onChange={handleChangeTodo}
        inputFocus={i === arr.length - 1}
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
    const todoList = todos.map((todo, i, arr) => (
      <TodoItem
        key={i}
        isEditable
        todo={todo}
        onBlur={() => addTodo(todos)}
        onCheck={handleCheckbox}
        onChange={handleChangeTodo}
        inputFocus={i === arr.length - 1}
      />
    ));

    return (
      <>
        {todoList}
        <TodoInput setTodos={handleAddTodo} />
      </>
    );
  }

  if (isEditable && !todos) {
    return <TodoInput setTodos={handleAddTodo} />;
  }

  if (isEditable && todos) {
    const todoTask = todos && todos.filter((todo) => !todo.isDone);
    const doneTask = todos && todos.filter((todo) => todo.isDone);

    let todoList = todoTask.map((todo, i) => (
      <TodoItem
        key={i}
        isTodoItem
        isEditable
        size="medium"
        todo={todo}
        onCheck={handleCheckbox}
        onBlur={saveEditedTodo}
        onDelete={handleDeleteTodo}
        inputFocus={todos && i === todos.length - 1}
      />
    ));

    let doneList = doneTask.map((todo, i) => (
      <TodoItem
        key={i}
        isTodoItem
        isEditable
        size="medium"
        todo={todo}
        onCheck={handleCheckbox}
        onDelete={handleDeleteTodo}
      />
    ));

    return (
      <div>
        {todoList}
        <TodoInput setTodos={setTodos} />
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

  if (!isEditable && !isInputField && todos) {
    return todos.map((todo, i) => (
      <TodoItem
        key={i}
        isTodoItem
        size="small"
        todo={todo}
        onCheck={handleCheckbox}
      />
    ));
  }

  return null;
}

export default TodoList;
