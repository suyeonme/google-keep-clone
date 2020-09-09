import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TranshCanIcon from '../../icons/trash-can.svg';
import PaintIcon from '../../icons/paintbrush.svg';
import PictureIcon from '../../icons/picture.svg';
import CheckboxIcon from '../../icons/checkbox.svg';
import ArchiveIcon from '../../icons/archive.svg';
import Tool from './Tool';
import ColorPalette from '../ColorPalette/ColorPalette';
import { updateNote } from '../../store/actions/notes';

const ToolbarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  margin-top: 20px;
  line-height: 0;
  opacity: ${(props) => (props.hovered ? 1 : 0)};
  transition: opacity 0.3s ease-out;
`;

const CloseBtn = styled.button`
  background: transparent;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 500;
  font-size: 1.5rem;
  padding: 8px 24px;
  border-radius: 4px;
  letter-spacing: 0.4px;

  &:hover {
    opacity: 0.87;
    background: rgba(95, 99, 104, 0.157);
  }
`;

function Toolbar({
  id,
  onHover,
  onAddNote,
  onToggle,
  onClick,
  isInputField,
  isArchived,
}) {
  const [isHoverColorPalette, setIsHoverColorPalette] = useState(false);
  const icons = [
    {
      icon: PaintIcon,
      title: 'Change Color',
    },
    {
      icon: PictureIcon,
      title: 'Add Picture',
    },
    {
      icon: CheckboxIcon,
      title: 'Show Checkbox',
    },
    {
      icon: ArchiveIcon,
      title: isArchived ? 'Unarchive' : 'Archive',
    },
  ];

  const editableNote = useSelector((state) => state.notes.editableNote);
  const isEditable = editableNote ? true : false;

  const dispatch = useDispatch();
  const handleShowColorPalette = () => setIsHoverColorPalette(true);
  const handleHideColorPalette = () => setIsHoverColorPalette(false);
  const handleUpdateEditableNote = () => {
    isArchived
      ? dispatch(updateNote('archives'))
      : dispatch(updateNote('notes'));
  };

  return (
    <ToolbarContainer hovered={onHover}>
      <div>
        {icons.map((icon, i) => (
          <Tool
            id={id}
            key={i}
            title={icon.title}
            bgImage={icon.icon}
            showPalette={
              icon.title === 'Change Color' ? handleShowColorPalette : null
            }
            hidePalette={
              icon.title === 'Change Color' ? handleHideColorPalette : null
            }
            onToggle={onToggle}
            isInputField={isInputField}
            isArchived={isArchived}
          />
        ))}
        {!isInputField && (
          <Tool
            id={id}
            title="Delete Note"
            bgImage={TranshCanIcon}
            isArchived={isArchived}
          />
        )}
      </div>
      {isInputField && <CloseBtn onClick={onAddNote}> Close </CloseBtn>}
      {isEditable && (
        <CloseBtn onClick={handleUpdateEditableNote}> Close </CloseBtn>
      )}
      {isHoverColorPalette && (
        <ColorPalette
          id={id}
          isInputField={isInputField}
          isArchived={isArchived}
          onUnHover={handleHideColorPalette}
          onHover={handleShowColorPalette}
          onClick={onClick}
        />
      )}
    </ToolbarContainer>
  );
}

Toolbar.propTypes = {
  id: PropTypes.string.isRequired,
  onHover: PropTypes.func.isRequired,
  onAddNote: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  isInputField: PropTypes.bool,
  isArchived: PropTypes.bool,
};

export default React.memo(Toolbar);
