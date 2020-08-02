/* import React, { useState } from 'react';
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
        setNote({ title: '', content: ''}); // Clear input 
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
                    <img src={Icon} alt="Add Button"/>
                </button>
                }
            </form>
        </>
    );
};

export default InputField; */

import React, { useState } from 'react';
import './InputField.scss';

import Icon from '../../icons/plus.svg';

const InputField = props => {
    const [note, setNote] = useState({title: '', content: ''});

    const updateNoteHandler = e => {
        const {name, value} = e.target;
        setNote({...note, [name]: value});
    };

    const submitNoteHandler = e => {
        e.preventDefault();
        props.onAddNote(note);
        setNote({ title: '', content: ''}); // Clear input 
    };

    return(
        <div className="InputField" onClick={props.closed}>
            <form>
                <input 
                    name="title" 
                    type="text" 
                    placeholder="Title" 
                    onChange={updateNoteHandler} 
                    value={note.title}
                    autoComplete="off"
                    onClick={props.show}
                    />
                {
                    props.isClicked && 
                    <textarea 
                    name="content" 
                    placeholder="Take a note..." 
                    rows="2" 
                    onChange={updateNoteHandler} 
                    value={note.content}></textarea>
                }
                { props.isClicked &&
                <button onClick={submitNoteHandler}>
                    <img src={Icon} alt="Add Button"/>
                </button>
                }
            </form>
        </div>
    );
};

export default InputField;