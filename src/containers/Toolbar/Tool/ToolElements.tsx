import styled, { css } from 'styled-components';

import PinIcon from 'icons/pin.svg';
import FilledPinIcon from 'icons/pin-fill.svg';

interface ToolbarBtnProp {
  bgImage?: string;
  notePin?: boolean;
  isPinned?: boolean;
  inputPin?: boolean;
  isLabel?: boolean;
  editLabel?: boolean;
}

export const ToolbarBtn = styled('button')<ToolbarBtnProp>`
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
  background: ${(props) => `url(${props.bgImage})`} no-repeat center center;
  background-size: 50%;
  margin-right: 10px;

  &:hover {
    opacity: 0.87;
    background-color: rgba(95, 99, 104, 0.157);
  }

  ${({ notePin }) =>
    notePin &&
    css`
      position: absolute;
      top: 9px;
      right: 7px;
      width: 30px;
      height: 30px;
      opacity: 0.54;
      background-size: 24px 24px;
      margin-right: 0;
      background: ${(props: any) =>
          props.isPinned ? `url(${FilledPinIcon})` : `url(${PinIcon})`}
        no-repeat center center;
    `};

  ${({ inputPin }) =>
    inputPin &&
    css`
      position: absolute;
      top: 2px;
      right: 0;
      width: 40px;
      height: 40px;
      background: ${(props: any) =>
          props.isPinned ? `url(${FilledPinIcon})` : `url(${PinIcon})`}
        no-repeat center center;
    `};

  ${({ isLabel }) =>
    isLabel &&
    `
      width: 18px;
      height: 18px;
      margin-right: 0;
    `};

  ${({ editLabel }) =>
    editLabel &&
    `
      width: 25px;
      height: 25px;
      background-size: 80%;
      margin-right: 0;
    `};

  @media (max-width: 320px) {
    margin-right: 0;

    &:not(:last-child) {
      margin-right: 3px;
    }
  }
`;

export const ToolSpan = styled.span`
  font-size: 1.1rem;
  display: block;
  margin: auto 0;
  padding: 0.4rem 0;
`;
