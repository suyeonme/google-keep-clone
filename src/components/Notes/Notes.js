import React from 'react';
import PropTypes from 'prop-types';

import Note from 'containers/Note/Note';
import NotesLayout from 'components/Notes/NotesLayout/NotesLayout';
import Backdrop from 'components/UI/Backdrop/Backdrop';

function Notes({ notes, isArchived }) {
  const isPinned = notes.filter((note) => note.isPinned).length > 0;

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
  notes: PropTypes.array,
  isArchived: PropTypes.bool,
};

export default React.memo(Notes);
