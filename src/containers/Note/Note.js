import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { dbService } from 'fbase';

import { NoteTitle, NoteContent } from 'containers/Note/NoteElements';
import NoteLayout from 'containers/Note/NoteLayout';
import { Input, InputTextArea } from 'containers/InputField/InputElements';
import TodoList from 'components/TodoList/TodoList';
import { getEditableNote, clearEditableNote } from '../../store/actions/notes';
import { convertNoteToTodo, convertTodoToNote } from 'shared/utility';

function Note({ note, isArchived }) {
  const { title, content, id, isChecked } = note;
  const [isHovering, setIsHovering] = useState(false);
  const [newNote, setNewNote] = useState(note);

  const dispatch = useDispatch();
  const editableNote = useSelector((state) => state.notes.editableNote);
  const editableNoteID = editableNote && editableNote.id;
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editableNote && editableNote.id === id) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [editableNote, id]);

  const handleClick = (e) => {
    if (
      e.target.nodeName !== 'BUTTON' &&
      e.target.id !== 'checkbox' &&
      e.target.id !== 'label' &&
      !editableNoteID
    ) {
      dispatch(getEditableNote(note));
    }
  };

  const handleDelete = async () => {
    await dbService.doc(`notes/${note.id}`).delete();
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewNote((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleBlurTodo = useCallback((todos) => {
    const newContent = convertTodoToNote(todos);
    setNewNote((prevState) => ({ ...prevState, content: newContent }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`notes/${id}`).update(newNote);
    dispatch(clearEditableNote());
  };

  const noteLayoutProps = {
    note,
    isHovering,
    clicked: isEditing ? 1 : 0,
    setIsHovering,
    setNewNote,
    onClick: handleClick,
    onSubmit: handleSubmit,
    onDelete: handleDelete,
  };

  if (isEditing) {
    return (
      <NoteLayout {...noteLayoutProps}>
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
      </NoteLayout>
    );
  }

  if (!isEditing) {
    return (
      <NoteLayout {...noteLayoutProps}>
        <NoteTitle>{title}</NoteTitle>
        {isChecked ? (
          <TodoList todoContent={() => convertNoteToTodo(content)} />
        ) : (
          <NoteContent>{content}</NoteContent>
        )}
      </NoteLayout>
    );
  }
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
  // isArchived: PropTypes.bool,
};

export default React.memo(Note);
