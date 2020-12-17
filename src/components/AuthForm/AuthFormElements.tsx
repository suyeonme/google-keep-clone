import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(62px);
`;

export const Form = styled.form`
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
    0 1px 3px 1px rgba(60, 64, 67, 0.149);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  width: 25%;
  height: 80%;
  padding: 3rem 4rem;
  border-radius: 8px;

  @media (max-width: 1024px) {
    width: 35%;
  }
  @media (max-width: 768px) {
    width: 50%;
  }
  @media (max-width: 576px) {
    width: 80%;
  }
`;

export const FormInput = styled.input`
  padding: 1rem;
  border-bottom: 1px solid black;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

export const FormLabel = styled.label`
  font-size: 1.3rem;
`;

export const FormTitle = styled.h2`
  font-size: 2.3rem;
  text-align: center;
  margin-bottom: 3rem;
`;

export const FormBtn = styled.span`
  text-align: center;
  font-size: 1.5rem;
  cursor: pointer;
  margin-top: 1.5rem;
`;

export const SubmitBtn = styled.input`
  margin-top: 3rem;
  padding: 1rem;
  border-radius: 20px;
  background-color: #f3b501;
  cursor: pointer;
`;

export const IconContainer = styled('div')<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  width: 33px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:not(:last-child) {
    margin-right: 1rem;
  }
  img {
    width: 70%;
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const SocialsContainer = styled.div`
  margin-top: 3rem;
  text-align: center;
`;

export const SocialLogInTitle = styled.h4`
  color: #969696;
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
`;
