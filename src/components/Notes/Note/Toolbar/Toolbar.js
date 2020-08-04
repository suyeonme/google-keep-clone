import React from 'react';
import './Toolbar.scss';

import TranshCanIcon from '../../../../icons/trash-can.svg'
import PaintIcon from '../../../../icons/paintbrush.svg';
import PictureIcon from '../../../../icons/picture.svg';

const Toolbar = props => {   
    ////////// arial-label 

    const icons = [
        {icon: PaintIcon, alt: 'Change Color Button', ariaLabel: 'Change Color'},
        {icon: PictureIcon, alt: 'Add Picture Button', ariaLabel: 'Add Picture'}
    ];

    return(
        <div className="Toolbar">
            <div className="Toolbar__tools">
                {icons.map((icon, i) => <img  src={icon.icon} alt={icon.alt} arial-label={icon.ariaLabel} key={i}/>)}
            </div>
            <div className="Toolbar__btn">
                <button onClick={props.removed} aria-label="Delete">
                    <img src={TranshCanIcon} alt="Delete Button" />
                </button> 
            </div>
        </div>

    );
};

export default Toolbar;