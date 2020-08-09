import React  from 'react';
import { useDispatch } from 'react-redux';

import { changeColorNote } from '../../store/actions/notes'; 
import './ColorPalette.scss';

const ColorPalette = props => {
    const dispatch = useDispatch();

    const colors = [
        '#fff',
        '#d9adad',
        '#84a9ac',
        '#93b5e1',
        '#e3dfc8',
        '#eebb4d',
        '#99b898',
        '#c26565',
    ];

    return (
        <div 
        className="ColorPalette" 
        onMouseEnter={props.onHover}
        onMouseLeave={props.onUnHover}>
            { colors.map((color, index) => <button 
            style={{ backgroundColor: color }} 
            key={index}
            onClick={() => dispatch(changeColorNote(color))} />
            )}
        </div>
    );
};

export default ColorPalette;