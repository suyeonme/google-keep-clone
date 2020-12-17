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

export const NoteContainer = styled('div')<{
  clicked: number;
  bgColor: string;
}>`
  position: relative;
  border-radius: 8px;
  border: 1px solid rgba(66, 66, 66, 0.2);
  word-wrap: break-word;
  white-space: pre-wrap;
  cursor: pointer;
  transition: background-color 0.3s ease-in;
  background: ${(props) => props.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
      0 1px 3px 1px rgba(60, 64, 67, 0.149);
  }

  ${({ clicked }) =>
    clicked &&
    css`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 42%;
      height: 60vh;
      max-height: 90vh;
      z-index: 800;
      cursor: default;
      animation: ${popup} 0.3s ease-out;
      box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
        0 1px 3px 1px rgba(60, 64, 67, 0.149);

      @media (max-width: 1024px) {
        width: 55%;
      }
      @media (max-width: 768px) {
        width: 75%;
        height: 80vh;
      }
      @media (max-width: 576px) {
        width: 100%;
      }
    `}
`;

export const NoteTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  width: 100%;
  padding: 12px 12px 0 12px;
`;

export const NoteContent = styled.div`
  font-size: 1.5rem;
  line-height: 1.5;
  padding: 0 12px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
`;

export const ToolbarContainer = styled.div`
  flex: 0 0 auto;
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  line-height: 1.5;
`;
