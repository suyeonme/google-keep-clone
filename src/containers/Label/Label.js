import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  addLabelToStore,
  addLabelToNote,
  removeLabelFromNote,
} from 'shared/firebase';
import LabelItem from 'containers/Label/LabelElements/LabelItem/LabelItem';
import LabelInput from 'containers/Label/LabelElements/LabelInput/LabelInput';
import LabelCreator from 'containers/Label/LabelElements/LabelCreator/LabelCreator';
import { useClickOutside } from 'hooks/useClickOutside';

const LabelContainer = styled.div`
  position: absolute;
  left: 0;
  z-index: 1;
  width: 225px;
  height: auto;
  border-radius: 2px;
  font-size: 13px;
  background-color: #fff;
  padding-top: 11px;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
    0 2px 6px 2px rgba(60, 64, 67, 0.149);
`;

export const Title = styled.h3`
  font-size: ${(props) => (props.eidtLabel ? '16px' : '14px')};
  padding: ${(props) => (props.eidtLabel ? '0' : ' 0 12px')};
  font-weight: ${(props) => (props.eidtLabel ? '500' : '400')};
`;

const LabelItemContainer = styled.div`
  padding: 6px 0;
`;

function Label({
  isInputField,
  isArchived,
  setShowLabel,
  note,
  onRemove,
  onExpand,
  setNewNote,
  addLabelToInputField,
}) {
  const [label, setLabel] = useState('');
  const labels = useSelector((state) => state.notes.labels);
  const { id } = note;

  useEffect(() => {
    onExpand(true);
    if (!isExpand) setShowLabel(false);
  });

  const { ref, isClickOutside: isExpand } = useClickOutside(true);

  const handleChange = useCallback((label) => setLabel(label), []);

  const addLabelNote = async (id, label) => {
    setNewNote((prev) => ({ ...prev, labels: prev.labels.concat(label) }));
    addLabelToNote(id, label);
  };

  const handleLabelToNote = async (id, label) => {
    addLabelNote(id, label);
    addLabelToStore(label);
  };

  const labelCreatorProps = {
    id,
    label,
    addLabelToInputField,
    isInputField,
    isArchived,
    setNewNote: setNewNote,
    addLabelToNote: handleLabelToNote,
  };

  const labelItemProps = {
    id,
    isInputField,
    isArchived,
    note,
    onRemove: onRemove,
    addLabelToInputField,
    removeLabelFromNote,
    addLabelToNote: addLabelNote,
  };

  let labelList;
  let labelCreator;
  const labelExist = labels.includes(label);
  const existSubstrOfLable =
    labels.filter((l) => label !== '' && l.name.includes(label)).length > 0;

  if (label !== '') {
    if (labels.length === 0 && !labelExist) {
      labelCreator = <LabelCreator {...labelCreatorProps} />;
    }

    if (labels.length > 0 && !existSubstrOfLable) {
      labelCreator = <LabelCreator {...labelCreatorProps} />;
    }

    if (labels.length > 0 && existSubstrOfLable) {
      labelList = labels
        .filter((l) => label === '' || l.name.includes(label))
        .map((l, i) => (
          <LabelItem key={i} label={l.name} {...labelItemProps} />
        ));
    }
  }

  if (label === '' && labels.length > 0) {
    labelList = labels.map((l, i) => (
      <LabelItem key={i} label={l.name} {...labelItemProps} />
    ));
  }

  return (
    <LabelContainer id="label" ref={ref} onClick={(e) => e.stopPropagation()}>
      <Title>Label note</Title>
      <LabelInput value={label} onChange={handleChange} labelInput />
      <LabelItemContainer>{labelList}</LabelItemContainer>
      {labelCreator}
    </LabelContainer>
  );
}

Label.propTypes = {
  isInputField: PropTypes.bool,
  // isArchived: PropTypes.bool,
  setShowLabel: PropTypes.func,
  note: PropTypes.object,
  onRemove: PropTypes.func,
  onExpand: PropTypes.func,
  setNewNote: PropTypes.func,
  addLabelToInputField: PropTypes.func,
};

export default React.memo(Label);
