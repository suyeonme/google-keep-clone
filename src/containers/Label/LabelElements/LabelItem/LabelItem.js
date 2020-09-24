import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Checkbox } from 'components/TodoList/TodoItem/TodoItem';

const LabelItemContainer = styled.div`
  background: inherit;
  cursor: pointer;
  padding: 5px 10px 5px;
  display: flex;

  &:hover {
    background-color: #f1f3f4;
  }
  &:focus-within {
    background-color: #ebebeb;
  }
`;

const Label = styled.label`
  cursor: inherit;
  width: 100%;
`;

function LabelItem({
  label,
  id,
  note,
  onRemove,
  isInputField,
  isArchived,
  removeLabelFromNote,
  addLabelToNote,
  addLabelToInputField,
}) {
  const isChecked = note.labels.includes(label);

  const handleChange = (id, label) => {
    if (isInputField) {
      isChecked ? onRemove(label) : addLabelToInputField(label);
    } else if (isArchived) {
      isChecked
        ? removeLabelFromNote(id, label, 'archives')
        : addLabelToNote(id, label, 'archives');
    } else {
      isChecked
        ? removeLabelFromNote(id, label, 'notes')
        : addLabelToNote(id, label, 'notes');
    }
  };

  return (
    <LabelItemContainer>
      <Checkbox
        id={label + id}
        type="checkbox"
        onChange={() => handleChange(id, label)}
        checked={isChecked}
      />
      <Label htmlFor={label + id}>{label}</Label>
    </LabelItemContainer>
  );
}

LabelItem.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  isInputField: PropTypes.bool,
  isArchived: PropTypes.bool,
  note: PropTypes.object,
  onRemove: PropTypes.func,
  addLabelToNote: PropTypes.func,
  removeLabelFromNote: PropTypes.func,
  addLabelToInputField: PropTypes.func,
};

export default React.memo(LabelItem);
