import 'react';
import { breakPoints } from 'components/Notes/NotesLayout';

declare module 'react' {
  export interface HTMLAttributes<T> {
    path?: any;
    breakpointCols?: breakPoints;
    isEditable?: boolean;
    isNote?: boolean | undefined;
    isshow?: number;
    alt?: string;
    name?: string;
  }
}
