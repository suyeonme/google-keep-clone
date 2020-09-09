import React from 'react';
import styled, { css } from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import {
  toggleNoteTool,
  deleteNote,
  archiveNote,
  unarchiveNote,
  clearEditableNote,
} from '../../store/actions/notes';

import {
  showFlashMessage,
  hideFlashMessage,
} from '../../store/actions/flashMessage';

import PinIcon from '../../icons/pin.svg';
import FilledPinIcon from '../../icons/pin-fill.svg';

const ToolbarBtn = styled.button`
  border-radius: 50%;
  width: 28px;
  height: 28px;
  background: ${(props) => `url(${props.bgImage})`} no-repeat center center;
  background-size: 50%;
  margin-right: 10px;

  &:hover {
    opacity: 0.87;
    background-color: rgba(95, 99, 104, 0.157);
  }

  ${({ notePin }) =>
    notePin &&
    css`
      position: absolute;
      top: 9px;
      right: 7px;
      width: 30px;
      height: 30px;
      opacity: 0.54;
      background-size: 24px 24px;
      margin-right: 0;
      background: ${(props) =>
          props.isPinned ? `url(${FilledPinIcon})` : `url(${PinIcon})`}
        no-repeat center center;
    `}

  ${({ inputPin }) =>
    inputPin &&
    css`
      position: absolute;
      top: 2px;
      right: 0;
      width: 40px;
      height: 40px;
      background: ${(props) =>
          props.isPinned ? `url(${FilledPinIcon})` : `url(${PinIcon})`}
        no-repeat center center;
    `}
`;

function Tool({
  id,
  title,
  bgImage,
  onToggle,
  showPalette,
  hidePalette,
  deleteTodo,
  isInputField,
  isPinned,
  isArchived,
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
          dispatch(toggleNoteTool(noteID, 'archives', 'isChecked'));
        else {
          dispatch(toggleNoteTool(noteID, 'notes', 'isChecked'));
        }
        break;
      case 'Pin Note':
        if (isInputField) onToggle('isPinned');
        if (isArchived)
          dispatch(toggleNoteTool(noteID, 'archives', 'isPinned'));
        else {
          dispatch(toggleNoteTool(noteID, 'notes', 'isPinned'));
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
      default:
        return title;
    }
  };

  return (
    <>
      <Tooltip title={title} arrow>
        <ToolbarBtn
          bgImage={bgImage}
          onMouseEnter={showPalette}
          onMouseLeave={hidePalette}
          onClick={(e) => handleClick(e, title, id)}
          isInputField={isInputField}
          notePin={notePin}
          inputPin={inputPin}
          isPinned={isPinned}
        />
      </Tooltip>
    </>
  );
}

Tool.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  bgImage: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
  showPalette: PropTypes.func,
  hidePalette: PropTypes.func,
  deleteTodo: PropTypes.func,
  isInputField: PropTypes.bool,
  isPinned: PropTypes.bool,
  isArchived: PropTypes.bool,
  notePin: PropTypes.bool,
  inputPin: PropTypes.bool,
};

export default React.memo(Tool);
