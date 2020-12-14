import 'react';
// import { UserObj } from 'App';
import { breakPoints } from 'components/Notes/NotesLayout';

declare module 'react' {
  export interface HTMLAttributes<T> {
    path?: any;
    // userObj?: UserObj | null;
    // ishover?: boolean | string;
    breakpointCols?: breakPoints;
    isEditable?: boolean;
    isNote?: boolean | undefined;
    alt?: string;
  }
}
