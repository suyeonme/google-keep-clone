export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const convertNoteToTodo = (str) => {
  if (str) {
    return str.split(/\n/g).reduce((todos, todo, i) => {
      return [...todos, {
        id: i,
        todoItem: todo,
        isDone: false
      }];
    }, []);
  }
};

export const convertTodoToNote = (arr) => {
  return arr.map((todo) => todo.todoItem).join('\r\n');
};