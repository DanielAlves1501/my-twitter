import styled from "@emotion/styled";
import React from "react";

const ModalWindow = ({ children }) => {
  return (
    <Opacity>
      <Modal>{children}</Modal>
    </Opacity>
  );
};

const Modal = styled.section`
  position: relative;
  width: 600px;
  max-width: 95%;
  height: 650px;
  background: #fff;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Opacity = styled.div`
  width: 100%;
  height: 100vh;
  background: #999999;
  position: fixed;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default ModalWindow;
