import React from 'react';
import './Note.scss';

import Icon from '../../icons/trash-can.svg';

const Note = props => {
    const truncateText = p => {
        let paragraph;

        if (p.length > 120) {
            paragraph = p.substr(0, 120) + '...';
        } else {
            paragraph = p;
        };
        return paragraph;
    };

    return(
        <div className="Note">
            <h1>{props.title}</h1>
            <p>{truncateText(props.content)}</p>
            <button onClick={() => props.onRemove(props.id)}>
                <img src={Icon} alt="Delete Icon"/>
            </button>
        </div>
    );
};

export default Note;

