import { Dispatch, SetStateAction } from 'react';

export type Dispatcher<S> = Dispatch<SetStateAction<S>>;
export type TodoItemID = string | number;
export type ToggleTool = 'isChecked' | 'isPinned' | 'isArchived';

export interface Note {
  id?: string;
  title: string;
  isChecked: boolean;
  isPinned: boolean;
  isArchived: boolean;
  bgColor: string;
  content: string;
  labels: string[];
}

export interface Todo {
  id: TodoItemID;
  todoItem: string;
  isDone: boolean;
}

export interface LabelObj {
  id: string;
  name: string;
}
