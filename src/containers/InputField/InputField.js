import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import styled from 'styled-components';

import { addNote, getNoteColor } from '../../store/actions/notes';
import { InputForm, InputTextArea, Input } from './InputElements';
import CheckboxIcon from '../../icons/checkbox.svg';  
import Tool from '../../components/Toolbar/Tool';
import Toolbar from '../../components/Toolbar/Toolbar';
import { useClickOutside } from '../../shared/utility';

// STYLE
const InputContainer = styled.div`
    width: 100%;
`;

const initialNote = {
    title: '',
    content: '',
    id: uniqid(), 
    bgColor: '#fff' 
};  

const InputField = props => {
    const selectedBgColor = useSelector(state => state.bgColor); 
    const [note, setNote] = useState(initialNote);  

    // Update bgColor of note whenever selected bgColor is changed
    useEffect(() => {
        setNote(prevNote => ({ ...prevNote, bgColor: selectedBgColor }));
        // FIXME When chaing color on note, inputField note's color is also changed. 
    }, [selectedBgColor]);

    const dispatch = useDispatch();
    const { ref, isClickedOutside, setIsClickedOutside } = useClickOutside(false);

    const handleUpdateNote = e => {
        const {name, value} = e.target;
        setNote({...note, [name]: value }); 
    };

    const handleAddNote = note => {
        if(note.title !== '' && note.content !== '') {
            dispatch(addNote(note)); 
            handleResetNote();
        };
    };

    const handleResetNote = () => {
        dispatch(getNoteColor('#fff'));
        setIsClickedOutside(false);
        setNote({ ...initialNote, id: uniqid() });
    };

    return(
        <InputContainer>
            <InputForm 
            ref={ref}
            bgColor={note.bgColor}>
                <Input 
                name="title" 
                value={note.title}
                placeholder="Title" 
                autoComplete="off"
                onChange={handleUpdateNote}
                />

                { !isClickedOutside &&
                    <Tool
                    title="New List"
                    aria-label="New List"
                    bgImage={CheckboxIcon}
                    isInputField
                    />
                }

                { isClickedOutside && 
                    <InputTextArea 
                    name="content" 
                    value={note.content} 
                    placeholder="Take a note..." 
                    rows="2" 
                    onChange={handleUpdateNote}
                    />
                }
                { isClickedOutside && 
                    <Toolbar 
                    id={note.id}
                    onHover={true}
                    clicked={() => handleAddNote(note)}
                    isInputField
                    /> 
                }
            </InputForm>
        </InputContainer>
    );
};

export default InputField;



