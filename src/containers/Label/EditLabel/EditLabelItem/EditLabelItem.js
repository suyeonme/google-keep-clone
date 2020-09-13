import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Tool from '../../../Toolbar/Tool/Tool';
import { TodoItemInput as Input } from '../../../../components/TodoList/TodoInput/TodoInput';
import LabelIcon from '../../../../icons/label-fill.svg';
import CheckIcon from '../../../../icons/check.svg';
import PlusIcon from '../../../../icons/plus.svg';
import DeleteIcon from '../../../../icons/delete.svg';
import TrashIcon from '../../../../icons/trash-can.svg';
import PenIcon from '../../../../icons/pencil-fill.svg';

const ItemContainer = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function EditLabelItem({ label, labelCreator }) {
  const [isFocused, setIsFocused] = useState(false);
  const [enteredLabel, setEnteredLabel] = useState('');

  const isArchived = window.location.pathname === '/archive' ? true : false;
  // notes
  // labels

  const handleClearInput = useCallback(() => setEnteredLabel(''), []);
  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setIsFocused(false);
  };

  if (labelCreator) {
    return (
      <ItemContainer onFocus={() => setIsFocused(true)} onBlur={handleBlur}>
        <Tool
          bgImage={isFocused ? DeleteIcon : PlusIcon}
          title={isFocused ? 'Cancel' : 'Create Label'}
          clearInput={handleClearInput}
        />
        <Input
          value={enteredLabel}
          placeholder="Create new label"
          onChange={(e) => setEnteredLabel(e.target.value)}
          editLabel
        />
        {isFocused && (
          <Tool
            bgImage={CheckIcon}
            label={enteredLabel}
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
      <ItemContainer
        onClick={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <Tool
          bgImage={isFocused ? TrashIcon : LabelIcon}
          label={label}
          title="Remove Label"
          editLabel
          isArchived={isArchived}
        />
        <Input
          defaultValue={label}
          onChange={(e) => setEnteredLabel(e.target.value)}
          editLabel
        />
        <Tool
          bgImage={isFocused ? CheckIcon : PenIcon}
          label={label}
          newLabel={enteredLabel}
          title="Rename Label"
          editLabel
          isArchived={isArchived}
        />
      </ItemContainer>
    );
  }
}

EditLabelItem.propTypes = {
  label: PropTypes.string,
  labelCreator: PropTypes.bool,
};

export default React.memo(EditLabelItem);
