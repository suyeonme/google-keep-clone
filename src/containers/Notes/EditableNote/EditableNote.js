import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import TodoList from '../../../components/TodoList/TodoList';
import { NoteTitle, NoteContent } from '../Note/NoteElements';
import { saveEditableNote } from '../../../store/actions/notes';
import { convertNoteToTodo, convertTodoToNote } from '../../../shared/utility';

const EditNote = styled.div`
  cursor: text;
`;

function EditableNote({ note }) {
  const [editableNote, setEditableNote] = useState(note);
  const { title, content, isChecked } = editableNote;

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleBlur = (e) => {
    const name = e.target.id;
    const value = e.currentTarget.innerText;
    setEditableNote({ ...editableNote, [name]: value });
  };

  const handleBlurTodo = useCallback((value) => {
    const newValue = convertTodoToNote(value);
    setEditableNote((prevState) => ({ ...prevState, content: newValue }));
  }, []);

  useEffect(() => {
    setEditableNote(note);
  }, [note]);

  useEffect(() => {
    // FIXME
    // Typing - Chaning color - NOT working
    // Guess, saveEditableNote with useEffect
    dispatch(saveEditableNote(editableNote));
  }, [dispatch, editableNote]);

  useEffect(() => {
    if (todos.length > 0) handleBlurTodo(todos);
  }, [todos, handleBlurTodo]);

  if (isChecked) {
    return (
      <EditNote spellCheck="true">
        <NoteTitle
          id="title"
          size="big"
          onBlur={handleBlur}
          contentEditable
          suppressContentEditableWarning={true}
        >
          {title}
        </NoteTitle>
        <TodoList
          todoContent={() => convertNoteToTodo(content)}
          onBlurTodo={handleBlurTodo}
        />
      </EditNote>
    );
  }

  return (
    <EditNote spellCheck="true">
      <NoteTitle
        id="title"
        size="big"
        placeholder="Title"
        onBlur={handleBlur}
        contentEditable
        suppressContentEditableWarning={true}
      >
        {title}
      </NoteTitle>
      <NoteContent
        id="content"
        placeholder="Note"
        onBlur={handleBlur}
        contentEditable
        suppressContentEditableWarning={true}
      >
        {content}
      </NoteContent>
    </EditNote>
  );
}

export default EditableNote;
