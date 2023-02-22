import React from "react";
import styled from "styled-components";
import ModalWindow from "../components/ModalWindow";
import { BsTwitter } from "react-icons/bs";
import ModalButton from "../components/ModalButton";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <ModalWindow>
      <Container>
        <TwitterIcon />
        <h1 className="modal-title">Join Twitter today</h1>
        <ModalButton
          buttonText="Create Account"
          path="/register/createAccount"
        />
        <p className="terms">
          By signing up, you agree to the <span>Terms of Service</span> and
          <span> Privacy Policy</span>, including the
          <span> Cookie Policy </span>.
        </p>

        <p className="login-text">
          Do you already have an account?{" "}
          <Link className="link" to="/login">
            Log in
          </Link>
        </p>
      </Container>
    </ModalWindow>
  );
};

const TwitterIcon = styled(BsTwitter)`
  font-size: 32px;
  color: var(--blue);
  margin-bottom: 30px;
`;

const Container = styled.div`
  width: 300px;
  text-align: center;

  .terms {
    color: var(--gray);
    font-size: 13px;
    margin-top: 15px;
    margin-bottom: 40px;
    text-align: left;
  }

  span {
    color: var(--blue);
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  .login-text {
    font-size: 15px;
    color: var(--gray);
    text-align: left;

    .link {
      color: var(--blue);
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default Register;
