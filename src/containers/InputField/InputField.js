import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';

import { InputContainer, InputForm, Input } from './InputElements';
import TextArea from './TextArea/TextArea';
import CheckboxIcon from '../../icons/checkbox.svg';
import PinIcon from '../../icons/pin.svg';
import Tool from '../../components/Toolbar/Tool';
import Toolbar from '../../components/Toolbar/Toolbar';
import { useClickOutside } from '../../hooks/useClickOutside';
import { addNote, getNoteColor } from '../../store/actions/notes';

// TODO
// Add an array
// Back to original when click outside of form
// Note is one div

function InputField(props) {
  const [note, setNote] = useState({
    title: '',
    content: '',
    id: uniqid(),
    bgColor: '#fff',
    isChecked: false, // NOTE
  });
  const { title, content, id, bgColor, isChecked } = note;

  const dispatch = useDispatch();
  const selectedBgColor = useSelector((state) => state.bgColor);
  const { ref, isOpen, handleResetClick } = useClickOutside(false);

  useEffect(() => {
    setNote((prevNote) => ({ ...prevNote, bgColor: selectedBgColor }));
  }, [selectedBgColor]);

  const handleUpdateNote = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const handleResetNote = () => {
    if (bgColor !== '#fff') {
      dispatch(getNoteColor('#fff'));
    }

    setNote({
      title: '',
      content: '',
      id: uniqid(),
      bgColor: '#fff',
      isChecked: false, // NOTE
    });
  };

  const handleAddNote = (note) => {
    if (title !== '' && content !== '') {
      dispatch(addNote(note));
      handleResetNote();
      handleResetClick();
    }
  };

  const handleClickCheckbox = (e) => {
    // NOTE
    e.preventDefault();
    setNote({ ...note, isChecked: !isChecked });
  };

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

        {!isOpen ? (
          <Tool
            title="New List"
            aria-label="New List"
            bgImage={CheckboxIcon}
            isInputField
            clicked={handleClickCheckbox} // NOTE
          />
        ) : (
          <Tool
            title="Pin Note"
            aria-label="Pin Note"
            bgImage={PinIcon}
            isInputField
          />
        )}
        <TextArea
          isOpen={isOpen}
          isChecked={isChecked}
          value={content}
          onChange={handleUpdateNote}
        />
        {isOpen && (
          <Toolbar
            id={id}
            onHover={true}
            clicked={() => handleAddNote(note)}
            isInputField
          />
        )}
      </InputForm>
    </InputContainer>
  );
}

export default InputField;

/* function InputField(props) {
    const selectedBgColor = useSelector(state => state.bgColor); 
    const [note, setNote] = useState({
        title: '',
        content: '',
        id: uniqid(), 
        bgColor: '#fff',
        isChecked: false // NOTE
    });
    const { title, content, id, bgColor, isChecked } = note; 

    useEffect(() => {
        setNote(prevNote => ({ ...prevNote, bgColor: selectedBgColor }));
    }, [selectedBgColor]);

    const dispatch = useDispatch();
    const { ref, isClickedOutside, handleResetClick } = useClickOutside(false);

    const handleUpdateNote = e => {
        const {name, value} = e.target;
        setNote({...note, [name]: value }); 
    };

    const handleResetNote = () => {
        if (bgColor !== '#fff') {
            dispatch(getNoteColor('#fff'));
        }
        
        setNote({
            title: '',
            content: '',
            id: uniqid(), 
            bgColor: '#fff',
            isChecked: false // NOTE
        });
    };

    const handleAddNote = note => {
        if (title !== '' && content !== '') {
            dispatch(addNote(note)); 
            handleResetNote();
            handleResetClick();
        };
    };

    // NOTE
    const handleClickCheckbox = e => {
        e.preventDefault();
        setNote({ ...note, isChecked: !note.isChecked });
    };

    // TODO 
    // Add an array
    // Create new checkList component
    // Add contenteditable div
    // Add border and plus icon on focus div
    // Change plus icon to checkbox onChange
    // Create new row onChange
    // Back to original when click outside of form
    // Note is one div      

    return(
        <InputContainer>
            <InputForm 
            ref={ref}
            bgColor={bgColor}>
                <Input 
                name="title" 
                value={title}
                placeholder="Title" 
                autoComplete="off"
                onChange={handleUpdateNote}
                />

                { !isClickedOutside ?
                    <Tool
                    title="New List"
                    aria-label="New List"
                    bgImage={CheckboxIcon}
                    isInputField 
                    clicked={handleClickCheckbox} // NOTE
                    />
                    :
                    <Tool
                    title="Pin Note"
                    aria-label="Pin Note"
                    bgImage={PinIcon}
                    isInputField 
                    />
                }

                { isClickedOutside && <InputTextArea 
                    name="content" 
                    value={content} 
                    placeholder={isChecked ? 'List Item' : 'Take a note...'}
                    rows="2" 
                    onChange={handleUpdateNote}
                    isChecked={isChecked} // NOTE
                    />
                }
                { isClickedOutside && 
                    <Toolbar 
                    id={id}
                    onHover={true}
                    clicked={() => handleAddNote(note)}
                    isInputField
                    /> 
                }
            </InputForm>
        </InputContainer>
    );
}

export default InputField; */
