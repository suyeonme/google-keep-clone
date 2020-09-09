import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Archive from '../icons/archive.svg';
import Notes from '../components/Notes/Notes';

const ArchiveIcon = styled.div`
  width: 95px;
  height: 95px;
  opacity: .2;
  background: url(${Archive})} no-repeat center center;
  background-size: cover;
  margin: 20px;
`;

const Text = styled.p`
  color: #80868b;
  font-size: 2.3rem;
  line-height: 1.75rem;
`;

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function ArchivedNote() {
  const archives = useSelector((state) => state.notes.archives);

  if (archives.length === 0) {
    return (
      <Container>
        <ArchiveIcon />
        <Text>Your archived notes appear here</Text>
      </Container>
    );
  }

  if (archives.length > 0) {
    return <Notes notes={archives} isArchived />;
  }
}

export default React.memo(ArchivedNote);
