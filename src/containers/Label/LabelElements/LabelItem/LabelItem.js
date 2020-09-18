import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Checkbox } from '../../../../components/TodoList/TodoItem/TodoItem';

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
  onAdd,
  setNote,
  isInputField,
  isArchived,
  note,
}) {
  const isChecked = note.labels.includes(label);

  const handleChange = (id, label) => {
    if (isInputField) setNote(label);
    if (isArchived) onAdd(id, label, 'archives');
    else {
      onAdd(id, label, 'notes');
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
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  isInputField: PropTypes.bool,
  isArchived: PropTypes.bool,
  onAdd: PropTypes.func,
  setNote: PropTypes.func,
  note: PropTypes.object,
};

export default React.memo(LabelItem);
