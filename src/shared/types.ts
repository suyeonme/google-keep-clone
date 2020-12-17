import { Dispatch, SetStateAction } from 'react';

export type Dispatcher<S> = Dispatch<SetStateAction<S>>;

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
