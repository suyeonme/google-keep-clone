import { dbService } from 'fbase';
import firebase from 'firebase/app';
import { Note } from './types';

export const addLabelToStore = async (label: string): Promise<void> => {
  await dbService.collection('labels').add({ name: label });
};

export const addLabelToNote = async (
  id: string,
  label: string,
): Promise<void> => {
  await dbService.doc(`notes/${id}`).update({
    labels: firebase.firestore.FieldValue.arrayUnion(label),
  });
};

export const removeLabelFromNote = async (
  id: string,
  label: string,
): Promise<void> => {
  await dbService.doc(`notes/${id}`).update({
    labels: firebase.firestore.FieldValue.arrayRemove(label),
  });
};

export const removeLabelFromStore = async (id: string): Promise<void> => {
  await dbService.doc(`labels/${id}`).delete();
  // Remove label from all notes and archives having the label
};

export const editLabelFromStore = async (
  id: string,
  label: string,
): Promise<void> => {
  await dbService.doc(`labels/${id}`).update({ name: label });
  // Edit label from all notes and archives having the label
};

export const addNoteToStore = async (note: Note): Promise<void> => {
  await dbService.collection('notes').add(note);
};

export const removeNoteFromStore = async (id: string): Promise<void> => {
  await dbService.doc(`notes/${id}`).delete();
};

export const editNote = async (
  id: string,
  name: string,
  value: string,
): Promise<void> => {
  await dbService.doc(`notes/${id}`).update({ [name]: value });
};

export const toggleNotePin = async (
  id: string,
  isPinned: boolean,
): Promise<void> => {
  await dbService.doc(`notes/${id}`).update({ isPinned: isPinned });
};

export const toggleNoteTodo = async (
  id: string,
  isChecked: boolean,
): Promise<void> => {
  await dbService.doc(`notes/${id}`).update({ isChecked: isChecked });
};

export const changeColor = async (color: string, id: string): Promise<void> => {
  await dbService.doc(`notes/${id}`).update({ bgColor: color });
};

export const changeNoteToArchives = async (id: string): Promise<void> => {
  await dbService.doc(`notes/${id}`).update({ isArchived: true });
};

export const changeArchivesToNotes = async (id: string): Promise<void> => {
  await dbService.doc(`notes/${id}`).update({ isArchived: false });
};

// import { dbService } from 'fbase';
// import firebase from 'firebase/app';

// export const addLabelToStore = async (label) => {
//   await dbService.collection('labels').add({ name: label });
// };

// export const addLabelToNote = async (id, label) => {
//   await dbService.doc(`notes/${id}`).update({
//     labels: firebase.firestore.FieldValue.arrayUnion(label),
//   });
// };

// export const removeLabelFromNote = async (id, label) => {
//   await dbService.doc(`notes/${id}`).update({
//     labels: firebase.firestore.FieldValue.arrayRemove(label),
//   });
// };

// export const removeLabelFromStore = async (id) => {
//   await dbService.doc(`labels/${id}`).delete();
//   // Remove label from all notes and archives having the label
// };

// export const editLabelFromStore = async (id, label) => {
//   await dbService.doc(`labels/${id}`).update({ name: label });
//   // Edit label from all notes and archives having the label
// };

// export const addNoteToStore = async (note) => {
//   await dbService.collection('notes').add(note);
// };

// export const removeNoteFromStore = async (id) => {
//   await dbService.doc(`notes/${id}`).delete();
// };

// export const editNote = async (id, name, value) => {
//   await dbService.doc(`notes/${id}`).update({ [name]: value });
// };

// export const toggleNotePin = async (id, isPinned) => {
//   await dbService.doc(`notes/${id}`).update({ isPinned: isPinned });
// };

// export const toggleNoteTodo = async (id, isChecked) => {
//   await dbService.doc(`notes/${id}`).update({ isChecked: isChecked });
// };

// export const changeColor = async (color, id) => {
//   await dbService.doc(`notes/${id}`).update({ bgColor: color });
// };

// export const changeNoteToArchives = async (id) => {
//   await dbService.doc(`notes/${id}`).update({ isArchived: true });
// };

// export const changeArchivesToNotes = async (id) => {
//   await dbService.doc(`notes/${id}`).update({ isArchived: false });
// };
