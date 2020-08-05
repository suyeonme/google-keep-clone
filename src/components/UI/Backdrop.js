import React from 'react';

import { CSSTransition } from 'react-transition-group';
import './Backdrop.scss';

const Backdrop = props => {
    return (
        <CSSTransition
        in={props.onShow}
        timeout={300}
        unmountOnExit
        classNames="showBackdrop">
            <div className="Backdrop" onClick={props.onClick}></div>
        </CSSTransition>
    );
};

export default Backdrop;

