import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import LabelItem from './LabelElements/LabelItem/LabelItem';
import LabelInput from './LabelElements/LabelInput/LabelInput';
import LabelCreator from './LabelElements/LabelCreator/LabelCreator';
import { addLabel, addNoteLabel } from '../../store/actions/notes';
import { useClickOutside } from '../../hooks/useClickOutside';

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
  id,
  setNote,
  isInputField,
  isArchived,
  setShowLabel,
  note,
  onRemove,
  onExpand,
}) {
  const [label, setLabel] = useState('');

  const labels = useSelector((state) => state.notes.labels);
  const dispatch = useDispatch();

  useEffect(() => {
    onExpand(true);
    if (!isExpand) setShowLabel(false);
  });

  const { ref, isClickOutside: isExpand } = useClickOutside(true);
  const handleChange = useCallback((label) => setLabel(label), []);

  const addLabelToNote = (id, label, noteType) =>
    dispatch(addNoteLabel(id, label, noteType));

  const addGlobalLabel = useCallback(
    (label) => {
      dispatch(addLabel(label));
    },
    [dispatch],
  );

  const labelCreatorProps = {
    id,
    label,
    setNote,
    isInputField,
    isArchived,
    onClick: addGlobalLabel,
    onAdd: addLabelToNote,
  };

  const labelItemProps = {
    id,
    setNote,
    isInputField,
    isArchived,
    note,
    onAdd: addLabelToNote,
    onRemove: onRemove,
  };

  let labelList;
  let labelCreator;
  const labelExist = labels.includes(label);
  const existSubstrOfLable =
    labels.filter((l) => label !== '' && l.includes(label)).length > 0;

  if (label !== '') {
    if (labels.length === 0 && !labelExist) {
      labelCreator = <LabelCreator {...labelCreatorProps} />;
    }

    if (labels.length > 0 && !existSubstrOfLable) {
      labelCreator = <LabelCreator {...labelCreatorProps} />;
    }

    if (labels.length > 0 && existSubstrOfLable) {
      labelList = labels
        .filter((l) => label === '' || l.includes(label))
        .map((l, i) => <LabelItem key={i} label={l} {...labelItemProps} />);
    }
  }

  if (label === '' && labels.length > 0) {
    labelList = labels.map((l, i) => (
      <LabelItem key={i} label={l} {...labelItemProps} />
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
  id: PropTypes.string,
  isInputField: PropTypes.bool,
  isArchived: PropTypes.bool,
  setNote: PropTypes.func,
  setShowLabel: PropTypes.func,
  note: PropTypes.object,
  onRemove: PropTypes.func,
  onExpand: PropTypes.func,
};

export default React.memo(Label);
