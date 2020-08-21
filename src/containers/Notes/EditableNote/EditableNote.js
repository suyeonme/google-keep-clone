import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { NoteTitle, NoteContent } from '../Note/NoteElements';
import { saveEditableNote } from '../../../store/actions/notes';

const EditNote = styled.div`
  cursor: text;
`;

function EditableNote({ note }) {
  const [editableNote, setEditableNote] = useState(note);
  const { title, content } = editableNote;

  const dispatch = useDispatch();

  useEffect(() => {
    setEditableNote(note);
  }, [note]);

  // FIXME Click color -> saveEditable dispatch - payload is old
  useEffect(() => {
    dispatch(saveEditableNote(editableNote));
  }, [dispatch, editableNote]);

  const handleBlur = (e) => {
    const name = e.target.id;
    const value = e.currentTarget.textContent;
    setEditableNote({ ...editableNote, [name]: value });
  };

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
