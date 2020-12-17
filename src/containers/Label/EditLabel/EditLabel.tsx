import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import EditLabelItem from 'containers/Label/EditLabel/EditLabelItem/EditLabelItem';
import { Title } from 'containers/Label/Label';
import { RootState } from 'store/reducers/index';
import { Dispatcher, LabelObj } from 'shared/types';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 10, 0.6);
  z-index: 3;
`;

const EditLabelContainer = styled.div`
  background-color: #fff;
  border-radius: 1px;
  width: 300px;
  padding: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  max-height: 100vh;
  overflow-y: auto;
`;

interface EditLabelProp {
  showNav: Dispatcher<boolean>;
}

const EditLabel = ({ showNav }: EditLabelProp) => {
  const labels: LabelObj[] = useSelector(
    (state: RootState) => state.notes.labels,
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      if (e.target !== e.currentTarget) return;
      showNav(false);
    },
    [showNav],
  );

  return (
    <Overlay onClick={handleClick}>
      <EditLabelContainer>
        <Title editLabel>Edit labels</Title>
        <EditLabelItem labelCreator />
        {labels.map((label: LabelObj, i: number) => (
          <EditLabelItem key={i} label={label} />
        ))}
      </EditLabelContainer>
    </Overlay>
  );
};

export default EditLabel;
