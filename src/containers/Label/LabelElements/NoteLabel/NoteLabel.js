import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Tool from '../../../Toolbar/Tool/Tool';
import DeleteIcon from '../../../../icons/delete.svg';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 5px 10px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 18px;
  border-radius: 12px;
  line-height: 1.25rem;
  cursor: pointer;
  padding: 3px 5px;
  margin: 6px 6px 0 0;
  background-color: rgba(0, 0, 0, 0.08);
`;

const Label = styled.label`
  font-size: 11px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: inherit;
  margin: 0 6px;
  padding: 1px;
}
`;

function NoteLabel({ labels, id, isInputField, onRemove, isArchived }) {
  const [isHover, setIsHover] = useState(false);
  const [hoveredLabel, sethoveredLabel] = useState('');

  const handleHover = (label) => {
    setIsHover(true);
    sethoveredLabel(label);
  };

  const handleLeave = () => {
    setIsHover(false);
    sethoveredLabel('');
  };

  const labelList = labels.map((label, i) => (
    <Container
      key={i}
      onMouseEnter={() => handleHover(label)}
      onMouseLeave={handleLeave}
    >
      <Label>{label}</Label>
      {isHover && label === hoveredLabel && (
        <Tool
          id={id}
          label={label}
          bgImage={DeleteIcon}
          title="Remove Label"
          onRemove={onRemove}
          isLabel
          isInputField={isInputField}
          isArchived={isArchived}
        />
      )}
    </Container>
  ));
  return <Wrapper>{labelList}</Wrapper>;
}

NoteLabel.propTypes = {
  labels: PropTypes.array,
  id: PropTypes.string,
  onRemove: PropTypes.func,
  isInputField: PropTypes.bool,
  isArchived: PropTypes.bool,
};

export default React.memo(NoteLabel);
