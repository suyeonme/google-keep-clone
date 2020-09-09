import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEditableNote } from '../../store/actions/notes';

import NoteBody from './NoteBody';
import { NoteContainer } from './NoteElements';
import Toolbar from '../../components/Toolbar/Toolbar';
import EditableNote from '../EditableNote/EditableNote';

function Note({ note, isArchived }) {
  const { id, bgColor } = note;
  const [isHovered, setIsHovered] = useState(false);

  const editableNote = useSelector((state) => state.notes.editableNote);
  const editableNoteID = editableNote && editableNote.id;
  const isClicked = editableNoteID === id;

  const dispatch = useDispatch();
  const handleClick = (e) => {
    if (
      e.target.nodeName !== 'BUTTON' &&
      e.target.id !== 'checkbox' &&
      !editableNoteID
    ) {
      dispatch(getEditableNote(note));
    }
  };

  return (
    <NoteContainer
      bgColor={bgColor}
      clicked={isClicked ? 1 : 0}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isClicked ? (
        <EditableNote
          note={note}
          clicked={isClicked ? 1 : 0}
          isArchived={isArchived}
        />
      ) : (
        <NoteBody
          note={note}
          clicked={isClicked ? 1 : 0}
          isHovered={isHovered}
          isArchived={isArchived}
        />
      )}
      <Toolbar id={id} onHover={isHovered} isArchived={isArchived} />
    </NoteContainer>
  );
}

export default React.memo(Note);
