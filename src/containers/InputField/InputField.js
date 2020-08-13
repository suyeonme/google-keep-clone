import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import styled from 'styled-components';

import { saveNote } from '../../store/actions/notes';
import { InputForm, InputTextArea, Input } from './InputElements';
import Toolbar from '../../components/Toolbar/Toolbar';

const InputField = props => {
    // State
    const selectedBgColor = useSelector(state => state.bgColor); 
    const [note, setNote] = useState({title: '', content: '', id: uniqid(), bgColor: '#fff' }); 
    const [expandInput, setExpandInput] = useState(false); 

    const dispatch = useDispatch();

    useEffect(() => {
        setNote({ ...note, bgColor: selectedBgColor })
    }, [selectedBgColor]);

    const handleUpdateNote = e => {
        const {name, value} = e.target;
        setNote({...note, [name]: value }); 
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
        <InputContainer onClick={handleFoldInput}>
            <InputForm 
            onClick={handleUnFoldInput} 
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
