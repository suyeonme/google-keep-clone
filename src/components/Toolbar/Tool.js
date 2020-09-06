import React from 'react';
import styled, { css } from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';

import { useDispatch } from 'react-redux';
import {
  toggleCheckbox,
  deleteNote,
  archiveNote,
  deleteArchivedNote,
} from '../../store/actions/notes';

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

  const handleClick = (e, title, noteID) => {
    e.preventDefault();

    if (title === 'Show Checkbox' && isInputField) {
      onCheck();
    }
    if (title === 'Show Checkbox' && !isInputField) {
      dispatch(toggleCheckbox(noteID));
    }
    if (title === 'Delete Note') {
      dispatch(deleteNote(noteID));
    }
    if (title === 'Delete Note' && isArchived) {
      dispatch(deleteArchivedNote(noteID));
    }
    if (title === 'Delete Todo') {
      deleteTodo();
    }
    if (title === 'Archive') {
      dispatch(archiveNote(noteID));
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
          isInputField={isInputField}
          isArchived={isArchived}
        />
      </Tooltip>
    </>
  );
}

export default Tool;
