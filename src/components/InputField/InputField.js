import React, { useState } from 'react';
import './InputField.scss';

import Icon from '../../icons/plus.svg';

const InputField = props => {
    const [note, setNote] = useState({title: '', content: ''});
    const [isClicked, setIsClicked] = useState(false);

    const updateNoteHandler = e => {
        const {name, value} = e.target;
        setNote({...note, [name]: value});
    };

    const submitNoteHandler = e => {
        e.preventDefault();
        props.onAddNote(note);
        setNote({ title: '', content: ''});

        setIsClicked(!isClicked);
    };

    const onClickHandler = () => {
        setIsClicked(!isClicked);
    };

    return(
        <>
            <form className="InputField" >
                <input 
                    name="title" 
                    type="text" 
                    placeholder="Title" 
                    onChange={updateNoteHandler} 
                    onClick={onClickHandler}
                    value={note.title}
                    autoComplete="off"
                    />
                {
                    isClicked && 
                    <textarea 
                    name="content" 
                    placeholder="Take a note..." 
                    rows="2" 
                    onChange={updateNoteHandler} 
                    value={note.content}></textarea>
                }
                { isClicked &&
                <button onClick={submitNoteHandler}>
                    <img src={Icon} />
                </button>
                }
            </form>
        </>
    );
};

export default InputField;