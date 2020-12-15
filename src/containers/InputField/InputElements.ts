import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;

  @media (max-width: 768px) {
    width: 95%;
    margin-left: auto;
  }
`;

export const Form = styled('form')<{ bgColor: string }>`
  position: relative;
  top: 56px;
  width: 40%;
  height: auto;
  display: flex;
  flex-direction: column;
  border-radius: 0.8rem;
  margin: 3rem auto;
  box-shadow: 0 1px 5px rgb(138, 137, 137);
  padding: 12px 16px;
  background: ${(props) => props.bgColor};
  transition: background-color 0.3s ease-in;

  @media (max-width: 1024px) {
    width: 60%;
  }
  @media (max-width: 768px) {
    width: 75%;
  }
  @media (max-width: 576px) {
    width: 82%;
    transform: translateX(20px);
  }
  @media (max-width: 320px) {
    width: 78%;
  }
`;

export const Input = styled('input')<{ isEditable?: boolean }>`
  width: 100%;
  border: none;
  outline: none;
  font-family: inherit;
  font-weight: 500;
  font-size: 1.6rem;
  background: transparent;

  ${({ isEditable }) =>
    isEditable &&
    `
    font-size: 2rem;
    height: 50px;
    padding: 1rem 1.5rem;
    `};
`;

export const TextArea = styled('textarea')<{ isEditable?: boolean }>`
  width: 100%;
  border: none;
  outline: none;
  font-family: inherit;
  line-height: 1.5;
  background: inherit;
  margin-top: 1.2rem;
  resize: none;
  flex: 1 1 auto;

  ${({ isEditable }) =>
    isEditable &&
    `
    font-size: 1.7rem; 
    padding: 0 12px 0 12px;  
    margin-top: 0;
    `};
`;
