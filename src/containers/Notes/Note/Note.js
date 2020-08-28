import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNote } from '../../../store/actions/notes';

import NoteBody from './NoteBody';
import { NoteContainer } from './NoteElements';
import Toolbar from '../../../components/Toolbar/Toolbar';
import EditableNote from '../EditableNote/EditableNote';

function Note({ note }) {
  const { id, bgColor } = note;
  const selectedNote = useSelector((state) => state.selectedNote);
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();
  const handleOnClick = (e) => {
    if (
      e.target.nodeName !== 'BUTTON' &&
      e.target.nodeName !== 'INPUT' &&
      !selectedNote
    ) {
      dispatch(selectNote(id));
    }
  };

  const isClicked = selectedNote === id;

  return (
    <NoteContainer
      onClick={handleOnClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      bgColor={bgColor}
      clicked={isClicked ? 1 : 0}
    >
      {isClicked ? (
        <EditableNote note={note} clicked={isClicked ? 1 : 0} />
      ) : (
        <NoteBody note={note} clicked={isClicked ? 1 : 0} />
      )}
      <Toolbar id={id} onHover={isHovered} />
    </NoteContainer>
  );
}

export default Note;
