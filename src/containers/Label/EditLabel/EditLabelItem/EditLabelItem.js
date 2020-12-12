import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Tool from 'containers/Toolbar/Tool/Tool';
import { TodoItemInput } from 'components/TodoList/TodoInput/TodoInput';
import LabelIcon from 'icons/label-fill.svg';
import checkIcon from 'icons/check.svg';
import plusIcon from 'icons/plus.svg';
import deleteIcon from 'icons/close.svg';
import trashIcon from 'icons/trash-can.svg';
import penIcon from 'icons/pencil-fill.svg';

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

function EditLabelItem({ label, labelCreator }) {
  const [isFocused, setIsFocused] = useState(false);
  const [enteredLabel, setEnteredLabel] = useState('');

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsFocused(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsFocused(true);
  };

  const handleClearInput = useCallback(() => setEnteredLabel(''), []);

  if (labelCreator) {
    return (
      <ItemContainer onFocus={handleClick} onBlur={handleBlur}>
        <Tool
          bgImage={isFocused ? deleteIcon : plusIcon}
          title={isFocused ? 'Cancel' : 'Create Label'}
          clearInput={handleClearInput}
        />
        <EditLabelInput
          value={enteredLabel}
          placeholder="Create new label"
          onChange={(e) => setEnteredLabel(e.target.value)}
        />
        {isFocused && (
          <Tool
            bgImage={checkIcon}
            newLabel={enteredLabel}
            clearInput={handleClearInput}
            title="Create Label"
            editLabel
          />
        )}
      </ItemContainer>
    );
  }

  if (!labelCreator) {
    return (
      <ItemContainer onClick={handleClick} onBlur={handleBlur}>
        <Tool
          bgImage={isFocused ? trashIcon : LabelIcon}
          label={label}
          title={isFocused ? 'Delete Label' : 'Label'}
          editLabel
        />
        <EditLabelInput
          defaultValue={label.name}
          onChange={(e) => setEnteredLabel(e.target.value)}
        />
        <Tool
          bgImage={isFocused ? checkIcon : penIcon}
          label={label}
          newLabel={enteredLabel}
          title="Rename Label"
          editLabel
        />
      </ItemContainer>
    );
  }
}

EditLabelItem.propTypes = {
  label: PropTypes.object,
  labelCreator: PropTypes.bool,
};

export default React.memo(EditLabelItem);
