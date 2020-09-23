import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Toolbar from 'containers/Toolbar/Toolbar';
import Tool from 'containers/Toolbar/Tool/Tool';
import Label from 'containers/Label/Label';
import {
  NoteContainer,
  ToolbarContainer,
  Form,
  Container,
} from 'containers/Note/NoteElements';
import NoteLabel from 'containers/Label/LabelElements/NoteLabel/NoteLabel';
import { useClickOutside } from 'hooks/useClickOutside';

function NoteLayout(props) {
  const {
    note,
    clicked,
    onClick,
    onSubmit,
    onDelete,
    setIsHovering,
    isHovering,
    setNewNote,
  } = props;

  const { id, isPinned, isChecked, isArchived, labels, bgColor } = note;
  const [showLabel, setShowLabel] = useState(false);

  const { setIsClickOutside } = useClickOutside(false);

  return (
    <NoteContainer
      bgColor={bgColor}
      clicked={clicked}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Form onSubmit={onSubmit}>
        <Container clicked={clicked}>
          <Tool
            notePin
            id={id}
            isPinned={isPinned}
            isArchived={isArchived}
            title="Pin Note"
          />
          {props.children}
          <ToolbarContainer>
            {labels.length > 0 && (
              <NoteLabel
                id={id}
                isArchived={isArchived}
                labels={labels}
                setNewNote={setNewNote}
              />
            )}
            <Toolbar
              id={id}
              labels={labels}
              isArchived={isArchived}
              onHover={isHovering}
              setShowLabel={setShowLabel}
              onDelete={onDelete}
              isChecked={isChecked}
            />
            {showLabel && (
              <Label
                id={id}
                note={note}
                isArchived={isArchived}
                setShowLabel={setShowLabel}
                onExpand={setIsClickOutside}
                setNewNote={setNewNote}
              />
            )}
          </ToolbarContainer>
        </Container>
      </Form>
    </NoteContainer>
  );
}

NoteLayout.propTypes = {
  note: PropTypes.object,
  clicked: PropTypes.number,
  onClick: PropTypes.func,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  setIsHovering: PropTypes.func,
  isHovering: PropTypes.bool,
  setNewNote: PropTypes.func,
};

export default NoteLayout;
