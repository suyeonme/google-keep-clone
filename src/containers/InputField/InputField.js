import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import styled from 'styled-components';

import { saveNote } from '../../store/actions/notes';
import { InputForm, InputTextArea, Input } from './InputElements';
import Toolbar from '../../components/Toolbar/Toolbar';

const InputField = props => {
    const selectedBgColor = useSelector(state => state.bgColor); // HERE
    const [note, setNote] = useState({title: '', content: '', id: uniqid(), bgColor: selectedBgColor});
    const [expandInput, setExpandInput] = useState(false); 

    // Degugging
    console.log('Selected bgColor [outside]: ' + selectedBgColor);
    console.log('Selected bgColor [outside]: ' + note.bgColor);
    
    const dispatch = useDispatch();

    const handleUpdateNote = e => {
        const {name, value} = e.target;
        setNote({...note, [name]: value});
    };

    const handleSaveNote = note => {
        if(note.title !== '' && note.content !== '') {
            dispatch(saveNote(note));

            // CLEAR INPUT
            setNote({ title: '', content: '', id: uniqid(), bgColor: '#fff' }); 
        };
    };

    const handleFoldInput = () => {
        setExpandInput(false);
    };

    const handleUnFoldInput = e => {
        if (e.target.nodeName !== 'IMG') {
            e.stopPropagation();
            setExpandInput(true);
        }
    };

    return(
        <InputContainer onClick={handleFoldInput} >
            <InputForm onClick={handleUnFoldInput}>
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
                    id={note.id} // TEST
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
