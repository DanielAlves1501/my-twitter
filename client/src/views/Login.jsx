import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ModalWindow from "../components/ModalWindow";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import SucceedMessage from "../components/SucceedMessage";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    userData,
    handleChange,
    setUserData,
    errorMessage,
    setErrorMessage,
    succeedMessage,
    setSucceedMessage,
    user,
    setUser,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage({});
    setSucceedMessage({});
    try {
      if (!userData.email) throw new Error("Please introduce an email");
      if (!userData.password) throw new Error("Please introduce your password");

      await fetch("http://localhost:3001/user/login", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.errorMessage) {
            throw new Error(res.errorMessage);
          } else {
            setSucceedMessage({ succeedMessage: res.message });
            setUser(res.user);
            localStorage.setItem("user", JSON.stringify(res.user));
            navigate("/");
          }
        });
    } catch (error) {
      setErrorMessage({ errorMessage: error.message });
    }
  };

  useEffect(() => {
    setUserData({});
    setErrorMessage({});
    setSucceedMessage({});
  }, []);

  return (
    <ModalWindow>
      <BeforeArrow to="/register" className="modal-before-arrow">
        <AiOutlineArrowLeft className="before-arrow-icon" />
      </BeforeArrow>
      <Container className="modal-container">
        <h1 className="modal-title">Sign in to Twitter</h1>
        <div className="modal-input-container">
          <input type="text" name="email" onChange={handleChange} />
          <p className={userData.email ? "text-active" : "no-text"}>Email</p>
        </div>
        <div className="modal-input-container">
          <input type="password" name="password" onChange={handleChange} />
          <p className={userData.password ? "text-active" : "no-text"}>
            Password
          </p>
        </div>
        {succeedMessage.succeedMessage && (
          <SucceedMessage message={succeedMessage.succeedMessage} />
        )}

        {errorMessage.errorMessage && (
          <ErrorMessage message={errorMessage.errorMessage} />
        )}

        <Btn className="modal-btn" onClick={handleLogin}>
          Login
        </Btn>
      </Container>
    </ModalWindow>
  );
};

const Container = styled.div``;

const BeforeArrow = styled(Link)``;

const Btn = styled.button``;

export default Login;
