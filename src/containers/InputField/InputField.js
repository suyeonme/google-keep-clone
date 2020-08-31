import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';

import {
  InputContainer,
  InputForm,
  Input,
  InputTextArea,
} from './InputElements';
import PinIcon from '../../icons/pin.svg';
import Tool from '../../components/Toolbar/Tool';
import Toolbar from '../../components/Toolbar/Toolbar';
import TodoList from '../../components/TodoList/TodoList';
import { convertNoteToTodo } from '../../shared/utility';
import { useClickOutside } from '../../hooks/useClickOutside';
import { addNote, getNoteColor } from '../../store/actions/notes';

// TODO
// todoList: Back to original when click outside of form

const initialNote = {
  title: '',
  content: '',
  id: uniqid(),
  bgColor: '#fff',
  isChecked: false,
};

function InputField(props) {
  const [note, setNote] = useState({
    title: '',
    content: '',
    id: uniqid(),
    bgColor: '#fff',
    isChecked: false,
  });
  const { title, content, id, bgColor, isChecked } = note;

  const selectedBgColor = useSelector((state) => state.bgColor);
  const dispatch = useDispatch();
  const { ref, isClickOutside: isExpand, handleResetClick } = useClickOutside(
    false,
  );

  useEffect(() => {
    setNote((prevNote) => ({ ...prevNote, bgColor: selectedBgColor }));
  }, [selectedBgColor]);

  const handleUpdateNote = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const handleResetNote = () => {
    if (bgColor !== '#fff') dispatch(getNoteColor('#fff'));

    setNote({
      title: '',
      content: '',
      id: uniqid(),
      bgColor: '#fff',
      isChecked: false,
    });
  };

  const handleAddNote = (note) => {
    if (title !== '' && content !== '') {
      dispatch(addNote(note));
      handleResetNote();
      handleResetClick();
    }
  };

  const handleCheck = () => {
    setNote({ ...note, isChecked: !note.isChecked });
  };

  // Here
  const handleAddTodo = (e) => {
    //const name = e.target.id;
    const value = e.currentTarget.innerHTML;
    console.log(value);
    //setNote({ ...note, [name]: value });
    setNote({ ...note, content: value });
  };
  console.log(note);

  // TEXT FIELD
  let textField;
  if (isChecked) {
    const todos = convertNoteToTodo(content);
    textField = <TodoList todoContent={todos} addTodo={handleAddTodo} />;
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
        <Tool title="Pin Note" bgImage={PinIcon} pin />
        {isExpand && (
          <>
            {textField}
            <Toolbar
              id={id}
              isInputField
              onHover={true}
              onAddNote={() => handleAddNote(note)}
              onCheck={handleCheck}
            />
          </>
        )}
      </InputForm>
    </InputContainer>
  );
}

export default InputField;
