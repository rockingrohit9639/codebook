import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import server from "../../axios/instance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const LoginContainer = styled.form`
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
  background: #efefef;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const LoginButton = styled.button`
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: var(--primary-color);
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  cursor: pointer;
`;

const SocialLogin = styled.div``;

const Foot = styled.p`
  font-size: 0.8rem;
  font-weight: 300;
`;

const SignupPage = styled(Link)`
  color: var(--primary-color);
`;

// const SignupPage = styled.a`
/* color: var(--primary-color);
`; */

function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginData.username !== "" && loginData.password !== "") {
      try {
        const res = await server.post("/auth/login", loginData);

        console.log(res.data);
      } catch (err) {
        if(err.response){
          toast.error(err.response.data.message);
        }
        else {
          toast.error("Something went wrong!");
        }
      }
    }
  };

  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <LoginContainer onSubmit={handleSubmit}>
        <Heading>
          Welcome to <Span>C</Span>odebook.
        </Heading>

        <InputBox>
          <Label>Username</Label>
          <Input
            value={loginData.username}
            name="username"
            type={"text"}
            placeholder="e.g. _example_404"
            onChange={handleChange}
          />
        </InputBox>

        <InputBox>
          <Label>Password</Label>
          <Input
            value={loginData.password}
            name="password"
            type={"password"}
            placeholder="********"
            onChange={handleChange}
          />
        </InputBox>

        <ButtonContainer>
          <LoginButton>Login</LoginButton>

          <SocialLogin>
            <GoogleIcon />
            <FacebookIcon />
          </SocialLogin>
        </ButtonContainer>

        <Foot>
          Did not have an account?{" "}
          <SignupPage to={"/signup"}>Signup</SignupPage>
        </Foot>
      </LoginContainer>
    </Container>
  );
}

export default Login;
