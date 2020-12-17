import React, { useState } from 'react';

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
import { Note, Dispatcher } from 'shared/types';

interface NoteLayoutProp {
  note: Note;
  clicked: number;
  isHovering: boolean;
  onDelete: (id: string) => void;
  setIsHovering: Dispatcher<boolean>;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
}

const NoteLayout = ({
  note,
  clicked,
  onClick,
  onDelete,
  setIsHovering,
  isHovering,
  onClose,
  children,
}: NoteLayoutProp) => {
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
      <Container>
        <Tool notePin id={id} isPinned={isPinned} title="Pin Note" />
        {children}
        <ToolbarContainer>
          {labels.length > 0 && <NoteLabel id={id} labels={labels} />}
          <Toolbar
            id={id}
            onHover={isHovering}
            setShowLabel={setShowLabel}
            onDelete={onDelete}
            isChecked={isChecked}
            onClose={onClose}
          />
          {showLabel && (
            <Label
              note={note}
              setShowLabel={setShowLabel}
              onExpand={setIsClickOutside}
              isEditableNote={clicked}
            />
          )}
        </ToolbarContainer>
      </Container>
    </NoteContainer>
  );
};

export default NoteLayout;
