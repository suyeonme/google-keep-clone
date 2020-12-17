import React, { useState, useCallback } from 'react';

import {
  Wrapper,
  Form,
  Input,
  TextArea,
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
import { Todo, ToggleTool, Note } from 'shared/types';

type UpdateNoteEvent =
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLInputElement>;

const INITIAL_NOTE: Note = {
  title: '',
  content: '',
  bgColor: '#fff',
  isChecked: false,
  isPinned: false,
  isArchived: false,
  labels: [],
};

const InputField = () => {
  const [note, setNote] = useState<Note>(INITIAL_NOTE);
  const { title, content, id, bgColor, isChecked, isPinned, labels } = note;
  const [showLabel, setShowLabel] = useState(false);

  const {
    ref,
    isClickOutside: isExpand,
    handleResetClick,
    setIsClickOutside,
  } = useClickOutside(false);

  const handleResetNote = useCallback((): void => {
    setNote({ ...INITIAL_NOTE });
  }, []);

  const handleUpdateNote = useCallback(
    (e: UpdateNoteEvent): void => {
      const { name, value } = e.target;
      setNote({ ...note, [name]: value });
    },
    [note],
  );

  const handleToggle = useCallback(
    (toolType: ToggleTool): void => {
      setNote({ ...note, [toolType]: !note[toolType] });
    },
    [note],
  );

  const handleChangeColor = useCallback(
    (color: string): void => {
      setNote({ ...note, bgColor: color });
    },
    [note],
  );

  type NoteLabel = string[] | object[];

  const handleAddLabel = useCallback(
    async (label: string): Promise<void> => {
      const newLabels: string[] = labels.concat(label);
      setNote({ ...note, labels: newLabels });
    },
    [labels, note],
  );

  const handleRemoveLabel = useCallback(
    (label: string): void => {
      const newLabels: string[] = labels.filter((l: string) => l !== label);
      setNote({ ...note, labels: newLabels });
    },
    [note, labels],
  );

  const handleAddNote = useCallback(
    async (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      note: Note,
    ): Promise<void> => {
      e.preventDefault();
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
    const todos: Todo[] | undefined = convertNoteToTodo(content);
    textField = <TodoList todoContent={todos} setNote={setNote} isInputField />;
  }

  if (!isChecked) {
    textField = (
      <TextArea
        name="content"
        rows={3}
        placeholder="Take a note..."
        value={content}
        onChange={handleUpdateNote}
      />
    );
  }

  return (
    <Wrapper>
      <Form ref={ref} bgColor={bgColor}>
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
                id={id && id}
                labels={labels}
                onRemove={handleRemoveLabel}
              />
            )}
            <ToolbarContainer>
              <Toolbar
                id={id}
                isInputField
                onHover={true}
                onAddNote={(e) => handleAddNote(e, note)}
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
      </Form>
    </Wrapper>
  );
};

export default React.memo(InputField);
