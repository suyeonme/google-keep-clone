import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Plus from 'icons/plus.svg';
import { addLabelToStore } from 'shared/firebase';

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
  isInputField,
  addLabelToNote,
  addLabelToInputField,
  clearLabelInput,
}) {
  const handleClick = (label) => {
    if (isInputField) {
      addLabelToInputField(label);
      addLabelToStore(label);
    } else {
      addLabelToNote(id, label);
      clearLabelInput('');
    }
  };

  return (
    <Container onClick={() => handleClick(label)} id="labelCreator">
      <PlusIcon />
      <Description>
        Create <strong>"{label}"</strong>
      </Description>
    </Container>
  );
}

LabelCreator.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  isInputField: PropTypes.bool,
  addLabelToNote: PropTypes.func,
  addLabelToInputField: PropTypes.func,
  clearLabelInput: PropTypes.func,
};

export default React.memo(LabelCreator);
