import React from 'react';
import './Note.scss';

import Icon from '../../icons/trash-can.svg';

const Note = props => {

    return(
        <div className="Note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={() => props.onRemove(props.id)}>
                <img src={Icon} alt="Delete Icon"/>
            </button>
        </div>
    );
};

export default Note;

