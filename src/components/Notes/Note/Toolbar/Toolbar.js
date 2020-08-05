import React from 'react';
import './Toolbar.scss';
import { CSSTransition } from 'react-transition-group';

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
        <CSSTransition
        in={props.onHover}
        timeout={300}
        classNames="show"
        unmountOnExit>
            <div className="Toolbar">
                <div className="Toolbar__tools">
                    {icons.map((icon, i) => <img  src={icon.icon} alt={icon.alt} key={i}/>)}
                </div>
                <div className="Toolbar__btn">
                    <button onClick={props.removed} aria-label="Delete">
                        <img src={TranshCanIcon} alt="Delete Button" />
                    </button> 
                </div>
            </div>
        </CSSTransition>
    );
};

export default Toolbar;

