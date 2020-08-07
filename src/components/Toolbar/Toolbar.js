import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateEditedNote } from '../../store/actions/notes';

import './Toolbar.scss';
import TranshCanIcon from '../../icons/trash-can.svg'
import PaintIcon from '../../icons/paintbrush.svg';
import PictureIcon from '../../icons/picture.svg';

const Toolbar = props => {  
    const dispatch = useDispatch();
    const editedNote = useSelector(state => state.editedNote);
    console.log(editedNote);

    const handleUpdateEditedNote = () => {
        dispatch(updateEditedNote(editedNote));
        console.log('Update Edited Note');
    };
    
    const icons = [
        {icon: PaintIcon, alt: 'Change Color Button'},
        {icon: PictureIcon, alt: 'Add Picture Button'}
    ];

    return(
            <div className="Toolbar">
                <div>
                    { icons.map((icon, i) => <img src={icon.icon} alt={icon.alt} key={i} className="Toolbar__tool"/>) }
                </div>
                <div>
                    { props.onExpand && <button className="Toolbar__saveBtn" onClick={handleUpdateEditedNote}>Save</button> }
                    <button onClick={props.onRemove}>
                        <img src={TranshCanIcon} alt="Delete Button" />
                    </button> 
                </div>
            </div>
    );
};

export default Toolbar;

