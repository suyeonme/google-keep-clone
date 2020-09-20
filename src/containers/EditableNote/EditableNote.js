import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Input, InputTextArea } from '../InputField/InputElements';
import TodoList from '../../components/TodoList/TodoList';
import Tool from '../../containers/Toolbar/Tool/Tool';
import { getEditableNote } from '../../store/actions/notes';
import { convertNoteToTodo, convertTodoToNote } from '../../shared/utility';

// TODO
// saveEditableNote (color, content)
// Typing - change color - NOT works (old color, old content)

const EditNote = styled.div`
  cursor: text;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

function EditableNote({ note, isArchived }) {
  const [editableNote, setEditableNote] = useState(note);
  const { title, content, id, isChecked, isPinned } = editableNote;

  const dispatch = useDispatch();

  useEffect(() => {
    setEditableNote(note);
  }, [note]);

  useEffect(() => {
    dispatch(getEditableNote(editableNote));
  }, [dispatch, editableNote]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditableNote((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleBlurTodo = useCallback((todos) => {
    const newContent = convertTodoToNote(todos);
    setEditableNote((prevState) => ({ ...prevState, content: newContent }));
  }, []);

  return (
    <EditNote spellCheck="true">
      <Tool
        id={id}
        title="Pin Note"
        isPinned={isPinned}
        isArchived={isArchived}
        notePin
      />
      <Input
        name="title"
        placeholder="Title"
        autoComplete="off"
        isEditableNote
        defaultValue={title}
        onBlur={handleChange}
      />

      {isChecked ? (
        <TodoList
          id={id}
          todoContent={() => convertNoteToTodo(content)}
          onSaveEditableNote={handleBlurTodo}
        />
      ) : (
        <InputTextArea
          name="content"
          placeholder="Note"
          autoComplete="off"
          isEditableNote
          defaultValue={content}
          onBlur={handleChange}
        />
      )}
    </EditNote>
  );
}

EditableNote.propTypes = {
  note: PropTypes.object.isRequired,
  isArchived: PropTypes.bool,
};

export default React.memo(EditableNote);
