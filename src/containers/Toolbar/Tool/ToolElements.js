import styled from 'styled-components';

import PinIcon from '../../../icons/pin.svg';
import FilledPinIcon from '../../../icons/pin-fill.svg';

export const ToolbarBtn = styled.button`
  border-radius: 50%;
  width: 28px;
  height: 28px;
  background: ${(props) => `url(${props.bgImage})`} no-repeat center center;
  background-size: 50%;
  margin-right: 10px;

  &:hover {
    opacity: 0.87;
    background-color: rgba(95, 99, 104, 0.157);
  }

  ${({ notePin }) =>
    notePin &&
    `
      position: absolute;
      top: 9px;
      right: 7px;
      width: 30px;
      height: 30px;
      opacity: 0.54;
      background-size: 24px 24px;
      margin-right: 0;
      background: ${(props) =>
        props.isPinned ? `url(${FilledPinIcon})` : `url(${PinIcon})`}
        no-repeat center center;
    `};

  ${({ inputPin }) =>
    inputPin &&
    `
      position: absolute;
      top: 2px;
      right: 0;
      width: 40px;
      height: 40px;
      ${
        '' /* background: ${(props) =>
        props.isPinned ? `url(${FilledPinIcon})` : `url(${PinIcon})`}
        no-repeat center center; */
      }
        background: url(${FilledPinIcon}) no-repeat center center;
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
`;
