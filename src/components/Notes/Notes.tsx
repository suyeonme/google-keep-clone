import React from 'react';

import Note from 'containers/Note/Note';
import NotesLayout from 'components/Notes/NotesLayout/NotesLayout';
import Backdrop from 'components/UI/Backdrop/Backdrop';

interface NotesProp {
  notes: Note[];
}

export interface Note {
  id: string | undefined;
  title: string;
  isChecked: boolean;
  isPinned: boolean;
  isArchived: boolean;
  bgColor: string;
  content: string;
}

const Notes = ({ notes }: NotesProp) => {
  const isPinned = notes.filter((note: Note) => note.isPinned).length > 0;
  const noteArr = notes.map((note: Note) => <Note key={note.id} note={note} />);

  if (isPinned) {
    const pinnedNotes = notes
      .filter((note: Note) => note.isPinned)
      .map((note: Note) => <Note key={note.id} note={note} />);

    const otherNotes = notes
      .filter((note: Note) => !note.isPinned)
      .map((note: Note) => <Note key={note.id} note={note} />);

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
