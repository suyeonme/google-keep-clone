import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';

import { hideFlashMessage } from 'store/actions/view';
import { RootState } from 'store/reducers/index';

const Message = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 452px;
  font-size: 14px;
  color: white;
  background: #323232;
  border-radius: 3px;
  padding: 15px 20px;
  transition: all 0.3s ease-out;
  z-index: 1000;

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

  @media (max-width: 576px) {
    width: 100%;
    left: 0;
    bottom: 0;
  }
`;

const CloseBtn = styled.div`
  font-size: 30px;
  cursor: pointer;
  padding: 5px;
  margin: 0;
`;

function FlashMessage() {
  const message = useSelector(
    (state: RootState) => state.view.flashMessage.message,
  );
  const showMessage = useSelector(
    (state: RootState) => state.view.flashMessage.showMessage,
  );
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
