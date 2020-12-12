import React from 'react';

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const updateAllLabels = (arr, oldLabel, newLabel) => {
  return arr.map((note) =>
    note.labels.includes(oldLabel)
      ? {
          ...note,
          labels: note.labels.filter((l) => l !== oldLabel).concat(newLabel),
        }
      : note,
  );
};

export const convertNoteToTodo = (str) => {
  if (str) {
    return str.split(/\n/g).reduce((todos, todo, i) => {
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

export const convertTodoToNote = (arr) => {
  return arr
    .map((todo) => {
      return todo.todoItem.replace(/^\s+|\s+$/g, '');
    })
    .join('\r\n');
};

export const searchNote = (query, notes) => {
  const rgxp = new RegExp(query, 'gi');

  const searchedNotes = notes.filter((note) => {
    if (query !== '' && (note.title.match(rgxp) || note.content.match(rgxp))) {
      return note;
    }
    return null;
  });

  return searchedNotes;
};

export const highlightText = (text, query) => {
  if (query !== '' && text.includes(query)) {
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
