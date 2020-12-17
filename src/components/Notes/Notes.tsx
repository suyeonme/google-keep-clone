import React from 'react';

import Note from 'containers/Note/Note';
import NotesLayout from 'components/Notes/NotesLayout/NotesLayout';
import Backdrop from 'components/UI/Backdrop/Backdrop';
import { Note as NoteObj } from 'shared/types';

interface NotesProp {
  notes: NoteObj[];
}

const Notes = ({ notes }: NotesProp) => {
  const isPinned: boolean =
    notes.filter((note: NoteObj) => note.isPinned).length > 0;
  const noteArr = notes.map((note: NoteObj) => (
    <Note key={note.id} note={note} />
  ));

  if (isPinned) {
    const pinnedNotes = notes
      .filter((note: NoteObj) => note.isPinned)
      .map((note: NoteObj) => <Note key={note.id} note={note} />);

    const otherNotes = notes
      .filter((note: NoteObj) => !note.isPinned)
      .map((note: NoteObj) => <Note key={note.id} note={note} />);

    return (
      <>
        <NotesLayout title="pinned" notes={pinnedNotes} />
        <NotesLayout title="Others" notes={otherNotes} />
        <Backdrop />
      </>
    );
  }

  return (
    <>
      <NotesLayout notes={noteArr} />
      <Backdrop />
    </>
  );
};

export default React.memo(Notes);
