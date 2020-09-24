import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { changeColor } from 'shared/firebase';

const ColorPaletteContainer = styled.div`
  max-width: 128px;
  padding: 0.5rem;
  position: absolute;
  bottom: 30px;
  left: 8px;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
    0 1px 3px 1px rgba(60, 64, 67, 0.149);
  background-color: white;

  ${({ isInputField }) =>
    isInputField &&
    css`
      bottom: 80px;
    `}
`;

const ColorPaletteBtn = styled.button`
  width: 25px;
  height: 25px;
  border: 1.5px solid transparent;
  border-radius: 50%;
  margin: 0.2rem;
  background: ${(props) => props.color};

  &:hover {
    border: 1.5px solid #5f6367;
  }

  &:first-child {
    border: 1.5px solid #e7eaed;
    &:hover {
      border: 1.5px solid #5f6367;
    }
  }
`;

function ColorPalette({
  isArchived,
  id,
  isInputField,
  onHover,
  onUnHover,
  onClick,
}) {
  const colors = [
    '#fff',
    '#d9adad',
    '#84a9ac',
    '#93b5e1',
    '#e3dfc8',
    '#eebb4d',
    '#99b898',
    '#c26565',
  ];

  const handleChangeColor = async (color) => {
    if (isArchived) {
      changeColor(color, id, 'archives');
    } else if (!isInputField) {
      changeColor(color, id, 'notes');
    }
  };

  const handleClick = (e, color) => {
    e.preventDefault();
    if (isInputField) onClick(color);
    handleChangeColor(color);
  };

  return (
    <ColorPaletteContainer onMouseEnter={onHover} onMouseLeave={onUnHover}>
      {colors.map((color, i) => (
        <ColorPaletteBtn
          key={i}
          color={color}
          onClick={(e) => handleClick(e, color)}
        />
      ))}
    </ColorPaletteContainer>
  );
}

ColorPalette.propTypes = {
  id: PropTypes.string,
  isInputField: PropTypes.bool,
  isArchived: PropTypes.bool,
  onHover: PropTypes.func.isRequired,
  onUnHover: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};

export default ColorPalette;
