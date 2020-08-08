import React  from 'react';
import './ColorPalette.scss';

const ColorPalette = props => {
    const colors = [
        '#fff',
        '#d9adad',
        '#84a9ac',
        '#93b5e1',
        '#e3dfc8',
        '#eebb4d',
        '#99b898',
        '#24a19c',
    ];

    return (
        <div 
        className="ColorPalette" 
        onMouseEnter={props.onHover}
        onMouseLeave={props.onUnHover}>
            { colors.map((color, index) => <button 
            style={{ backgroundColor: color }} 
            key={index} />
            )}
        </div>
    );
};

export default ColorPalette;