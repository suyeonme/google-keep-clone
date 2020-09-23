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
  return arr.map((todo) => todo.todoItem).join('\r\n');
};
