import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Plus from '../../../../icons/plus.svg';

const Container = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #dadce0;
  cursor: pointer;
  padding: 5px 10px;

  &:hover {
    background-color: #f1f3f4;
  }
`;

const PlusIcon = styled.div`
  width: 10px;
  height: 10px;
  background: url(${Plus}) no-repeat center center;
  background-size: cover;
`;

const Description = styled.p`
  margin-left: 7px;
  padding-top: 2px;
  vertical-align: top;
`;

function LabelCreator({
  id,
  label,
  onClick,
  onAdd,
  setNote,
  isInputField,
  isArchived,
}) {
  const handleClick = (id, label) => {
    if (isInputField) setNote(label);
    if (isArchived) onAdd(id, label, 'archives');
    else {
      onAdd(id, label, 'notes');
    }
    onClick(label);
  };

  return (
    <Container onClick={(e) => handleClick(id, label)} id="labelCreator">
      <PlusIcon />
      <Description>
        Create <strong>"{label}"</strong>
      </Description>
    </Container>
  );
}

LabelCreator.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  isInputField: PropTypes.bool,
  isArchived: PropTypes.bool,
  onAdd: PropTypes.func,
  onClick: PropTypes.func.isRequired,
  setNote: PropTypes.func,
};

export default React.memo(LabelCreator);
