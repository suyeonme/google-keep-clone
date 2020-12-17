import { Note, LabelObj } from 'shared/types';

// Action types
export const INIT_NOTES = 'INIT_NOTES';
export const INIT_LABELS = 'INIT_LABELS';
export const ADD_LABEL = 'ADD_LABEL';
export const REMOVE_LABEL = 'REMOVE_LABEL';
export const RENAME_LABEL = 'RENAME_LABEL';
export const GET_EDITABLE_NOTE = 'GET_EDITABLE_NOTE';
export const CLEAR_EDITABLE_NOTE = 'CLEAR_EDITABLE_NOTE';

// Types
export interface NotesState {
  notes: Note[];
  labels: LabelObj[];
  editableNote: null | Note;
}

export interface InitNotes {
  type: typeof INIT_NOTES;
  payload: Note[];
}

export interface InitLabels {
  type: typeof INIT_LABELS;
  payload: LabelObj[] | any[];
}

export interface GetEditableNote {
  type: typeof GET_EDITABLE_NOTE;
  payload: Note;
}

export interface ClearEditableNote {
  type: typeof CLEAR_EDITABLE_NOTE;
}

export interface RemoveLabel {
  type: typeof REMOVE_LABEL;
  payload: string;
}

export interface RenameLabel {
  type: typeof RENAME_LABEL;
  oldLabel: string;
  newLabel: string;
}

export type NotesTypes =
  | InitNotes
  | InitLabels
  | GetEditableNote
  | ClearEditableNote
  | RemoveLabel
  | RenameLabel;

// Action Creators
export const initNotes = (notes: Note[]): InitNotes => {
  return {
    type: INIT_NOTES,
    payload: notes,
  };
};

export const initLabels = (labels: LabelObj[]): InitLabels => {
  return {
    type: INIT_LABELS,
    payload: labels,
  };
};

export const getEditableNote = (note: Note): GetEditableNote => {
  return {
    type: GET_EDITABLE_NOTE,
    payload: note,
  };
};

export const clearEditableNote = (): ClearEditableNote => {
  return {
    type: CLEAR_EDITABLE_NOTE,
  };
};

export const removeLabel = (label: LabelObj) => {
  return {
    type: REMOVE_LABEL,
    payload: label,
  };
};

export const renameLabel = (
  oldLabel: string,
  newLabel: string,
): RenameLabel => {
  return {
    type: RENAME_LABEL,
    oldLabel: oldLabel,
    newLabel: newLabel,
  };
};
