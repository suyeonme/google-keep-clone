import React from 'react';
import { Note } from './types';
import { Todo } from 'shared/types';

export const updateObject = (oldState: any, updatedState: any): any => {
  return {
    ...oldState,
    ...updatedState,
  };
};

export const updateAllLabels = (
  arr: Note[],
  oldLabel: string,
  newLabel: string,
): Note[] => {
  return arr.map((note: Note) =>
    note.labels.includes(oldLabel)
      ? {
          ...note,
          labels: note.labels.filter((l) => l !== oldLabel).concat(newLabel),
        }
      : note,
  );
};

export const convertNoteToTodo = (content: string): Todo[] | undefined => {
  if (content !== '') {
    return content
      .split(/\n/g)
      .reduce((todos: Todo[], todo: string, i: number) => {
        return [
          ...todos,
          {
            id: i,
            todoItem: todo,
            isDone: false,
          },
        ];
      }, []);
  }
};

export const convertTodoToNote = (
  todos: Todo[] | undefined,
): string | undefined => {
  if (todos) {
    return todos
      .map((todo) => {
        return todo.todoItem.replace(/^\s+|\s+$/g, '');
      })
      .join('\r\n');
  }
};

export const searchNote = (query: string, notes: Note[]): Note[] => {
  const rgxp = new RegExp(query, 'gi');

  const searchedNotes = notes.filter((note) => {
    if (query !== '' && (note.title.match(rgxp) || note.content.match(rgxp))) {
      return note;
    }
    return null;
  });

  return searchedNotes;
};

export const highlightText = (text: string, query: string) => {
  if (query !== '') {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));

    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={index}>{part}</mark>
          ) : (
            part
          ),
        )}
      </>
    );
  }
  return text;
};

export const capitalizeFirstLetter = (letter: string) => {
  return letter.charAt(0).toUpperCase() + letter.slice(1);
};
