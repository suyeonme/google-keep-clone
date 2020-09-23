import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dbService } from 'fbase';
// import PropTypes from 'prop-types';

import { initNotes, initLabels } from 'store/actions/notes';
import Note from 'containers/Note/Note';
import NotesLayout from 'components/Notes/NotesLayout/NotesLayout';
import Backdrop from 'components/UI/Backdrop/Backdrop';

// Remove isArchived props
function Notes({ isArchived }) {
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();
  const isPinned = notes.filter((note) => note.isPinned).length > 0;

  // Too many rendering
  useEffect(() => {
    dbService.collection('notes').onSnapshot((snapshot) => {
      const noteArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch(initNotes(noteArr));
    });
  }, [dispatch]);

  useEffect(() => {
    dbService.collection('labels').onSnapshot((snapshot) => {
      const labelArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(initLabels(labelArr));
    });
  }, [dispatch]);

  if (isPinned) {
    const pinnedNotes = notes
      .filter((note) => note.isPinned)
      .map((note) => (
        <Note key={note.id} note={note} isArchived={isArchived} />
      ));

    const otherNotes = notes
      .filter((note) => !note.isPinned)
      .map((note) => (
        <Note key={note.id} note={note} isArchived={isArchived} />
      ));

    return (
      <>
        <NotesLayout title="pinned" notes={pinnedNotes} />
        <NotesLayout title="Others" notes={otherNotes} />
        <Backdrop />
      </>
    );
  }

  const noteArr = notes.map((note) => (
    <Note key={note.id} note={note} isArchived={isArchived} />
  ));

  return (
    <>
      <NotesLayout notes={noteArr} />
      <Backdrop />
    </>
  );
}

Notes.propTypes = {
  // isArchived: PropTypes.bool,
};

export default React.memo(Notes);
