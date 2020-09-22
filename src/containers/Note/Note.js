import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEditableNote } from '../../store/actions/notes';
import PropTypes from 'prop-types';

import NoteBody from 'containers/Note/NoteBody';
import { NoteContainer, ToolbarContainer } from 'containers/Note/NoteElements';
import Toolbar from 'containers/Toolbar/Toolbar';
import EditableNote from 'containers/EditableNote/EditableNote';
import Label from 'containers/Label/Label';
import NoteLabel from 'containers/Label/LabelElements/NoteLabel/NoteLabel';
import { useClickOutside } from 'hooks/useClickOutside';

function Note({ note, isArchived }) {
  const { id, bgColor, labels } = note;
  const [isHovered, setIsHovered] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const editableNote = useSelector((state) => state.notes.editableNote);
  const editableNoteID = editableNote && editableNote.id;
  const isClicked = editableNoteID === id;

  const dispatch = useDispatch();
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

  const noteProps = {
    note: note,
    clicked: isClicked ? 1 : 0,
    isArchived: isArchived,
  };

  const { setIsClickOutside } = useClickOutside(false);

  return (
    <NoteContainer
      bgColor={bgColor}
      clicked={isClicked ? 1 : 0}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isClicked ? (
        <EditableNote {...noteProps} />
      ) : (
        <NoteBody isHovered={isHovered} {...noteProps} />
      )}

      <ToolbarContainer>
        {labels.length > 0 && (
          <NoteLabel labels={labels} id={id} isArchived={isArchived} />
        )}
        <Toolbar
          id={id}
          labels={labels}
          onHover={isHovered}
          setShowLabel={setShowLabel}
          isArchived={isArchived}
        />
        {showLabel && (
          <Label
            id={id}
            note={note}
            isArchived={isArchived}
            setShowLabel={setShowLabel}
            onExpand={setIsClickOutside}
          />
        )}
      </ToolbarContainer>
    </NoteContainer>
  );
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
  isArchived: PropTypes.bool,
};

export default React.memo(Note);
