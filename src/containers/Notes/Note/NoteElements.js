import styled, { keyframes, css } from 'styled-components';

const popup = keyframes`
    from {
        opacity: 0;
        transform: scale(.4);
        transform: translate(-50%, -50%);
    } to {
        opacity: 1;
        transform: scale(1);
        transform: translate(-50%, -50%);
    }
`;

export const NoteContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid rgba(66, 66, 66, 0.2);
  word-wrap: break-word;
  white-space: pre-wrap;
  cursor: pointer;
  transition: background-color 0.3s ease-in;
  background: ${(props) => props.bgColor};

  &:hover {
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
      0 1px 3px 1px rgba(60, 64, 67, 0.149);
  }

  ${({ clicked }) =>
    clicked &&
    css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 42%;
      z-index: 500;
      cursor: default;
      max-height: 70vh;
      height: auto;
      overflow: auto;
      animation: ${popup} 0.3s ease-out;
    `}
`;

const noteTitleSizes = {
  small: {
    fontSize: '1.4rem',
    lineHeight: '2',
    fontWeight: 400,
    padding: '0',
  },
  medium: {
    fontSize: '1.6rem',
    lineHeight: '1',
    fontWeight: 400,
    padding: '12px 12px 0 12px',
  },
  big: {
    fontSize: '2.2rem',
    lineHeight: '1',
    fontWeight: 500,
    padding: '12px 12px 0 12px',
  },
};

const noteTitleStyles = css`
  ${({ size }) => css`
    font-size: ${noteTitleSizes[size].fontSize};
    line-height: ${noteTitleSizes[size].lineHeight};
    font-weight: ${noteTitleSizes[size].fontWeight};
    padding: ${noteTitleSizes[size].padding};
  `}
`;

export const NoteTitle = styled.div`
  ${noteTitleStyles}
  width: 100%;
  outline: 0px solid transparent;

  ${({ contentEditable }) =>
    contentEditable &&
    `
      &:empty::before{
          content:attr(placeholder);
          color:#80868A;
      }   
    `}

  ${({ isTodoItem }) => isTodoItem && `padding: 0`}
`;

export const NoteContent = styled.div`
  font-size: 1.5rem;
  margin-bottom: auto;
  line-height: 1.5;
  padding: 12px 12px 0 12px;
  outline: 0px solid transparent;

  ${({ contentEditable }) =>
    contentEditable &&
    `
        font-size: 1.7rem; 

        &:empty::before{
            content:attr(placeholder);
            color:#80868A;
        }  
    `}
`;
