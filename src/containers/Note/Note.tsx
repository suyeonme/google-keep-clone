import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NoteTitle, NoteContent } from 'containers/Note/NoteElements';
import NoteLayout from 'containers/Note/NoteLayout';
import { Input, TextArea } from 'containers/InputField/InputElements';
import TodoList from 'components/TodoList/TodoList';
import { getEditableNote, clearEditableNote } from '../../store/actions/notes';
import { convertNoteToTodo, highlightText } from 'shared/utility';
import { editNote, removeNoteFromStore } from 'shared/firebase';

import { Note as NoteObj } from 'shared/types';
import { RootState } from 'store/reducers';
import { Todo } from 'shared/types';

interface NoteProp {
  note: NoteObj;
}

type BlurEventType =
  | React.FocusEvent<HTMLInputElement>
  | React.FocusEvent<HTMLTextAreaElement>;

const Note = ({ note }: NoteProp) => {
  const { title, content, id, isChecked } = note;
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.view.searchQuery);
  const editableNote = useSelector(
    (state: RootState) => state.notes.editableNote,
  );
  const editableNoteID: string = editableNote && editableNote.id;
  const todos: Todo[] | undefined = convertNoteToTodo(content);

  useEffect(() => {
    if (editableNote && editableNote.id === id) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [editableNote, id]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      const event = e.target as HTMLElement;

      if (
        event.tagName !== 'BUTTON' &&
        event.getAttribute('type') !== 'checkbox' &&
        event.id !== 'label' &&
        !editableNoteID
      ) {
        dispatch(getEditableNote(note));
      }
    },
    [dispatch, editableNoteID, note],
  );

  const handleDelete = useCallback(
    async (id: string): Promise<void> => {
      dispatch(clearEditableNote());
      removeNoteFromStore(id);
    },
    [dispatch],
  );

  const handleBlur = useCallback(
    async (e: BlurEventType, id: string | undefined): Promise<void> => {
      const { name, value } = e.target;
      if (id) editNote(id, name, value);
    },
    [],
  );

  const handleClose = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
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
          <TodoList id={id} todoContent={todos} />
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
          <TodoList todoContent={todos} />
        ) : (
          <NoteContent>{highlightText(content, searchQuery)}</NoteContent>
        )}
      </NoteLayout>
    );
  }
  return null;
};

export default React.memo(Note);
