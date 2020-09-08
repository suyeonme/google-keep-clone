import React from 'react';
import styled, { css } from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';

import { useDispatch } from 'react-redux';
import {
  toggleCheckbox,
  deleteNote,
  archiveNote,
  unarchiveNote,
  clearEditableNote,
} from '../../store/actions/notes';

import {
  showFlashMessage,
  hideFlashMessage,
} from '../../store/actions/flashMessage';

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

  ${({ pin }) =>
    pin &&
    css`
      position: absolute;
      top: 2px;
      right: 0;
      width: 40px;
      height: 40px;
    `}
`;

function Tool({
  id,
  title,
  bgImage,
  onCheck,
  showPalette,
  hidePalette,
  deleteTodo,
  isInputField,
  isArchived,
  pin,
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

    if (title === 'Show Checkbox') {
      if (isInputField) onCheck();
      if (isArchived) dispatch(toggleCheckbox(noteID, 'archives'));
      else {
        dispatch(toggleCheckbox(noteID, 'notes'));
      }
    }

    if (title === 'Delete Note') {
      isArchived
        ? dispatch(deleteNote(noteID, 'archives'))
        : dispatch(deleteNote(noteID, 'notes'));
    }
    if (title === 'Delete Todo') {
      deleteTodo();
    }
    if (title === 'Archive') {
      if (isInputField) showMessage('Note archived');
      else {
        showMessage('Note archived');
        dispatch(archiveNote(noteID));
        dispatch(clearEditableNote());
      }
    }
    if (title === 'Unarchive') {
      showMessage('Note uarchived');
      dispatch(unarchiveNote(noteID));
      dispatch(clearEditableNote());
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
          pin={pin}
        />
      </Tooltip>
    </>
  );
}

export default Tool;
