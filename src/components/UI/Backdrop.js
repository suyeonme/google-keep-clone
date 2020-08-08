import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { unSelectNote } from '../../store/actions/notes';
import { CSSTransition } from 'react-transition-group';
import './Backdrop.scss';

const Backdrop = props => {
    const isSelected = useSelector(state => state.isSelected);
    const dispatch = useDispatch();

    return (
        <CSSTransition
        in={isSelected}
        timeout={300}
        unmountOnExit
        classNames="showBackdrop">
            <div 
            className="Backdrop" 
            onClick={() => dispatch(unSelectNote())} />
        </CSSTransition>
    );
};

export default Backdrop;

