import React, { useState } from 'react';
import './InputField.scss';

import Icon from '../../icons/plus.svg';

const InputField = props => {
    const [note, setNote] = useState({title: '', content: ''});
    const [expandInput, setExpandInput] = useState(false); 

    const updateNoteHandler = e => {
        const {name, value} = e.target;
        setNote({...note, [name]: value});
    };

    const submitNoteHandler = e => {
        e.preventDefault();
        props.onAddNote(note);
        setNote({ title: '', content: ''}); // Clear input 
        onFoldInput();
    };

    const onFoldInput = () => {
        setExpandInput(false);
    };

    const onUnfoldInput = e => {
        e.stopPropagation();
        setExpandInput(true);
    };

    return(
        <div className="InputField" onClick={onFoldInput}>
            <form onClick={onUnfoldInput}>
                <input 
                    name="title" 
                    type="text" 
                    placeholder="Title" 
                    value={note.title}
                    autoComplete="off"
                    onChange={updateNoteHandler} 
                    //onClick={onUnfoldInput} 
                    />
                {
                    expandInput && 
                    <textarea 
                    name="content" 
                    placeholder="Take a note..." 
                    rows="2" 
                    onChange={updateNoteHandler} 
                    value={note.content}
                    //onClick={onUnfoldInput} 

                    />
                }
                { expandInput &&
                <button onClick={submitNoteHandler}>
                    <img src={Icon} alt="Add Button"/>
                </button>
                }
            </form>
        </div>
    );
};

export default InputField;