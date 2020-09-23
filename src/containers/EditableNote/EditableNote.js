import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Input, InputTextArea } from 'containers/InputField/InputElements';
import Tool from 'containers/Toolbar/Tool/Tool';
import Toolbar from 'containers/Toolbar/Tooo';
import TodoList from 'components/TodoList/TodoList';
import { convertNoteToTodo, convertTodoToNote } from 'shared/utility';

const EditNote = styled.div`
  cursor: text;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

function EditableNote({ note, isArchived }) {
  const [newNote, setNewNote] = useState(note);
  const { title, content, id, isChecked, isPinned } = newNote;

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewNote((prevState) => ({ ...prevState, [name]: value })); // ISSUE
  }, []);

  const handleBlurTodo = useCallback((todos) => {
    const newContent = convertTodoToNote(todos);
    setNewNote((prevState) => ({ ...prevState, content: newContent })); // ISSUE
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

      <Toolbar
        id={id}
        labels={labels}
        onHover={isHovered}
        setShowLabel={setShowLabel}
        isArchived={isArchived}
        onDelete={handleDelete}
      />
    </EditNote>
  );
}

EditableNote.propTypes = {
  note: PropTypes.object.isRequired,
  isArchived: PropTypes.bool,
};

export default React.memo(EditableNote);
