import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEditedNote } from '../../store/actions/notes';
import Tooltip from '@material-ui/core/Tooltip';

import './Toolbar.scss';
import TranshCanIcon from '../../icons/trash-can.svg'
import PaintIcon from '../../icons/paintbrush.svg';
import PictureIcon from '../../icons/picture.svg';

const Toolbar = props => {  
    const editedNote = useSelector(state => state.editedNote);
    const dispatch = useDispatch();

    const icons = [
        {icon: PaintIcon, alt: 'Change Color Button', ariaLabel: 'Change Color'},
        {icon: PictureIcon, alt: 'Add Picture Button',  ariaLabel: 'Add Picture'}
    ];

    const handleUpdateEditedNote = () => {
        if (editedNote !== null) dispatch(updateEditedNote());
    };

    return(
            <div className={props.onHover ? `Toolbar hover` : `Toolbar`}>
                <div>
                    { icons.map((icon, i) => <Tooltip 
                    title={icon.ariaLabel} 
                    aria-label={icon.ariaLabel} 
                    key={i} 
                    arrow>
                        <img 
                        className="Toolbar__tool" 
                        src={icon.icon} 
                        alt={icon.alt} /> 
                    </Tooltip> 
                    )}
                </div>
                <div>
                    <Tooltip 
                    title="Save" 
                    aria-label="Save" 
                    arrow>
                        <button 
                        className="Toolbar__saveBtn" 
                        onClick={handleUpdateEditedNote}>Save</button> 
                    </Tooltip>
                    <Tooltip 
                    title="Delete" 
                    aria-label="Delete" 
                    arrow>
                        <button onClick={props.onRemove}>
                            <img 
                            src={TranshCanIcon} 
                            alt="Delete Button" />
                        </button> 
                    </Tooltip>
                </div>
        </div>
    );
};

export default Toolbar;

