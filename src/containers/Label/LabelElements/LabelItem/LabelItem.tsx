import React from 'react';
import styled from 'styled-components';

import { Checkbox } from 'components/TodoList/TodoItem/TodoItem';

import { Note } from 'shared/types';

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

interface LabelItemProp {
  label: string;
  id?: string;
  note: Note;
  onRemove?: (label: string) => void;
  isInputField?: boolean;
  removeLabelFromNote: (id: string, label: string) => void;
  addLabelToNote: (id: string, label: string) => void;
  addLabelToInputField?: (label: string) => void;
}

const LabelItem = ({
  label,
  id,
  note,
  onRemove,
  isInputField,
  removeLabelFromNote,
  addLabelToNote,
  addLabelToInputField,
}: LabelItemProp) => {
  const isChecked: boolean =
    note.labels.length > 0 && note.labels.includes(label);

  const handleChange = (id: string | undefined, label: string) => {
    if (isInputField && onRemove && addLabelToInputField) {
      isChecked ? onRemove(label) : addLabelToInputField(label);
    } else if (id) {
      isChecked ? removeLabelFromNote(id, label) : addLabelToNote(id, label);
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
};

export default React.memo(LabelItem);
