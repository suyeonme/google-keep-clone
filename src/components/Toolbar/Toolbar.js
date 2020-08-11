import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEditedNote } from '../../store/actions/notes';
import Tooltip from '@material-ui/core/Tooltip';
import styled from 'styled-components';

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
            <ToolbarContainer hoverd={props.onHover}>
                <div>
                    { icons.map((icon, i) => <Tooltip 
                    title={icon.ariaLabel} 
                    aria-label={icon.ariaLabel} 
                    key={i} 
                    arrow>
                        <ToolbarBtn
                        onMouseEnter={ icon.ariaLabel === 'Change Color' ? handleShowColorPalette : null} 
                        onMouseLeave={ icon.ariaLabel === 'Change Color' ? handleHideColorPalette : null}>
                            <ToolbarIcon
                            src={icon.icon} 
                            alt={icon.alt} /> 
                        </ToolbarBtn>
                    </Tooltip> 
                    )}
                </div>
                <div>
                    <Tooltip 
                    title="Save" 
                    aria-label="Save" 
                    arrow>
                        <ToolbarBtn onClick={handleUpdateEditedNote}>
                            <ToolbarIcon 
                            src={SaveIcon} 
                            alt="Save Button" />
                        </ToolbarBtn> 
                    </Tooltip>
                    <Tooltip 
                    title="Delete" 
                    aria-label="Delete" 
                    arrow>
                        <ToolbarBtn onClick={props.onRemove}>
                            <ToolbarIcon 
                            src={TranshCanIcon} 
                            alt="Delete Button" />
                        </ToolbarBtn> 
                    </Tooltip>
                </div>
                { hoverColorPalette && <ColorPalette  
                    onUnHover={handleHideColorPalette} 
                    onHover={handleShowColorPalette}/> }
        </ToolbarContainer>
    );
};

// Styles
const ToolbarContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px;
    margin-top: 20px;
    line-height: 0;
    opacity: ${props => props.hoverd ? 1 : 0};
    transition: opacity .3s ease-out;
`;

const ToolbarIcon = styled.img`
        width: 15px;
        height: 15px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
`;

const ToolbarBtn = styled.button`
        position: relative;
        background-color: transparent; 
        border-radius: 50%;
        width: 32px;
        height: 32px;

        &:hover {  
            opacity: .87;
            background-color: rgba(95,99,104,0.157);
        }
`;

export default Toolbar;





