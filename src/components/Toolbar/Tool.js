import React from 'react';
import styled, { css } from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';

import { useDispatch } from 'react-redux';
import { toggleCheckbox, deleteNote } from '../../store/actions/notes';

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

  ${({ isInputField }) =>
    isInputField &&
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
  showPalette,
  hidePalette,
  deleteTodo,
  isInputField,
}) {
  const dispatch = useDispatch();

  const handleClick = (e, title, noteID) => {
    if (title === 'Show Checkbox' || title === 'New List') {
      dispatch(toggleCheckbox(noteID));
    }
    if (title === 'Delete Note') {
      dispatch(deleteNote(noteID));
    }
    if (title === 'Delete Todo') {
      deleteTodo();
    }
    e.preventDefault();
  };

  return (
    <>
      <Tooltip title={title} arrow>
        <ToolbarBtn
          bgImage={bgImage}
          isInputField={isInputField}
          onMouseEnter={showPalette}
          onMouseLeave={hidePalette}
          onClick={(e) => handleClick(e, title, id)}
        />
      </Tooltip>
    </>
  );
}

export default Tool;
