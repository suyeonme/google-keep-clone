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

function TodoList({ todoContent, addTodo }) {
  todoContent = todoContent || [];

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

  const handleCheckbox = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
    );
    setTodos(newTodos);
  };

  if (todoContent.length === 1) {
    return todos.map((todo, i) => (
      <TodoItem
        key={i}
        todo={todo}
        size="small"
        placeholder="New List"
        isEditable
        isTodoItem
        onCheck={handleCheckbox}
        onBlur={addTodo}
      />
    ));
  }

  if (isEditable && todos) {
    const todoTask = todos && todos.filter((todo) => !todo.isDone);
    const doneTask = todos && todos.filter((todo) => todo.isDone);

    let todoList = todoTask.map((todo, i) => (
      <TodoItem
        key={i}
        size="medium"
        isTodoItem
        isEditable
        todo={todo}
        onCheck={handleCheckbox}
        onBlur={saveEditedTodo}
        onDelete={handleDeleteTodo}
      />
    ));

    let doneList = doneTask.map((todo, i) => (
      <TodoItem
        key={i}
        size="medium"
        isTodoItem
        isEditable
        todo={todo}
        onCheck={handleCheckbox}
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
        key={i}
        size="small"
        todo={todo}
        onCheck={handleCheckbox}
        isTodoItem
      />
    ));
  }

  return null;
}

export default TodoList;
