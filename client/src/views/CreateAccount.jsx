import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import ModalWindow from "../components/ModalWindow";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import SucceedMessage from "../components/SucceedMessage";
import ErrorMessage from "../components/ErrorMessage";

const CreateAccount = () => {
  const {
    userData,
    handleChange,
    setUserData,
    errorMessage,
    setErrorMessage,
    succeedMessage,
    setSucceedMessage,
  } = useContext(UserContext);

  const handleCreateUser = async () => {
    setErrorMessage({});
    setSucceedMessage({});

    try {
      if (!userData.name) throw new Error("Please introduce a name");
      if (!userData.email) throw new Error("Please introduce an email");
      if (!userData.password) throw new Error("Please introduce your password");

      await fetch("http://localhost:3001/user/register", {
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
    const getPicture = async () => {
      let url = "https://picsum.photos/200";

      const image = await fetch(url);
      setUserData({ profilePicture: image.url });
    };

    getPicture();
  }, []);

  return (
    <ModalWindow>
      <BeforeArrow to="/register" className="modal-before-arrow">
        <AiOutlineArrowLeft className="before-arrow-icon" />
      </BeforeArrow>

      <Container className="modal-container">
        <h1 className="modal-title">Create your account</h1>
        <Form>
          <div className="modal-input-container">
            <input type="text" onChange={handleChange} name="name" />
            <p className={userData.name ? "text-active" : "no-text"}>Name</p>
          </div>

          <div className="modal-input-container">
            <input type="email" onChange={handleChange} name="email" />
            <p className={userData.email ? "text-active" : "no-text"}>Email</p>
          </div>

          <div className="modal-input-container">
            <input type="password" onChange={handleChange} name="password" />
            <p className={userData.password ? "text-active" : "no-text"}>
              Password
            </p>
          </div>
        </Form>

        {succeedMessage.succeedMessage && (
          <SucceedMessage message={succeedMessage.succeedMessage} />
        )}

        {errorMessage.errorMessage && (
          <ErrorMessage message={errorMessage.errorMessage} />
        )}

        <Btn className="modal-btn" onClick={handleCreateUser}>
          Next
        </Btn>
      </Container>
    </ModalWindow>
  );
};

const Container = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Btn = styled.button``;

const BeforeArrow = styled(Link)``;

export default CreateAccount;
