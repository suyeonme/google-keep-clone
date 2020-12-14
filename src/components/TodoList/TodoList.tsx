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

import { RootState } from 'store/reducers/index';
import { Note } from 'components/Notes/Notes';

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

export type TodoItemID = string | number;
export type noteID = string | undefined;

export interface Todo {
  id: string | number;
  todoItem: string;
  isDone: boolean;
}

interface TodoListProp {
  todoContent: Todo[];
  id: noteID;
  setNote: (note: object) => void; // Note
  isInputField: boolean;
}

const TodoList = ({
  todoContent = [],
  id,
  setNote,
  isInputField,
}: TodoListProp) => {
  const [todos, setTodos] = useState(todoContent);
  const [showDoneList, setShowDoneList] = useState(true);

  const editableNote = useSelector(
    (state: RootState) => state.notes.editableNote,
  );
  const isEditable: boolean = editableNote ? true : false;
  const todoTask: Todo[] = todos && todos.filter((todo) => !todo.isDone);
  const doneTask: Todo[] = todos && todos.filter((todo) => todo.isDone);

  const handleAdd = useCallback(
    (newTodo: Todo): void => {
      todos === undefined ? setTodos([newTodo]) : setTodos([...todos, newTodo]);
    },
    [todos],
  );

  const handleDelete = useCallback(
    (noteID: noteID, todoID: TodoItemID, todos: Todo[]): void => {
      let newTodos: Todo[] = todos.filter((t: Todo) => t.id !== todoID);
      setTodos(newTodos);
      const value: string = convertTodoToNote(newTodos);

      if (isInputField) {
        setNote((prev: Note) => ({ ...prev, content: value }));
      } else if (noteID) {
        editNote(noteID, 'content', value);
      }
    },
    [isInputField, setNote],
  );

  const handleBlur = useCallback(
    (noteID: noteID, todos: Todo[] | undefined): void => {
      const value: string = convertTodoToNote(todos);

      if (isInputField && noteID === '') {
        setNote((prev: Note) => ({ ...prev, content: value }));
      } else if (noteID) {
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
      const dragCard: Todo = todos[dragIndex];

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

      let doneList = doneTask.map((todo) => (
        <TodoItem
          todo={todo}
          noteID={id}
          isEditable
          key={todo.id}
          {...todoItemProps}
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

export default React.memo(TodoList);
