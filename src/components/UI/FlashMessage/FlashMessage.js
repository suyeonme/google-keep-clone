import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import { useSelector, useDispatch } from 'react-redux';
import { hideFlashMessage } from '../../../store/actions/flashMessage';

const Message = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 452px;
  font-size: 14px;
  color: white;
  background: #323232;
  border-radius: 3px;
  margin: 10px;
  padding: 15px 20px;
  transition: all 0.3s ease-out;

  &.slide-enter {
    opacity: 0;
    transform: translateY(100px);
  }
  &.slide-enter-active {
    opacity: 1;
    transform: translateY(0);
  }
  &.slide-exit {
    opacity: 1;
    transform: translateY(0);
  }
  &.slide-exit-active {
    opacity: 0;
    transform: translateY(100px);
  }
`;

const CloseBtn = styled.div`
  font-size: 30px;
  cursor: pointer;
  padding: 5px;
`;

function FlashMessage() {
  const message = useSelector((state) => state.flashMessage.message);
  const showMessage = useSelector((state) => state.flashMessage.showMessage);
  const dispatch = useDispatch();

  return (
    <CSSTransition
      in={showMessage}
      classNames="slide"
      timeout={300}
      unmountOnExit
    >
      <Message>
        {message}
        <CloseBtn onClick={() => dispatch(hideFlashMessage())}>
          &times;
        </CloseBtn>
      </Message>
    </CSSTransition>
  );
}

export default FlashMessage;
