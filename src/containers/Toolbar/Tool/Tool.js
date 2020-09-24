import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

import { showFlashMessage, hideFlashMessage } from 'store/actions/flashMessage';
import { ToolbarBtn } from 'containers/Toolbar/Tool/ToolElements';
import { addLabel, renameLabel, removeLabel } from 'store/actions/notes';
import {
  editLabelFromStore,
  addLabelToStore,
  removeLabelFromStore,
  toggleNotePin,
  toggleNoteTodo,
  changeNoteToArchives,
  changeArchivesToNotes,
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
  note,
  isArchived,
}) {
  const dispatch = useDispatch();

  const showMessage = (message) => {
    dispatch(showFlashMessage(message));

    setTimeout(() => {
      dispatch(hideFlashMessage());
    }, 3000);
  };

  const handleClick = (e, title, id) => {
    e.preventDefault();

    switch (title) {
      case 'Show Checkbox':
        if (isInputField) {
          onToggle('isChecked');
        } else if (isArchived) {
          toggleNoteTodo(id, !isChecked, 'archives');
        } else {
          toggleNoteTodo(id, !isChecked, 'notes');
        }
        break;
      case 'Pin Note':
        if (isInputField) {
          onToggle('isPinned');
        } else if (isArchived) {
          toggleNotePin(id, !isPinned, 'archives');
        } else {
          toggleNotePin(id, !isPinned, 'notes');
        }
        break;
      case 'Delete Note':
        isArchived ? onDelete(id, 'archives') : onDelete(id, 'notes');
        break;
      case 'Delete Todo':
        deleteTodo();
        break;
      case 'Archive':
        if (isInputField) {
          showMessage('Note archived');
        } else {
          showMessage('Note archived');
          changeNoteToArchives(id, note);
        }
        break;
      case 'Unarchive':
        showMessage('Note uarchived');
        changeArchivesToNotes(id, note);
        break;
      case 'Add Label':
        setShowLabel(true);
        break;
      case 'Create Label':
        dispatch(addLabel(newLabel));
        addLabelToStore(newLabel);
        clearInput();
        break;
      case 'Remove Label':
        isInputField ? onRemove(label) : onRemoveNoteLabel(id, label);
        break;
      case 'Rename Label':
        dispatch(renameLabel(label.name, newLabel));
        editLabelFromStore(label.id, newLabel);
        break;
      case 'Delete Label':
        dispatch(removeLabel(label));
        removeLabelFromStore(label.id, label);
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
  newLabel: PropTypes.string,
  onRemoveNoteLabel: PropTypes.func,
  isChecked: PropTypes.bool,
  note: PropTypes.object,
};

export default React.memo(Tool);
