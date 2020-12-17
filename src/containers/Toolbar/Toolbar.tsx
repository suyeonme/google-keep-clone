import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import LabelIcon from 'icons/label.svg';
import TranshCanIcon from 'icons/trash-can.svg';
import PaintIcon from 'icons/paintbrush.svg';
import CheckboxIcon from 'icons/checkbox.svg';
import ArchiveIcon from 'icons/archive.svg';
import Tool from 'containers/Toolbar/Tool/Tool';
import ColorPalette from 'components/ColorPalette/ColorPalette';
import { Dispatcher } from 'shared/types';
import { RootState } from 'store/reducers';
import { ToggleTool } from 'containers/InputField/InputField';

const ToolbarContainer = styled('div')<{ isHover: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  line-height: 0;
  opacity: ${(props) => (props.isHover ? 1 : 0)};
  transition: opacity 0.3s ease-out;

  @media (max-width: 1024px) {
    opacity: 1;
  }

  @media (max-width: 320px) {
    flex-direction: column;
  }
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

  @media (max-width: 320px) {
    margin-left: auto;
    padding: 0;
  }
`;

const ToolContaienr = styled.div`
  @media (max-width: 320px) {
    margin-left: auto;
  }
`;

interface ToolbarProp {
  id?: string | undefined;
  onHover: boolean;
  onAddNote?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onToggle?: (noteProperty: ToggleTool) => void;
  onClick?: (color: string) => void;
  isInputField?: boolean;
  setShowLabel: Dispatcher<boolean>;
  onDelete?: (id: string) => void;
  isChecked?: boolean;
  onClose?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface Icon {
  icon: string;
  title: string;
}

const Toolbar = ({
  id,
  onHover,
  onAddNote,
  onToggle,
  onClick,
  isInputField,
  setShowLabel,
  onDelete,
  isChecked,
  onClose,
}: ToolbarProp) => {
  const [isHoverColorPalette, setIsHoverColorPalette] = useState(false);
  const editableNote = useSelector(
    (state: RootState) => state.notes.editableNote,
  );
  const isArchived: boolean =
    window.location.pathname === '/archive' ? true : false;
  const isEditable: boolean = editableNote ? true : false;

  const icons: Icon[] = [
    {
      icon: PaintIcon,
      title: 'Change Color',
    },
    {
      icon: LabelIcon,
      title: 'Add Label',
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

  const handleShowColorPalette = useCallback((): void => {
    setIsHoverColorPalette(true);
  }, []);

  const handleHideColorPalette = useCallback((): void => {
    setIsHoverColorPalette(false);
  }, []);

  return (
    <ToolbarContainer isHover={onHover}>
      <ToolContaienr>
        {icons.map((icon) => (
          <Tool
            key={icon.title}
            id={id}
            title={icon.title}
            bgImage={icon.icon}
            showPalette={
              icon.title === 'Change Color' ? handleShowColorPalette : undefined
            }
            hidePalette={
              icon.title === 'Change Color' ? handleHideColorPalette : undefined
            }
            onToggle={onToggle}
            setShowLabel={setShowLabel}
            isInputField={isInputField}
            isChecked={isChecked}
          />
        ))}
        {!isInputField && (
          <Tool
            id={id}
            title="Delete Note"
            bgImage={TranshCanIcon}
            onDelete={onDelete}
          />
        )}
      </ToolContaienr>
      {isInputField && <CloseBtn onClick={onAddNote}>Close</CloseBtn>}
      {isEditable && <CloseBtn onClick={onClose}>Close</CloseBtn>}
      {isHoverColorPalette && (
        <ColorPalette
          id={id}
          isInputField={isInputField}
          onUnHover={handleHideColorPalette}
          onHover={handleShowColorPalette}
          onClick={onClick ? onClick : undefined}
        />
      )}
    </ToolbarContainer>
  );
};

export default React.memo(Toolbar);
