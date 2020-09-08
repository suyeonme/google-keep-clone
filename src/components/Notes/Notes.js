import React from 'react';

import Note from '../../containers/Note/Note';
import NotesLayout from './NotesLayout/NotesLayout';

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
      </>
    );
  }

  notes = notes.map((note) => (
    <Note key={note.id} note={note} isArchived={isArchived} />
  ));

  return <NotesLayout notes={notes} />;
}

export default Notes;
