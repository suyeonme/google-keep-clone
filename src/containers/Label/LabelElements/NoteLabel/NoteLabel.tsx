import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { removeLabelFromNote } from 'shared/firebase';
import Tool from 'containers/Toolbar/Tool/Tool';
import deleteIcon from 'icons/close.svg';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 5px 10px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 18px;
  border-radius: 12px;
  line-height: 1.25rem;
  cursor: pointer;
  padding: 3px 5px;
  margin: 6px 6px 0 0;
  background-color: rgba(0, 0, 0, 0.08);
`;

const Label = styled.label`
  font-size: 11px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: inherit;
  margin: 0 6px;
  padding: 1px;
}
`;

interface NoteLabelProp {
  id: string | undefined;
  labels: string[];
  isInputField?: boolean;
  onRemove?: (label: string) => void;
}

const NoteLabel = ({ labels, id, isInputField, onRemove }: NoteLabelProp) => {
  const [isHover, setIsHover] = useState(false);
  const [hoveredLabel, sethoveredLabel] = useState('');

  const handleHover = (label: string): void => {
    setIsHover(true);
    sethoveredLabel(label);
  };

  const handleLeave = (): void => {
    setIsHover(false);
    sethoveredLabel('');
  };

  const handleRemove = useCallback(
    async (id: string, label: string): Promise<void> => {
      removeLabelFromNote(id, label);
    },
    [],
  );

  const labelList = labels.map((label: string, i: number) => (
    <Container
      key={i}
      onMouseEnter={() => handleHover(label)}
      onMouseLeave={handleLeave}
    >
      <Label>{label}</Label>
      {isHover && label === hoveredLabel && (
        <Tool
          id={id}
          label={label}
          bgImage={deleteIcon}
          title="Remove Label"
          onRemove={onRemove}
          onRemoveNoteLabel={handleRemove}
          isLabel
          isInputField={isInputField}
        />
      )}
    </Container>
  ));
  return <Wrapper>{labelList}</Wrapper>;
};

export default React.memo(NoteLabel);
