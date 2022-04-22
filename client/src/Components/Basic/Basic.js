import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 60px;
  padding: 1rem clamp(2rem, 12vw, 6rem);
  @media only screen and (max-width: 680px) {
    padding: 1rem clamp(1rem, 12vw, 2rem);
  }
`;

export const Button = styled.button`
  border: none;
  outline: none;
  padding: 0.8rem 1.3rem;
  font-size: 0.9rem;
  cursor: pointer;
  background: var(--primary-color);
  color: #fff;
  border-radius: 5px;
`;
