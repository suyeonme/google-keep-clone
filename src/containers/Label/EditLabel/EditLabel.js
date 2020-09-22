import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import EditLabelItem from 'containers/Label/EditLabel/EditLabelItem/EditLabelItem';
import { Title } from 'containers/Label/Label';

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

function EditLabel({ showNav }) {
  const labels = useSelector((state) => state.notes.labels);

  const handleClick = useCallback(
    (e) => {
      if (e.target !== e.currentTarget) return;
      showNav(false);
    },
    [showNav],
  );

  return (
    <Overlay onClick={handleClick}>
      <EditLabelContainer>
        <Title eidtLabel>Edit labels</Title>
        <EditLabelItem labelCreator />
        {labels.map((label, i) => (
          <EditLabelItem key={i} label={label} />
        ))}
      </EditLabelContainer>
    </Overlay>
  );
}

EditLabel.propTypes = {
  showNav: PropTypes.func,
};

export default React.memo(EditLabel);
