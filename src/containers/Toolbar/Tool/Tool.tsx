import React from 'react';
import { useDispatch } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';

import { showFlashMessage, hideFlashMessage } from 'store/actions/view';
import { ToolbarBtn, ToolSpan } from 'containers/Toolbar/Tool/ToolElements';
import {
  renameLabel,
  removeLabel,
  clearEditableNote,
} from 'store/actions/notes';
import {
  editLabelFromStore,
  addLabelToStore,
  removeLabelFromStore,
  toggleNotePin,
  toggleNoteTodo,
  changeNoteToArchives,
  changeArchivesToNotes,
} from 'shared/firebase';
import { ToggleTool, LabelObj } from 'shared/types';

interface ToolProp {
  id?: string;
  title: string;
  bgImage?: string;
  onToggle?: (noteProperty: ToggleTool) => void;
  showPalette?: (() => void) | undefined;
  hidePalette?: (() => void) | undefined;
  deleteTodo?: () => void | undefined;
  setShowLabel?: (val: boolean) => void;
  onRemove?: (label: string) => void;
  isInputField?: boolean;
  isPinned?: boolean;
  editLabel?: boolean;
  notePin?: boolean;
  inputPin?: boolean;
  isLabel?: boolean;
  isChecked?: boolean;
  label?: string | LabelObj;
  newLabel?: string;
  clearInput?: () => void;
  onDelete?: (id: string) => void;
  onRemoveNoteLabel?: (id: string, label: string) => void;
}

const Tool = ({
  id,
  title,
  bgImage,
  onToggle,
  showPalette,
  hidePalette,
  deleteTodo,
  setShowLabel,
  onRemove,
  isInputField,
  isPinned,
  editLabel,
  isLabel,
  clearInput,
  notePin,
  inputPin,
  onDelete,
  label,
  newLabel,
  onRemoveNoteLabel,
  isChecked,
}: ToolProp) => {
  const dispatch = useDispatch();

  const showMessage = (message: string): void => {
    dispatch(showFlashMessage(message));

    setTimeout(() => {
      dispatch(hideFlashMessage());
    }, 3000);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    title: string,
    id?: string,
  ) => {
    e.preventDefault();

    switch (title) {
      case 'Show Checkbox':
        if (isInputField && onToggle) {
          onToggle('isChecked');
        } else if (id) {
          toggleNoteTodo(id, !isChecked);
        }
        break;
      case 'Pin Note':
        if (isInputField && onToggle) {
          onToggle('isPinned');
        } else if (id) {
          toggleNotePin(id, !isPinned);
        }
        break;
      case 'Delete Note':
        if (id && onDelete) onDelete(id);
        break;
      case 'Delete Todo':
        deleteTodo && deleteTodo();
        break;
      case 'Archive':
        if (isInputField && onToggle) {
          showMessage('Note archived');
          onToggle('isArchived');
        } else if (id) {
          showMessage('Note archived');
          changeNoteToArchives(id);
          dispatch(clearEditableNote());
        }
        break;
      case 'Unarchive':
        if (id) {
          showMessage('Note uarchived');
          changeArchivesToNotes(id);
          dispatch(clearEditableNote());
        }
        break;
      case 'Add Label':
        setShowLabel && setShowLabel(true);
        break;
      case 'Create Label':
        if (newLabel && newLabel !== '') {
          addLabelToStore(newLabel);
          clearInput && clearInput();
        }
        break;
      case 'Remove Label':
        if (isInputField && onRemove && typeof label === 'string') {
          onRemove(label);
        } else if (onRemoveNoteLabel && typeof label === 'string' && id) {
          onRemoveNoteLabel(id, label);
        }
        break;
      case 'Rename Label':
        if (
          newLabel &&
          newLabel !== '' &&
          typeof label === 'object' &&
          'id' in label &&
          'name' in label
        ) {
          editLabelFromStore(label.id, newLabel);
          dispatch(renameLabel(label.name, newLabel));
        }
        break;
      case 'Delete Label':
        if (typeof label === 'object' && 'id' in label && 'name' in label) {
          removeLabelFromStore(label.id);
          dispatch(removeLabel(label));
        }
        break;
      case 'Cancel':
        clearInput && clearInput();
        break;
      case 'Change Color':
        if (showPalette) showPalette(); // Mobile
        break;
      default:
        return title;
    }
  };

  const styleProps = {
    bgImage,
    notePin,
    inputPin,
    isPinned,
    isLabel,
    editLabel,
  };

  return (
    <>
      <Tooltip title={<ToolSpan>{title}</ToolSpan>}>
        <ToolbarBtn
          onMouseEnter={showPalette}
          onMouseLeave={hidePalette}
          onClick={(e) => handleClick(e, title, id)}
          {...styleProps}
        />
      </Tooltip>
    </>
  );
};

export default React.memo(Tool);
