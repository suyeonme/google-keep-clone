import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import styled from 'styled-components';

import { saveNote } from '../../store/actions/notes';
import { InputForm, InputTextArea, Input } from './InputElements';
import Toolbar from '../../components/Toolbar/Toolbar';

const InputField = props => {
    const selectedBgColor = useSelector(state => state.bgColor); 
    const [note, setNote] = useState({title: '', content: '', id: uniqid(), bgColor: '#fff' }); 
    const [expandInput, setExpandInput] = useState(false); 

    const ref = useRef(null);
    const dispatch = useDispatch();

    // Detect click outside of form 
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    // Update bgColor
    useEffect(() => {
        if (expandInput) setNote({ ...note, bgColor: selectedBgColor });
    }, [selectedBgColor]);

    const handleClickOutside = (e) => {
        (!ref.current.contains(e.target)) ? setExpandInput(false) : setExpandInput(true);  
    };

    const handleUpdateNote = e => {
        const {name, value} = e.target;
        setNote({...note, [name]: value }); 
    };

    const handleSaveNote = note => {
        if(note.title !== '' && note.content !== '') {
            dispatch(saveNote(note)); 

            // Clear Input 
            setNote({ title: '', content: '', id: uniqid(), bgColor: '#fff' });
            setExpandInput(false);
        };
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
                    onHover={true}
                    isInputField={true}
                    clicked={() => handleSaveNote(note)}
                    /> 
                }
            </InputForm>
        </InputContainer>
    );
};

// Style
const InputContainer = styled.div`
    width: 100%;
`;

export default InputField;
