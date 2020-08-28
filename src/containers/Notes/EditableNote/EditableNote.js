import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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

  useEffect(() => {
    setEditableNote(note);
  }, [note]);

  // FIXME
  // Typing - Chaning color - NOT working
  // Guess, saveEditableNote with useEffect
  useEffect(() => {
    dispatch(saveEditableNote(editableNote));
  }, [dispatch, editableNote]);

  const handleOnBlur = (e) => {
    const name = e.target.id;
    const value = e.currentTarget.innerText;
    setEditableNote({ ...editableNote, [name]: value });
  };

  const handleOnBlurTodo = (value) => {
    const newValue = convertTodoToNote(value);
    setEditableNote({ ...editableNote, content: newValue });
  };

  if (isChecked) {
    return (
      <EditNote spellCheck="true">
        <NoteTitle
          id="title"
          size="big"
          onBlur={handleOnBlur}
          contentEditable
          suppressContentEditableWarning={true}
        >
          {title}
        </NoteTitle>
        <TodoList
          todoContent={() => convertNoteToTodo(content)}
          onBlur={handleOnBlurTodo}
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
        onBlur={handleOnBlur}
        contentEditable
        suppressContentEditableWarning={true}
      >
        {title}
      </NoteTitle>
      <NoteContent
        id="content"
        placeholder="Note"
        onBlur={handleOnBlur}
        contentEditable
        suppressContentEditableWarning={true}
      >
        {content}
      </NoteContent>
    </EditNote>
  );
}

export default EditableNote;
