import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { NoteTitle, NoteContent } from 'containers/Note/NoteElements';
import NoteLayout from 'containers/Note/NoteLayout';
import { Input, TextArea } from 'containers/InputField/InputElements';
import TodoList from 'components/TodoList/TodoList';
import { getEditableNote, clearEditableNote } from '../../store/actions/notes';
import { convertNoteToTodo, highlightText } from 'shared/utility';
import { editNote, removeNoteFromStore } from 'shared/firebase';

function Note({ note }) {
  const { title, content, id, isChecked } = note;
  const [isHovering, setIsHovering] = useState(false);

  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.view.searchQuery);
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

  const handleClick = useCallback(
    (e) => {
      if (
        e.target.nodeName !== 'BUTTON' &&
        e.target.id !== 'checkbox' &&
        e.target.id !== 'label' &&
        !editableNoteID
      ) {
        dispatch(getEditableNote(note));
      }
    },
    [dispatch, editableNoteID, note],
  );

  const handleDelete = useCallback(
    async (id, type) => {
      dispatch(clearEditableNote());
      removeNoteFromStore(id, type);
    },
    [dispatch],
  );

  const handleBlur = useCallback(async (e, id) => {
    const { name, value } = e.target;
    editNote(id, name, value);
  }, []);

  const handleClose = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(clearEditableNote());
    },
    [dispatch],
  );

  const noteLayoutProps = {
    note,
    isHovering,
    clicked: isEditing ? 1 : 0,
    setIsHovering,
    onClick: handleClick,
    onDelete: handleDelete,
    onClose: handleClose,
  };

  if (isEditing) {
    return (
      <NoteLayout {...noteLayoutProps}>
        <Input
          name="title"
          placeholder="Title"
          autoComplete="off"
          isEditable
          defaultValue={title}
          onBlur={(e) => handleBlur(e, id)}
        />
        {isChecked ? (
          <TodoList id={id} todoContent={() => convertNoteToTodo(content)} />
        ) : (
          <TextArea
            name="content"
            placeholder="Note"
            autoComplete="off"
            isEditable
            defaultValue={content}
            onBlur={(e) => handleBlur(e, id)}
          />
        )}
      </NoteLayout>
    );
  }

  if (!isEditing) {
    return (
      <NoteLayout {...noteLayoutProps}>
        <NoteTitle>{highlightText(title, searchQuery)}</NoteTitle>
        {isChecked ? (
          <TodoList todoContent={() => convertNoteToTodo(content)} />
        ) : (
          <NoteContent>{highlightText(content, searchQuery)}</NoteContent>
        )}
      </NoteLayout>
    );
  }
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
};

export default React.memo(Note);
