import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Input, InputTextArea } from '../InputField/InputElements';
import TodoList from '../../components/TodoList/TodoList';
import { getEditableNote } from '../../store/actions/notes';
import { convertNoteToTodo, convertTodoToNote } from '../../shared/utility';

import Tool from '../../components/Toolbar/Tool';
import PinIcon from '../../icons/pin.svg';

// TODO
// saveEditableNote (color, content)
// Typing - change color - NOT works (old color, old content)

const EditNote = styled.div`
  cursor: text;
`;

function EditableNote({ note }) {
  const [editableNote, setEditableNote] = useState(note);
  const { title, content, isChecked, id } = editableNote;

  const dispatch = useDispatch();

  useEffect(() => {
    setEditableNote(note);
  }, [note]);

  useEffect(() => {
    dispatch(getEditableNote(editableNote));
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
        <Tool title="Pin Note" bgImage={PinIcon} notePin />
        <Input
          name="title"
          placeholder="Title"
          autoComplete="off"
          isEditableNote
          defaultValue={title}
          onBlur={handleChange}
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
      <Tool title="Pin Note" bgImage={PinIcon} notePin />
      <Input
        name="title"
        placeholder="Title"
        autoComplete="off"
        isEditableNote
        defaultValue={title}
        onBlur={handleChange}
      />
      <InputTextArea
        name="content"
        placeholder="Note"
        autoComplete="off"
        isEditableNote
        defaultValue={content}
        onBlur={handleChange}
      />
    </EditNote>
  );
}

export default EditableNote;
