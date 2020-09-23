import { dbService } from 'fbase';
import * as firebase from 'firebase';

export const addLabelToStore = async (label) => {
  await dbService.collection('labels').add({ name: label });
};

export const addLabelToNote = async (id, label) => {
  await dbService.doc(`notes/${id}`).update({
    labels: firebase.firestore.FieldValue.arrayUnion(label),
  });
};

export const removeLabelFromNote = async (id, label) => {
  // setNewNote
  await dbService.doc(`notes/${id}`).update({
    labels: firebase.firestore.FieldValue.arrayRemove(label),
  });
};

export const removeLabelFromStore = async (id, label) => {
  await dbService.doc(`notes/${id}`).update({
    labels: firebase.firestore.FieldValue.arrayRemove(label),
  });
};

export const editLabelFromStore = async (id, label) => {
  // Edit global label
  await dbService.doc(`labels/${id}`).update({ name: label });
  // Edit store labels
  dbService.collection('notes').where('labels', '==', label);
  // Edit labels of note (if having)
};

export const addNoteToStore = async (note) => {
  await dbService.collection('notes').add(note);
};

export const removeNoteFromStore = async (id) => {};

export const toggleNotePin = async (id, isPinned) => {
  await dbService.doc(`notes/${id}`).update({ isPinned: isPinned });
};

export const toggleNoteTodo = async (id, isChecked) => {
  await dbService.doc(`notes/${id}`).update({ isChecked: isChecked });
};
