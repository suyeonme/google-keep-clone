import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

import { showFlashMessage, hideFlashMessage } from 'store/actions/flashMessage';
import { ToolbarBtn, ToolSpan } from 'containers/Toolbar/Tool/ToolElements';
import { renameLabel, removeLabel } from 'store/actions/notes';
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
        isInputField ? onToggle('isChecked') : toggleNoteTodo(id, !isChecked);
        break;
      case 'Pin Note':
        isInputField ? onToggle('isPinned') : toggleNotePin(id, !isPinned);
        break;
      case 'Delete Note':
        onDelete(id, 'notes');
        break;
      case 'Delete Todo':
        deleteTodo();
        break;
      case 'Archive':
        if (isInputField) {
          showMessage('Note archived');
        } else {
          showMessage('Note archived');
          changeNoteToArchives(id);
        }
        break;
      case 'Unarchive':
        showMessage('Note uarchived');
        changeArchivesToNotes(id);
        break;
      case 'Add Label':
        setShowLabel(true);
        break;
      case 'Create Label':
        if (newLabel !== '') {
          addLabelToStore(newLabel);
          clearInput();
        }
        break;
      case 'Remove Label':
        isInputField ? onRemove(label) : onRemoveNoteLabel(id, label);
        break;
      case 'Rename Label':
        if (newLabel !== '') {
          editLabelFromStore(label.id, newLabel);
          dispatch(renameLabel(label.name, newLabel));
        }
        break;
      case 'Delete Label':
        removeLabelFromStore(label.id, label);
        dispatch(removeLabel(label));
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
      <Tooltip title={<ToolSpan>{title}</ToolSpan>}>
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
};

export default React.memo(Tool);
