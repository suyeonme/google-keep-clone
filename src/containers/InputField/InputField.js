import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import uniqid from 'uniqid';

import {
  InputContainer,
  InputForm,
  Input,
  InputTextArea,
} from './InputElements';
import Tool from '../../containers/Toolbar/Tool/Tool';
import Toolbar from '../../containers/Toolbar/Toolbar';
import TodoList from '../../components/TodoList/TodoList';
import Label from '../../containers/Label/Label';

import NoteLabel from '../../containers/Label/LabelElements/NoteLabel/NoteLabel';
import { convertNoteToTodo, convertTodoToNote } from '../../shared/utility';
import { useClickOutside } from '../../hooks/useClickOutside';
import { addNote } from '../../store/actions/notes';

const initialNote = {
  title: '',
  content: '',
  id: uniqid(),
  bgColor: '#fff',
  isChecked: false,
  isPinned: false,
  labels: [],
};

function InputField() {
  const [note, setNote] = useState(initialNote);
  const { title, content, id, bgColor, isChecked, isPinned, labels } = note;
  const [showLabel, setShowLabel] = useState(false);

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
        setShowLabel(false);
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

  const handleAddLabel = useCallback(
    (label) => {
      const isExisted = labels.includes(label);
      const newLabel = labels.concat(label);
      !isExisted && setNote({ ...note, labels: newLabel });
    },
    [note, labels],
  );

  const handleRemoveLabel = useCallback(
    (label) => {
      const newLabels = labels.filter((l) => l !== label);
      setNote({ ...note, labels: newLabels });
    },
    [note, labels],
  );

  // const handleToggleLabel = useCallback(
  //   (label) => {
  //     const isExisted = labels.includes(label);
  //     isExisted ? handleRemoveLabel(label) : handleAddLabel(label);
  //   },
  //   [handleAddLabel, handleRemoveLabel, labels],
  // );

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
          isPinned={isPinned}
          title="Pin Note"
          onToggle={handleToggle}
        />
        {isExpand && (
          <>
            {textField}
            {labels.length > 0 && (
              <NoteLabel
                id={id}
                labels={labels}
                onRemove={handleRemoveLabel}
                isInputField
              />
            )}
            <Toolbar
              id={id}
              isInputField
              onHover={true}
              onAddNote={() => handleAddNote(note)}
              onToggle={handleToggle}
              onClick={handleChangeColor}
              setShowLabel={setShowLabel}
            />
          </>
        )}
        {showLabel && <Label id={id} isInputField setNote={handleAddLabel} />}
      </InputForm>
    </InputContainer>
  );
}

export default React.memo(InputField);
