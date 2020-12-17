import React from 'react';
import styled, { css } from 'styled-components';

import { changeColor } from 'shared/firebase';

const ColorPaletteContainer = styled('div')<{ isInputField?: boolean }>`
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

const ColorPaletteBtn = styled('button')<{ color: string }>`
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

interface ColorPaletteProp {
  id?: string;
  isInputField?: boolean;
  onHover: () => void;
  onUnHover: () => void;
  onClick: ((color: string) => void) | undefined;
}

const ColorPalette = ({
  id,
  isInputField,
  onHover,
  onUnHover,
  onClick,
}: ColorPaletteProp) => {
  const colors: string[] = [
    '#fff',
    '#d9adad',
    '#84a9ac',
    '#93b5e1',
    '#e3dfc8',
    '#eebb4d',
    '#99b898',
    '#c26565',
  ];

  const handleClick = (e: React.MouseEvent, color: string): void => {
    e.preventDefault();
    if (isInputField && onClick) {
      onClick(color);
    } else if (id) {
      changeColor(color, id);
    }
  };

  return (
    <ColorPaletteContainer onMouseEnter={onHover} onMouseLeave={onUnHover}>
      {colors.map((color) => (
        <ColorPaletteBtn
          key={color}
          color={color}
          onClick={(e) => handleClick(e, color)}
        />
      ))}
    </ColorPaletteContainer>
  );
};

export default React.memo(ColorPalette);
