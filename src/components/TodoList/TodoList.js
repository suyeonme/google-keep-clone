import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CompletedTodo from './CompletedTodo/CompletedTodo';
import { getTodos } from '../../store/actions/notes';
import TodoItem from './TodoItem/TodoItem';

// TODO
// Lost check between note -- editable note (todos.isDone)
// InputField

// PlusIcon -> Checkbox and auto-creating an additional todo
// Custom Checkbox
// Add border onFocus
// Add functions (drag, truncate)

function TodoList({ todoContent }) {
  const isEditable = useSelector((state) => state.isSelected);

  //const newTodo = { id: Math.random(), todoItem: '', isDone: false };
  //todoContent = todoContent || [newTodo];
  todoContent = todoContent || [];

  const [todos, setTodos] = useState(todoContent);
  const [showDoneList, setShowDoneList] = useState(true);

  const todoTask = todos && todos.filter((todo) => !todo.isDone);
  const doneTask = todos && todos.filter((todo) => todo.isDone);

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

  const handleCheckbox = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
    );
    setTodos(newTodos);
  };

  // if (todos && todos.length === 1) {
  //   return todos.map((todo, i) => (
  //     <TodoItem
  //       key={i}
  //       id={todo.id}
  //       isDone={todo.isDone}
  //       size="small"
  //       placeholder="Add Todo"
  //       onCheck={() => handleCheckbox(todo.id)}
  //       isEditable
  //     />
  //   ));
  // }

  if (isEditable && todos) {
    let todoList = todoTask.map((todo, i) => (
      <TodoItem
        isTodoItem
        isEditable
        size="medium"
        key={i}
        id={todo.id}
        isDone={todo.isDone}
        todoItem={todo.todoItem}
        onCheck={handleCheckbox}
        onBlur={saveEditedTodo}
        onDelete={handleDeleteTodo}
      />
    ));

    let doneList = doneTask.map((todo, i) => (
      <todoItem
        isTodoItem
        isEditable
        size="medium"
        key={i}
        id={todo.id}
        isDone={todo.isDone}
        onCheck={handleCheckbox}
        todoItem={todo.todoItem}
        onDelete={handleDeleteTodo}
      />
    ));

    return (
      <div>
        {todoList}
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

  if (!isEditable && todos) {
    return todos.map((todo, i) => (
      <TodoItem
        size="small"
        isDone={todo.isDone}
        key={i}
        id={todo.id}
        onCheck={handleCheckbox}
        todoItem={todo.todoItem}
      />
    ));
  }

  return null;
}

export default TodoList;
