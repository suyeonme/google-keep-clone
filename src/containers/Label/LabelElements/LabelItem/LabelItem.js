import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { removeNoteLabel } from '../../../../store/actions/notes';
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
  note,
  onAdd,
  onRemove,
  setNote,
  isInputField,
  isArchived,
}) {
  const dispatch = useDispatch();
  const isChecked = note.labels.includes(label);

  const handleChange = (id, label) => {
    if (isInputField) {
      isChecked ? onRemove(label) : setNote(label);
    } else if (isArchived) {
      isChecked
        ? dispatch(removeNoteLabel(id, label, 'archives'))
        : onAdd(id, label, 'archives');
    } else {
      isChecked
        ? dispatch(removeNoteLabel(id, label, 'notes'))
        : onAdd(id, label, 'notes');
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
  onRemove: PropTypes.func,
};

export default React.memo(LabelItem);
