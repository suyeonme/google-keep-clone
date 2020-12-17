import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import update from 'immutability-helper';

import CompletedTodo from 'components/TodoList/CompletedTodo/CompletedTodo';
import TodoItem from 'components/TodoList/TodoItem/TodoItem';
import TodoInput from 'components/TodoList/TodoInput/TodoInput';
import Draggable from 'components/Draggable/Draggable';
import { convertTodoToNote } from 'shared/utility';
import { editNote } from 'shared/firebase';

import { Dispatcher, TodoItemID, Todo } from 'shared/types';
import { RootState } from 'store/reducers/index';
import { Note } from 'shared/types';

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

interface TodoListProp {
  todoContent: Todo[];
  id?: string;
  isInputField?: boolean;
  setNote?: Dispatcher<any>;
}

const TodoList = ({ todoContent, id, setNote, isInputField }: TodoListProp) => {
  const [todos, setTodos] = useState<Todo[]>(todoContent);
  const [showDoneList, setShowDoneList] = useState(true);

  const editableNote = useSelector(
    (state: RootState) => state.notes.editableNote,
  );
  const isEditable: boolean = editableNote ? true : false;
  const todoTask: Todo[] = todos && todos.filter((todo) => !todo.isDone);
  const doneTask: Todo[] = todos && todos.filter((todo) => todo.isDone);

  const handleAdd = useCallback(
    (newTodo: Todo): void => {
      if (typeof todos === 'undefined') {
        setTodos([newTodo]);
      } else {
        setTodos([...todos, newTodo]);
      }
    },
    [todos],
  );

  const handleDelete = useCallback(
    (todoID: TodoItemID, todos: Todo[], noteID?: string): void => {
      let newTodos: Todo[] = todos.filter((t: Todo) => t.id !== todoID);
      setTodos(newTodos);
      const value: string | undefined = convertTodoToNote(newTodos);

      if (isInputField && setNote) {
        setNote((prev: Note) => ({ ...prev, content: value }));
      } else if (value && noteID) {
        editNote(noteID, 'content', value);
      }
    },
    [isInputField, setNote],
  );

  const handleBlur = useCallback(
    (noteID: string | undefined, todos: Todo[] | undefined): void => {
      const value: string | undefined = convertTodoToNote(todos);

      if (isInputField && setNote) {
        setNote((prev: Note) => ({ ...prev, content: value }));
      } else if (noteID && value) {
        editNote(noteID, 'content', value);
      }
    },
    [isInputField, setNote],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, id: TodoItemID): void => {
      const newTodos: Todo[] = todos.map((todo: Todo) =>
        todo.id === id ? { ...todo, todoItem: e.target.value } : todo,
      );
      setTodos(newTodos);
    },
    [todos],
  );

  const handleCheckbox = useCallback(
    (id: TodoItemID): void => {
      const newTodos: Todo[] = todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
      );
      setTodos(newTodos);
    },
    [todos],
  );

  const handleMove = useCallback(
    (dragIndex: number, hoverIndex: number): void => {
      const dragTodo: Todo = todos[dragIndex];

      setTodos(
        update(todos, {
          $splice: [
            [dragIndex, 1], // Delete
            [hoverIndex, 0, dragTodo], // Add
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
        // <Draggable handleMove={handleMove} index={i} id={todo.id} key={todo.id}>
        <TodoItem
          isEditable
          todo={todo}
          inputFocus={i === todoArr.length - 1}
          readOnly={isEditable}
          {...todoItemProps}
        />
        // </Draggable>
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

      let doneList = doneTask.map((todo) => (
        <TodoItem
          todo={todo}
          noteID={id}
          key={todo.id}
          {...todoItemProps}
          isEditable
          isDoneTodo
        />
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
};

TodoList.defaultProps = {
  todoContent: [],
};

export default React.memo(TodoList);
