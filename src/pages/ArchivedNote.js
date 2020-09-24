import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { dbService } from 'fbase';

import { initArchives } from 'store/actions/notes';
import Archive from 'icons/archive.svg';
import Notes from 'components/Notes/Notes';

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

  @media (max-width: 576px) {
    width: calc(100% - 60px);
    margin-left: auto;
  }
`;

function ArchivedNote() {
  const archives = useSelector((state) => state.notes.archives);
  const dispatch = useDispatch();

  useEffect(() => {
    dbService.collection('archives').onSnapshot((snapshot) => {
      const noteArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch(initArchives(noteArr));
    });
  }, [dispatch]);

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
