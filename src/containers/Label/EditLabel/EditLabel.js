import React from 'react';
import styled from 'styled-components';

import EditLabelItem from './EditLabelItem/EditLabelItem';
import { Title } from '../Label';

import LabelIcon from '../../../icons/label.svg';
import CheckIcon from '../../../icons/check.svg';
import PlusIcon from '../../../icons/plus.svg';

// props
// React memo

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 10, 0.6);
  ${'' /* z-index: 3; */}
`;

const EditLabelContainer = styled.div`
  background-color: #fff;
  border-radius: 1px;
  overflow-y: auto;
  width: 300px;
  padding: 15px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function EditLabel({ onClick }) {
  const handleClick = (e) => {
    if (e.target !== e.currentTarget) return; // Adjust z-index
    onClick(false);
  };

  return (
    <Overlay onClick={handleClick}>
      <EditLabelContainer>
        <Title eidtLabel>Edit labels</Title>
        <EditLabelItem
          bgFIrst={PlusIcon}
          bgSecond={CheckIcon}
          placeholder="Create new label"
        />
        <EditLabelItem
          bgFIrst={LabelIcon}
          bgSecond={CheckIcon}
          placeholder="label"
        />
      </EditLabelContainer>
    </Overlay>
  );
}

export default EditLabel;
