import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEditedNote } from '../../store/actions/notes';
import Tooltip from '@material-ui/core/Tooltip';

import './Toolbar.scss';
import TranshCanIcon from '../../icons/trash-can.svg'
import PaintIcon from '../../icons/paintbrush.svg';
import PictureIcon from '../../icons/picture.svg';
import SaveIcon from '../../icons/save.svg';
import ColorPalette from '../ColorPalette/ColorPalette';

const Toolbar = props => {  
    const [hoverColorPalette, sethoverColorPalette] = useState(false);

    const editedNote = useSelector(state => state.editedNote);

    const dispatch = useDispatch();

    const icons = [
        {icon: PaintIcon, alt: 'Change Color Button', ariaLabel: 'Change Color'},
        {icon: PictureIcon, alt: 'Add Picture Button',  ariaLabel: 'Add Picture'}
    ];

    const handleUpdateEditedNote = () => {
        if (editedNote !== null) dispatch(updateEditedNote());
    };

    const handleShowColorPalette = () => sethoverColorPalette(true);
    
    const handleHideColorPalette = () => sethoverColorPalette(false);

    return(
            <div className={props.onHover ? `Toolbar hover` : `Toolbar`}>
                <div>
                    { icons.map((icon, i) => <Tooltip 
                    title={icon.ariaLabel} 
                    aria-label={icon.ariaLabel} 
                    key={i} 
                    arrow>
                        <button
                        onMouseEnter={ icon.ariaLabel === 'Change Color' ? handleShowColorPalette : null} 
                        onMouseLeave={ icon.ariaLabel === 'Change Color' ? handleHideColorPalette : null}>
                            <img 
                            src={icon.icon} 
                            alt={icon.alt} /> 
                        </button>
                    </Tooltip> 
                    )}
                </div>
                <div>
                    <Tooltip 
                    title="Save" 
                    aria-label="Save" 
                    arrow>
                        <button onClick={handleUpdateEditedNote}>
                            <img 
                            src={SaveIcon} 
                            alt="Save Button" />
                        </button> 
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
                { hoverColorPalette && <ColorPalette  
                    onUnHover={handleHideColorPalette} 
                    onHover={handleShowColorPalette}/> }
        </div>
    );
};

export default Toolbar;



