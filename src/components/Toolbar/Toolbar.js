import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEditedNote } from '../../store/actions/notes';
import Tooltip from '@material-ui/core/Tooltip';

import { ToolbarContainer, ToolbarIcon, ToolbarBtn } from './ToolbarElements';
import PlusIcon from '../../icons/plus.svg'
import TranshCanIcon from '../../icons/trash-can.svg'
import PaintIcon from '../../icons/paintbrush.svg';
import PictureIcon from '../../icons/picture.svg';
import SaveIcon from '../../icons/save.svg';
import ColorPalette from '../ColorPalette/ColorPalette';

const Toolbar = ({ onHover, isInputField, clicked, id, onRemove }) => {  
    const [hoverColorPalette, sethoverColorPalette] = useState(false);
    const editedNote = useSelector(state => state.editedNote);

    const icons = [
        {icon: PaintIcon, alt: 'Change Color Button', ariaLabel: 'Change Color'},
        {icon: PictureIcon, alt: 'Add Picture Button',  ariaLabel: 'Add Picture'}
    ];

    const dispatch = useDispatch();
    
    const handleShowColorPalette = () => sethoverColorPalette(true);
    const handleHideColorPalette = () => sethoverColorPalette(false);

    const handleUpdateEditedNote = id => {
        (editedNote !== null) && dispatch(updateEditedNote(id));
    }; 

    return(
            <ToolbarContainer hoverd={onHover}>
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
                            alt={icon.alt}
                            /> 
                        </ToolbarBtn>
                    </Tooltip> 
                    )}
                </div>
                
                { isInputField ? 
                    <div>
                        <Tooltip 
                        title="Add" 
                        aria-label="add" 
                        arrow>
                            <ToolbarBtn onClick={e => e.preventDefault()}>
                                <ToolbarIcon 
                                src={PlusIcon} 
                                alt="Add Button"
                                onClick={clicked} />
                            </ToolbarBtn>
                        </Tooltip>
                    </div>
                    : 
                    <div>
                        <Tooltip 
                        title="Save" 
                        aria-label="Save" 
                        arrow>
                            <ToolbarBtn onClick={() => handleUpdateEditedNote(id)}>
                                <ToolbarIcon 
                                src={SaveIcon} 
                                alt="Save Button" 
                                />
                            </ToolbarBtn> 
                        </Tooltip>
                        <Tooltip 
                        title="Delete" 
                        aria-label="Delete" 
                        arrow>
                            <ToolbarBtn 
                            onClick={onRemove}>
                                <ToolbarIcon 
                                src={TranshCanIcon} 
                                alt="Delete Button" 
                                />
                            </ToolbarBtn> 
                        </Tooltip>
                    </div>
                }
                
                { hoverColorPalette && <ColorPalette  
                    id={id}
                    isInputField={isInputField}
                    onUnHover={handleHideColorPalette} 
                    onHover={handleShowColorPalette}
                    /> 
                }
        </ToolbarContainer>
    );
};

export default Toolbar;

