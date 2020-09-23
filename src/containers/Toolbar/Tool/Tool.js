import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

import { showFlashMessage, hideFlashMessage } from 'store/actions/flashMessage';
import { ToolbarBtn } from 'containers/Toolbar/Tool/ToolElements';
import {
  archiveNote,
  unarchiveNote,
  clearEditableNote,
  addLabel,
  renameLabel,
} from 'store/actions/notes';
import {
  editLabelFromStore,
  toggleNotePin,
  toggleNoteTodo,
} from 'shared/firebase';

function Tool({
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
  // isArchived,
}) {
  const dispatch = useDispatch();

  const showMessage = (message) => {
    dispatch(showFlashMessage(message));

    setTimeout(() => {
      dispatch(hideFlashMessage());
    }, 3000);
  };

  const handleClick = (e, title, noteID) => {
    e.preventDefault();

    switch (title) {
      case 'Show Checkbox':
        if (isInputField) onToggle('isChecked');
        if (!isInputField) toggleNoteTodo(noteID, !isChecked);
        // Notes, Archives
        break;
      case 'Pin Note':
        if (isInputField) onToggle('isPinned');
        if (!isInputField) toggleNotePin(noteID, !isPinned);
        // Notes, Archives
        break;
      case 'Delete Note':
        onDelete();
        break;
      case 'Delete Todo':
        deleteTodo();
        break;
      case 'Archive':
        if (isInputField) showMessage('Note archived');
        else {
          showMessage('Note archived');
          dispatch(archiveNote(noteID));
          dispatch(clearEditableNote());
        }
        break;
      case 'Unarchive':
        showMessage('Note uarchived');
        dispatch(unarchiveNote(noteID));
        dispatch(clearEditableNote());
        break;
      case 'Add Label':
        setShowLabel(true);
        break;
      case 'Create Label':
        dispatch(addLabel(newLabel));
        clearInput();
        break;
      case 'Remove Label':
        if (isInputField) onRemove(label);
        if (!isInputField) onRemoveNoteLabel(id, label);
        // Notes, Archives
        break;
      case 'Rename Label':
        dispatch(renameLabel(label.name, newLabel));
        editLabelFromStore(label.id, newLabel);
        break;
      case 'Cancel':
        clearInput();
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
      <Tooltip title={title} arrow>
        <ToolbarBtn
          isInputField={isInputField}
          onMouseEnter={showPalette}
          onMouseLeave={hidePalette}
          onClick={(e) => handleClick(e, title, id)}
          {...styleProps}
        />
      </Tooltip>
    </>
  );
}

Tool.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  bgImage: PropTypes.string,
  onToggle: PropTypes.func,
  showPalette: PropTypes.func,
  hidePalette: PropTypes.func,
  deleteTodo: PropTypes.func,
  isInputField: PropTypes.bool,
  isPinned: PropTypes.bool,
  isArchived: PropTypes.bool,
  setShowLabel: PropTypes.func,
  onRemove: PropTypes.func,
  clearInput: PropTypes.func,
  isLabel: PropTypes.bool,
  editLabel: PropTypes.bool,
  notePin: PropTypes.bool,
  inputPin: PropTypes.bool,
  onDelete: PropTypes.func,
  // label: PropTypes.object,
  newLabel: PropTypes.string,
  onRemoveNoteLabel: PropTypes.func,
  isChecked: PropTypes.bool,
};

export default React.memo(Tool);
