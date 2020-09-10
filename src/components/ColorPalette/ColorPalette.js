import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { changeNoteColor } from '../../store/actions/notes';

const ColorPaletteContainer = styled.div`
  max-width: 128px;
  padding: 0.5rem;
  position: absolute;
  bottom: ${(props) => (props.isInputField ? '43px' : '30px')};
  left: 8px;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
    0 1px 3px 1px rgba(60, 64, 67, 0.149);
  background-color: white;
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
  id,
  isInputField,
  isArchived,
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

  const dispatch = useDispatch();

  const handleChangeColor = (e, color, id) => {
    e.preventDefault();
    if (isInputField) onClick(color);
    if (!isInputField) {
      isArchived
        ? dispatch(changeNoteColor(id, 'archives', color))
        : dispatch(changeNoteColor(id, 'notes', color));
    }
  };

  return (
    <ColorPaletteContainer
      isInputField={isInputField}
      onMouseEnter={onHover}
      onMouseLeave={onUnHover}
    >
      {colors.map((color, i) => (
        <ColorPaletteBtn
          key={i}
          color={color}
          onClick={(e) => handleChangeColor(e, color, id)}
        />
      ))}
    </ColorPaletteContainer>
  );
}

ColorPalette.propTypes = {
  id: PropTypes.string.isRequired,
  isInputField: PropTypes.bool,
  isArchived: PropTypes.bool,
  onHover: PropTypes.func.isRequired,
  onUnHover: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};

export default ColorPalette;
