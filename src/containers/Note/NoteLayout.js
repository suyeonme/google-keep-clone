import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Toolbar from 'containers/Toolbar/Toolbar';
import Tool from 'containers/Toolbar/Tool/Tool';
import Label from 'containers/Label/Label';
import {
  NoteContainer,
  ToolbarContainer,
  Container,
} from 'containers/Note/NoteElements';
import NoteLabel from 'containers/Label/LabelElements/NoteLabel/NoteLabel';
import { useClickOutside } from 'hooks/useClickOutside';

function NoteLayout(props) {
  const {
    note,
    clicked,
    onClick,
    onDelete,
    setIsHovering,
    isHovering,
    onClose,
    isArchived,
  } = props;

  const { id, isPinned, isChecked, labels, bgColor } = note;
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
      <Container clicked={clicked}>
        <Tool
          notePin
          id={id}
          isPinned={isPinned}
          title="Pin Note"
          isArchived={isArchived}
        />
        {props.children}
        <ToolbarContainer>
          {labels.length > 0 && (
            <NoteLabel id={id} isArchived={isArchived} labels={labels} />
          )}
          <Toolbar
            id={id}
            labels={labels}
            onHover={isHovering}
            setShowLabel={setShowLabel}
            onDelete={onDelete}
            isChecked={isChecked}
            onClose={onClose}
            note={note}
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
      </Container>
    </NoteContainer>
  );
}

NoteLayout.propTypes = {
  note: PropTypes.object,
  clicked: PropTypes.number,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  setIsHovering: PropTypes.func,
  isHovering: PropTypes.bool,
  onClose: PropTypes.func,
  isArchived: PropTypes.bool,
};

export default NoteLayout;
