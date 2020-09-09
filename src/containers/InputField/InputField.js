import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import uniqid from 'uniqid';

import {
  InputContainer,
  InputForm,
  Input,
  InputTextArea,
} from './InputElements';
import Tool from '../../components/Toolbar/Tool';
import Toolbar from '../../components/Toolbar/Toolbar';
import TodoList from '../../components/TodoList/TodoList';
import { convertNoteToTodo, convertTodoToNote } from '../../shared/utility';
import { useClickOutside } from '../../hooks/useClickOutside';
import { addNote } from '../../store/actions/notes';

// TODO
// todoList: Back to original when click outside of form

const initialNote = {
  title: '',
  content: '',
  id: uniqid(),
  bgColor: '#fff',
  isChecked: false,
  isPinned: false,
};

function InputField() {
  const [note, setNote] = useState(initialNote);
  const { title, content, id, bgColor, isChecked, isPinned } = note;

  const dispatch = useDispatch();
  const { ref, isClickOutside: isExpand, handleResetClick } = useClickOutside(
    false,
  );

  const handleResetNote = useCallback(() => {
    setNote({ ...initialNote, id: uniqid() });
  }, []);

  const handleAddNote = useCallback(
    (note) => {
      if (title !== '' && content !== '') {
        dispatch(addNote(note));
        handleResetNote();
        handleResetClick();
      }
    },
    [title, content, dispatch, handleResetNote, handleResetClick],
  );

  const handleUpdateNote = useCallback(
    (e) => {
      const { name, value } = e.target;
      setNote({ ...note, [name]: value });
    },
    [note],
  );

  const handleToggle = useCallback(
    (toolType) => {
      setNote({ ...note, [toolType]: !note[toolType] });
    },
    [note],
  );

  const handleChangeColor = (color) => {
    setNote({ ...note, bgColor: color });
  };

  const handleAddTodo = useCallback(
    (newTodo) => {
      const newTodoItem = convertTodoToNote(newTodo);
      setNote({ ...note, content: newTodoItem });
    },
    [note],
  );

  // TEXT FIELD
  let textField;
  if (isChecked) {
    const todos = convertNoteToTodo(content);

    textField = (
      <TodoList todoContent={todos} onSaveNote={handleAddTodo} isInputField />
    );
  }

  if (!isChecked) {
    textField = (
      <InputTextArea
        name="content"
        rows="3"
        placeholder="Take a note..."
        value={content}
        onChange={handleUpdateNote}
      />
    );
  }

  return (
    <InputContainer>
      <InputForm ref={ref} bgColor={bgColor}>
        <Input
          name="title"
          value={title}
          placeholder="Title"
          autoComplete="off"
          onChange={handleUpdateNote}
        />
        <Tool
          inputPin
          isInputField
          title="Pin Note"
          isPinned={isPinned}
          onToggle={handleToggle}
        />
        {isExpand && (
          <>
            {textField}
            <Toolbar
              id={id}
              isInputField
              onHover={true}
              onAddNote={() => handleAddNote(note)}
              onToggle={handleToggle}
              onClick={handleChangeColor}
            />
          </>
        )}
      </InputForm>
    </InputContainer>
  );
}

export default React.memo(InputField);
