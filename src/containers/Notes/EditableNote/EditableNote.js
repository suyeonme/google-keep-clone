import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import {
  Input,
  InputTextArea,
} from '../../../containers/InputField/InputElements';
import TodoList from '../../../components/TodoList/TodoList';
import { saveEditableNote } from '../../../store/actions/notes';
import { convertNoteToTodo, convertTodoToNote } from '../../../shared/utility';

// TODO
// saveEditableNote (color, content)

// Only change color of note works
// Change color - typing works
// Typing - change color - NOT works (old color, old content)

const EditNote = styled.div`
  cursor: text;
`;

function EditableNote({ note }) {
  const [editableNote, setEditableNote] = useState(note);
  const { title, content, isChecked, id } = editableNote;

  const dispatch = useDispatch();
  const handleBlur = () => dispatch(saveEditableNote(editableNote));

  useEffect(() => {
    setEditableNote(note);
  }, [note]);

  useEffect(() => {
    dispatch(saveEditableNote(editableNote));
  }, [dispatch, editableNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableNote({ ...editableNote, [name]: value });
  };

  const handleBlurTodo = (todos) => {
    const newContent = convertTodoToNote(todos);
    setEditableNote((prevState) => ({ ...prevState, content: newContent }));
  };

  if (isChecked) {
    return (
      <EditNote spellCheck="true">
        <Input
          name="title"
          placeholder="Title"
          autoComplete="off"
          isEditableNote
          value={title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TodoList
          id={id}
          todoContent={() => convertNoteToTodo(content)}
          onSaveEditableNote={handleBlurTodo}
        />
      </EditNote>
    );
  }

  return (
    <EditNote spellCheck="true">
      <Input
        name="title"
        placeholder="Title"
        autoComplete="off"
        isEditableNote
        value={title}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <InputTextArea
        name="content"
        placeholder="Note"
        autoComplete="off"
        isEditableNote
        value={content}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </EditNote>
  );
}

export default EditableNote;
