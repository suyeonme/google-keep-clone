import React, { useState, useCallback } from 'react';

import {
  InputContainer,
  InputForm,
  Input,
  InputTextArea,
} from 'containers/InputField/InputElements';
import Tool from 'containers/Toolbar/Tool/Tool';
import Toolbar from 'containers/Toolbar/Toolbar';
import { ToolbarContainer } from 'containers/Note/NoteElements';
import Label from 'containers/Label/Label';
import NoteLabel from 'containers/Label/LabelElements/NoteLabel/NoteLabel';
import TodoList from 'components/TodoList/TodoList';
import { convertNoteToTodo } from 'shared/utility';
import { addNoteToStore } from 'shared/firebase';
import { useClickOutside } from 'hooks/useClickOutside';

const INITIAL_NOTE = {
  title: '',
  content: '',
  bgColor: '#fff',
  isChecked: false,
  isPinned: false,
  isArchived: false,
  labels: [],
};

function InputField() {
  const [note, setNote] = useState(INITIAL_NOTE);
  const { title, content, id, bgColor, isChecked, isPinned, labels } = note;
  const [showLabel, setShowLabel] = useState(false);

  const {
    ref,
    isClickOutside: isExpand,
    handleResetClick,
    setIsClickOutside,
  } = useClickOutside(false);

  const handleResetNote = useCallback(() => {
    setNote({ ...INITIAL_NOTE });
  }, []);

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

  const handleChangeColor = useCallback(
    (color) => {
      setNote({ ...note, bgColor: color });
    },
    [note],
  );

  const handleAddLabel = useCallback(
    async (label) => {
      const newLabel = labels.concat(label);
      setNote({ ...note, labels: newLabel });
    },
    [labels, note],
  );

  const handleRemoveLabel = useCallback(
    (label) => {
      const newLabels = labels.filter((l) => l !== label);
      setNote({ ...note, labels: newLabels });
    },
    [note, labels],
  );

  const handleAddNote = useCallback(
    async (note) => {
      if (title !== '' && content !== '') {
        handleResetNote();
        setShowLabel(false);
        handleResetClick();
        addNoteToStore(note);
      }
    },
    [title, content, handleResetNote, handleResetClick],
  );

  // TEXT FIELD
  let textField;
  if (isChecked) {
    const todos = convertNoteToTodo(content);
    textField = <TodoList todoContent={todos} setNote={setNote} isInputField />;
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
      <InputForm ref={ref} bgColor={bgColor} onSubmit={handleAddNote}>
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
          <div>
            {textField}
            {labels.length > 0 && (
              <NoteLabel
                isInputField
                id={id}
                labels={labels}
                onRemove={handleRemoveLabel}
              />
            )}
            <ToolbarContainer>
              <Toolbar
                id={id}
                isInputField
                onHover={true}
                onAddNote={() => handleAddNote(note)}
                onToggle={handleToggle}
                onClick={handleChangeColor}
                setShowLabel={setShowLabel}
              />
              {showLabel && (
                <Label
                  note={note}
                  isInputField
                  addLabelToInputField={handleAddLabel}
                  setShowLabel={setShowLabel}
                  onRemove={handleRemoveLabel}
                  onExpand={setIsClickOutside}
                />
              )}
            </ToolbarContainer>
          </div>
        )}
      </InputForm>
    </InputContainer>
  );
}

export default React.memo(InputField);
