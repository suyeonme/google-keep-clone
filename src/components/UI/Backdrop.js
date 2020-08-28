import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import { unSelectNote } from '../../store/actions/notes';

const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: #e5e5e5;
  opacity: 0.75;
  transition: opacity 0.3s ease-out;

  ${'' /* ANIMATION */}
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 0.75;
  }
  &.fade-exit {
    opacity: 0.75;
  }
  &.fade-exit-active {
    opacity: 0;
  }
`;

function Backdrop(props) {
  const isSelected = useSelector((state) => state.isSelected);
  const dispatch = useDispatch();

  return (
    <CSSTransition
      classNames="fade"
      in={isSelected}
      timeout={300}
      unmountOnExit
    >
      <Overlay onClick={() => dispatch(unSelectNote())} />
    </CSSTransition>
  );
}

export default Backdrop;
