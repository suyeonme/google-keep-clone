import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { saveNote, deleteNote } from '../../store/actions/notes';

import './InputField.scss';
import Icon from '../../icons/plus.svg';

const InputField = props => {
    const [note, setNote] = useState({title: '', content: ''});
    const [expandInput, setExpandInput] = useState(false); 
    const addBtnRef = useRef();

    const dispatch = useDispatch();

    const handleUpdateNote = e => {
        const {name, value} = e.target;
        setNote({...note, [name]: value});
    };

    const handleSaveNote = note => {
        if(note.title !== '' && note.content !== '') {
            dispatch(saveNote(note));

            // CLEAR INPUT
            setNote({ title: '', content: ''}); 
        };
    };

    const handleFoldInput = () => {
        setExpandInput(false);
    };

    const handleUnFoldInput = e => {
        if (e.target !== addBtnRef.current) {
            e.stopPropagation();
            setExpandInput(true);
        }
    };

    return(
        <div className="InputField" onClick={handleFoldInput}>
            <form onClick={handleUnFoldInput} >
                <input 
                    name="title" 
                    type="text" 
                    placeholder="Title" 
                    value={note.title}
                    autoComplete="off"
                    onChange={handleUpdateNote} />
                {
                    expandInput && 
                    <textarea 
                    name="content" 
                    placeholder="Take a note..." 
                    rows="2" 
                    onChange={handleUpdateNote} 
                    value={note.content} />
                }
                { expandInput &&
                <button onClick={() => handleSaveNote(note)}>
                    <img src={Icon} alt="Add Button" ref={addBtnRef}/>
                </button>
                }
            </form>
        </div>
    );
};

export default InputField;