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

interface StyleProps {
  bgImage?: string;
  notePin?: boolean;
  inputPin?: boolean;
  isPinned?: boolean;
  isLabel?: boolean;
  editLabel?: boolean;
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

  const handleshowCheckbox = (): void => {
    if (isInputField && onToggle) {
      onToggle('isChecked');
    } else if (id) {
      toggleNoteTodo(id, !isChecked);
    }
  };

  const handletoggleNotePin = (): void => {
    if (isInputField && onToggle) {
      onToggle('isPinned');
    } else if (id) {
      toggleNotePin(id, !isPinned);
    }
  };

  const handleDeleteNote = (): void => {
    if (id && onDelete) onDelete(id);
  };

  const handleArchive = (): void => {
    if (isInputField && onToggle) {
      showMessage('Note archived');
      onToggle('isArchived');
    } else if (id) {
      showMessage('Note archived');
      changeNoteToArchives(id);
      dispatch(clearEditableNote());
    }
  };

  const handleUnarchive = (): void => {
    if (id) {
      showMessage('Note uarchived');
      changeArchivesToNotes(id);
      dispatch(clearEditableNote());
    }
  };

  const handleAddLabel = (): void => {
    if (setShowLabel) setShowLabel(true);
  };

  const handleCreateLabel = (): void => {
    if (newLabel && newLabel !== '') {
      addLabelToStore(newLabel);
      if (clearInput) clearInput();
    }
  };

  const handleRemoveLabel = (label: any): void => {
    const isString = typeof label === 'string';

    if (isInputField && onRemove && isString) {
      onRemove(label);
    } else if (onRemoveNoteLabel && isString && id) {
      onRemoveNoteLabel(id, label);
    }
  };

  const handleRenameLabel = (label: any): void => {
    const isObject = typeof label === 'object';

    if (newLabel && newLabel !== '' && isObject) {
      const { id, name } = label;
      editLabelFromStore(id, newLabel);
      dispatch(renameLabel(name, newLabel));
    }
  };

  const handleDeleteLabel = (label: any): void => {
    const isObject = typeof label === 'object';

    if (isObject) {
      removeLabelFromStore(label.id);
      dispatch(removeLabel(label));
    }
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    title: string,
  ) => {
    e.preventDefault();

    switch (title) {
      case 'Show Checkbox':
        handleshowCheckbox();
        break;
      case 'Pin Note':
        handletoggleNotePin();
        break;
      case 'Delete Note':
        handleDeleteNote();
        break;
      case 'Delete Todo':
        if (deleteTodo) deleteTodo();
        break;
      case 'Archive':
        handleArchive();
        break;
      case 'Unarchive':
        handleUnarchive();
        break;
      case 'Add Label':
        handleAddLabel();
        break;
      case 'Create Label':
        handleCreateLabel();
        break;
      case 'Remove Label':
        handleRemoveLabel(label);
        break;
      case 'Rename Label':
        handleRenameLabel(label);
        break;
      case 'Delete Label':
        handleDeleteLabel(label);
        break;
      case 'Cancel':
        if (clearInput) clearInput();
        break;
      case 'Change Color':
        if (showPalette) showPalette();
        break;
      default:
        return title;
    }
  };

  const styleProps: StyleProps = {
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
          onClick={(e) => handleClick(e, title)}
          {...styleProps}
        />
      </Tooltip>
    </>
  );
};

export default React.memo(Tool);
