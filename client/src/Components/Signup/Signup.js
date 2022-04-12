import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  padding: 1rem clamp(2rem, 12vw, 6rem);
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 680px) {
    padding: 1rem clamp(1rem, 12vw, 2rem);
  }
`;

const SignupContainer = styled.form`
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  width: 50%;
  height: min-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Heading = styled.h1`
    font-size: 2rem;
    font-weight: 600;
`;

const Span = styled.span`
    color: var(--primary-color);
    margin-bottom: 1rem;
`;

const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-block: 1rem;
`;

const Label = styled.label`
    font-size: 0.8rem;
    font-weight: 300;
`;

const Input = styled.input`
    border: none;
    outline: none;
    margin-top: 1rem;
    font-size: 0.9rem;
    padding: 0.7rem 0.5rem;
    background:  #EFEFEF;
    border-radius: 5px;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

const SignupButton = styled.button`
    border: none;
    outline: none;
    font-size: 1rem;
    font-weight: 600;
    color: #FFF;
    background: var(--primary-color);
    padding: 0.6rem 1.2rem;
    border-radius: 10px;
    cursor: pointer;
`;

const SocialSignup = styled.div``;

const Foot = styled.p`
    font-size: 0.8rem;
    font-weight: 300;
`;

const SignupPage = styled(Link)`
    color: var(--primary-color);
`;

function Signup() {
  return (
    <Container>
      <SignupContainer>
        <Heading>
          Register on <Span>C</Span>odebook.
        </Heading>

        <InputBox>
          <Label>Full Name</Label>
          <Input type={"text"} placeholder="e.g. John Doe" />
        </InputBox>

        <InputBox>
          <Label>Username</Label>
          <Input type={"text"} placeholder="e.g. _example_404" />
        </InputBox>

        <InputBox>
          <Label>Password</Label>
          <Input type={"password"} placeholder="********" />
        </InputBox>

        <ButtonContainer>
          <SignupButton>Sign Up</SignupButton>

          <SocialSignup>
            <GoogleIcon />
            <FacebookIcon />
          </SocialSignup>
        </ButtonContainer>

        <Foot>
          Already have an account? <SignupPage to={"/login"}>Login</SignupPage>
        </Foot>
      </SignupContainer>
    </Container>
  );
}

export default Signup;
