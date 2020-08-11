import React from 'react';
import { NoteTitle, NoteContent } from './NoteElements';

const NoteDetail = props => {
    const truncateText = p => {
        let text;
        (p.length > 120) ?  text =  p.substr(0, 120) + '...' : text = p;
        return text;
    };

    return ( 
    <div>
        <NoteTitle>{props.title}</NoteTitle>
        <NoteContent>{truncateText(props.content)}</NoteContent>
    </div>

    );
};

export default NoteDetail;