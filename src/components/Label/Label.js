import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { addLabel, addNoteLabel } from '../../store/actions/notes';

import LabelItem from './LabelItem/LabelItem';
import LabelInput from './LabelItem/LabelInput/LabelInput';
import LabelCreator from './LabelItem/LabelCreator/LabelCreator';

const LabelContainer = styled.div`
  margin-left: 20%;
  ${'' /* HERE */}
  position: absolute;
  top: 120px;

  z-index: 2;
  width: 225px;
  height: auto;
  border-radius: 2px;
  font-size: 13px;
  background-color: #fff;
  padding-top: 11px;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
    0 2px 6px 2px rgba(60, 64, 67, 0.149);
`;

const Title = styled.h3`
  font-size: 14px;
  font-weight: 400;
  padding: 0 12px;
`;

const LabelItemContainer = styled.div`
  padding: 6px 0;
`;

function Label({ id, isInputField, setNote }) {
  const [label, setLabel] = useState('');

  const labels = useSelector((state) => state.notes.labels);
  const dispatch = useDispatch();

  const clearLabel = () => setLabel('');
  const handleChange = (label) => setLabel(label);
  const handleAdd = (id, label) => dispatch(addNoteLabel(id, label));
  const handleClick = (label) => {
    dispatch(addLabel(label));
    clearLabel();
  };

  let labelList;
  let labelCreator;
  const isExisted =
    labels.filter((el) => label !== '' && el.includes(label)).length > 0;

  if (label !== '') {
    if (labels.length === 0 && !labels.includes(label)) {
      labelCreator = (
        <LabelCreator
          id={id}
          label={label}
          onClick={handleClick}
          onAdd={handleAdd}
          ///
          setNote={setNote}
          isInputField
        />
      );
    }

    if (labels.length > 0 && !isExisted) {
      labelCreator = (
        <LabelCreator
          id={id}
          label={label}
          onClick={handleClick}
          onAdd={handleAdd}
          ///
          setNote={setNote}
          isInputField
        />
      );
    }

    if (labels.length > 0 && isExisted) {
      labelList = labels
        .filter((l) => label === '' || l.includes(label))
        .map((l, i) => (
          <LabelItem
            id={id}
            key={i}
            label={l}
            onAdd={handleAdd}
            ///
            setNote={setNote}
            isInputField
          />
        ));
    }
  }

  if (label === '' && labels.length > 0) {
    labelList = labels.map((l, i) => (
      <LabelItem
        id={id}
        key={i}
        label={l}
        onAdd={handleAdd}
        ///
        setNote={setNote}
        isInputField
      />
    ));
  }

  return (
    <LabelContainer id="label" onClick={(e) => e.stopPropagation()}>
      <Title>Label note</Title>
      <LabelInput value={label} onChange={handleChange} labelInput />
      <LabelItemContainer>{labelList}</LabelItemContainer>
      {labelCreator}
    </LabelContainer>
  );
}

export default React.memo(Label);

// function Label({ onChange, onClick, labels, label, id, onAdd }) {

//   let labelList;
//   let labelCreator;

//   const isExisted =
//     labels.filter((l) => label !== '' && l.includes(label)).length > 0;

//   if (label !== '') {
//     if (labels.length === 0 && !labels.includes(label)) {
//       labelCreator = (
//         <LabelCreator label={label} onClick={onClick} id={id} onAdd={onAdd} />
//       );
//     }

//     if (labels.length > 0 && !isExisted) {
//       labelCreator = (
//         <LabelCreator
//           labels={labels}
//           label={label}
//           onClick={onClick}
//           id={id}
//           onAdd={onAdd}
//         />
//       );
//     }

//     if (labels.length > 0 && isExisted) {
//       labelList = labels
//         .filter((l) => label === '' || l.includes(label))
//         .map((l, i) => <LabelItem label={l} key={i} id={id} onAdd={onAdd} />);
//     }
//   }

//   if (label === '' && labels.length > 0) {
//     labelList = labels.map((l, i) => (
//       <LabelItem label={l} key={i} id={id} onAdd={onAdd} />
//     ));
//   }

//   return (
//     <LabelContainer id="label" onClick={(e) => e.stopPropagation()}>
//       <Title>Label note</Title>
//       <LabelInput value={label} onChange={onChange} labelInput />
//       <LabelItemContainer>{labelList}</LabelItemContainer>
//       {labelCreator}
//     </LabelContainer>
//   );
// }

// export default React.memo(Label);
