import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

import { ToolbarBtn } from './ToolElements';
import {
  toggleNoteProperty,
  deleteNote,
  archiveNote,
  unarchiveNote,
  clearEditableNote,
  removeNoteLabel,
  addLabel,
  removeLabel,
  renameLabel,
} from '../../../store/actions/notes';
import {
  showFlashMessage,
  hideFlashMessage,
} from '../../../store/actions/flashMessage';

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
  isArchived,
  label,
  newLabel,
  editLabel,
  isLabel,
  clearInput,
  notePin,
  inputPin,
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
        if (isArchived)
          dispatch(toggleNoteProperty(noteID, 'archives', 'isChecked'));
        else {
          dispatch(toggleNoteProperty(noteID, 'notes', 'isChecked'));
        }
        break;
      case 'Pin Note':
        if (isInputField) onToggle('isPinned');
        if (isArchived)
          dispatch(toggleNoteProperty(noteID, 'archives', 'isPinned'));
        else {
          dispatch(toggleNoteProperty(noteID, 'notes', 'isPinned'));
        }
        break;
      case 'Delete Note':
        isArchived
          ? dispatch(deleteNote(noteID, 'archives'))
          : dispatch(deleteNote(noteID, 'notes'));
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
        dispatch(addLabel(label));
        clearInput();
        break;
      case 'Remove Label':
        if (isInputField) onRemove(label);
        if (isArchived) dispatch(removeNoteLabel(noteID, label, 'archives'));
        if (editLabel) dispatch(removeLabel(label));
        else {
          dispatch(removeNoteLabel(noteID, label, 'notes'));
        }
        break;
      case 'Rename Label':
        dispatch(renameLabel(label, newLabel));
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
};

export default React.memo(Tool);
