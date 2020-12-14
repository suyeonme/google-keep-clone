import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { dbService } from 'fbase';

import Archive from 'icons/archive.svg';
import Notes from 'components/Notes/Notes';
import { searchNote } from 'shared/utility';
import NoMatching from 'components/UI/NoMatching/NoMatching';

const ArchiveIcon = styled.div`
  width: 95px;
  height: 95px;
  opacity: .2;
  background: url(${Archive})} no-repeat center center;
  background-size: cover;
  margin: 20px;

  @media (max-width: 576px) {
    width: 80px;
    height: 80px;
  }
  @media (max-width: 320px) {
    width: 70px;
    height: 70px;
  }
`;

const Text = styled.p`
  display: inline-block;
  font-size: 2.3rem;
  line-height: 1.3;
  color: #80868b;

  @media (max-width: 576px) {
    font-size: 2rem;
    width: 90%;
  }
  @media (max-width: 576px) and (orientation: landscape) {
    text-align: center;
  }
  @media (max-width: 320px) {
    font-size: 1.7rem;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
  z-index: -1;

  @media (max-width: 576px) {
    width: calc(100% - 60px);
    margin-left: auto;
  }
`;

function ArchivedNote() {
  const [archives, setArchives] = useState([]);
  const query = useSelector((state) => state.view.searchQuery);
  const searchedNotes = searchNote(query, archives);

  useEffect(() => {
    const subscribe = dbService.collection('notes').onSnapshot((snapshot) => {
      const archivedNotes = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((note) => note.isArchived === true);

      setArchives(archivedNotes);
    });

    return () => subscribe();
  }, []);

  if (archives.length === 0) {
    return (
      <Container>
        <ArchiveIcon />
        <Text>Your archived notes appear here</Text>
      </Container>
    );
  }

  if (query !== '' && searchedNotes.length > 0) {
    return <Notes notes={searchedNotes} />;
  }

  if (query !== '' && searchedNotes.length === 0) {
    return <NoMatching text="No matching results." />;
  }

  return <Notes notes={archives} />;
}

export default ArchivedNote;
