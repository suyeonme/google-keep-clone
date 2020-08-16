import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import styled from 'styled-components';

import { saveNote, getColorNote } from '../../store/actions/notes';
import { InputForm, InputTextArea, Input } from './InputElements';
import Toolbar from '../../components/Toolbar/Toolbar';

// Style
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
    const [expandInput, setExpandInput] = useState(false); 
    const [note, setNote] = useState(initialNote);  

    const ref = useRef(null);
    const dispatch = useDispatch();

    // Detect click outside of form 
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    // Update bgColor
    useEffect(() => {
        setNote(prevNote => ({ ...prevNote, bgColor: selectedBgColor }));
        // When chaing color on note, inputField note's color is also changed. 
        // Distinct note and inputField
    }, [selectedBgColor]);

    const handleClickOutside = (e) => {
        (ref.current && !ref.current.contains(e.target)) ? setExpandInput(false) : setExpandInput(true); 
    };

    const handleUpdateNote = e => {
        const {name, value} = e.target;
        setNote({...note, [name]: value }); 
    };

    const handleclearNote = () => {
        dispatch(getColorNote('#fff'));
        setExpandInput(false);
        setNote({ ...initialNote, id: uniqid() });
    };

    const handleSubmitNote = note => {
        if(note.title !== '' && note.content !== '') {
            dispatch(saveNote(note)); 
            handleclearNote();
        };
    };

    return(
        <InputContainer>
            <InputForm 
            ref={ref}
            bgColor={note.bgColor}
            >
                <Input 
                    name="title" 
                    value={note.title}
                    placeholder="Title" 
                    autoComplete="off"
                    onChange={handleUpdateNote}
                    />
                { expandInput && 
                    <InputTextArea 
                    name="content" 
                    value={note.content} 
                    placeholder="Take a note..." 
                    rows="2" 
                    onChange={handleUpdateNote}
                    />
                }
                { expandInput && 
                    <Toolbar 
                    id={note.id}
                    onHover={true}
                    isInputField={true}
                    clicked={() => handleSubmitNote(note)}
                    /> 
                }
            </InputForm>
        </InputContainer>
    );
};

export default InputField;


