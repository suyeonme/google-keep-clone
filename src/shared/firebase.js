import { dbService } from 'fbase';
import * as firebase from 'firebase';

export const addLabelToStore = async (label) => {
  await dbService.collection('labels').add({ name: label });
};

export const addLabelToNote = async (id, label, type) => {
  await dbService.doc(`${type}/${id}`).update({
    labels: firebase.firestore.FieldValue.arrayUnion(label),
  });
};

export const removeLabelFromNote = async (id, label, type) => {
  await dbService.doc(`${type}/${id}`).update({
    labels: firebase.firestore.FieldValue.arrayRemove(label),
  });
};

export const removeLabelFromStore = async (id) => {
  await dbService.doc(`labels/${id}`).delete();
  // Remove label from all notes and archives having the label
};

export const editLabelFromStore = async (id, label) => {
  await dbService.doc(`labels/${id}`).update({ name: label });
  // Edit label from all notes and archives having the label
};

export const addNoteToStore = async (note) => {
  await dbService.collection('notes').add(note);
};

export const removeNoteFromStore = async (id, type) => {
  await dbService.doc(`${type}/${id}`).delete();
};

export const editNote = async (id, name, value, type) => {
  await dbService.doc(`${type}/${id}`).update({ [name]: value });
};

export const toggleNotePin = async (id, isPinned, type) => {
  await dbService.doc(`${type}/${id}`).update({ isPinned: isPinned });
};

export const toggleNoteTodo = async (id, isChecked, type) => {
  await dbService.doc(`${type}/${id}`).update({ isChecked: isChecked });
};

export const changeColor = async (color, id, type) => {
  await dbService.doc(`${type}/${id}`).update({ bgColor: color });
};

export const changeNoteToArchives = async (id, note) => {
  await dbService.doc(`notes/${id}`).delete();
  delete note.id;
  await dbService.collection('archives').add(note);
};

export const changeArchivesToNotes = async (id, note) => {
  await dbService.doc(`archives/${id}`).delete();
  delete note.id;
  await dbService.collection('notes').add(note);
};
