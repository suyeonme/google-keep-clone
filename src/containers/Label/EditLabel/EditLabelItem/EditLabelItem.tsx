import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import LabelIcon from 'icons/label-fill.svg';
import checkIcon from 'icons/check.svg';
import plusIcon from 'icons/plus.svg';
import deleteIcon from 'icons/close.svg';
import trashIcon from 'icons/trash-can.svg';
import penIcon from 'icons/pencil-fill.svg';
import { TodoItemInput } from 'components/TodoList/TodoInput/TodoInput';
import Tool from 'containers/Toolbar/Tool/Tool';
import { LabelObj } from 'shared/types';

const ItemContainer = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditLabelInput = styled(TodoItemInput)`
  margin: 0 15px;
  height: 50%;

  &:focus-within {
    border-bottom: 1px solid #ccc;
  }
`;

interface EditLabelItemProp {
  label?: LabelObj;
  labelCreator?: boolean;
}

type ClickEvent =
  | React.FocusEvent<HTMLDivElement>
  | React.MouseEvent<HTMLDivElement, MouseEvent>;

const EditLabelItem = ({ label, labelCreator }: EditLabelItemProp) => {
  const [isFocused, setIsFocused] = useState(false);
  const [enteredLabel, setEnteredLabel] = useState('');

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>): void => {
    const target = e.currentTarget as HTMLElement;
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!target.contains(relatedTarget)) setIsFocused(false);
  };

  const handleClick = (e: ClickEvent): void => {
    e.preventDefault();
    setIsFocused(true);
  };

  const handleClearInput = useCallback((): void => setEnteredLabel(''), []);

  if (labelCreator) {
    return (
      <ItemContainer onFocus={handleClick} onBlur={handleBlur}>
        <Tool
          bgImage={isFocused ? deleteIcon : plusIcon}
          title={isFocused ? 'Cancel' : 'Create Label'}
          clearInput={handleClearInput}
        />
        <EditLabelInput
          type="text"
          placeholder="Create new label"
          value={enteredLabel}
          onChange={(e) => setEnteredLabel(e.target.value)}
        />
        {isFocused && (
          <Tool
            title="Create Label"
            bgImage={checkIcon}
            newLabel={enteredLabel}
            clearInput={handleClearInput}
            editLabel
          />
        )}
      </ItemContainer>
    );
  }

  if (!labelCreator && label) {
    return (
      <ItemContainer onClick={handleClick} onBlur={handleBlur}>
        <Tool
          bgImage={isFocused ? trashIcon : LabelIcon}
          title={isFocused ? 'Delete Label' : 'Label'}
          label={label}
          editLabel
        />
        <EditLabelInput
          type="text"
          key={label.id}
          defaultValue={label.name}
          onChange={(e) => setEnteredLabel(e.target.value)}
        />
        <Tool
          title="Rename Label"
          bgImage={isFocused ? checkIcon : penIcon}
          newLabel={enteredLabel}
          label={label}
          editLabel
        />
      </ItemContainer>
    );
  }
  return null;
};

export default React.memo(EditLabelItem);
