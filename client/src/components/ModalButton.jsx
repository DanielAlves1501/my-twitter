import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ModalButton = ({ buttonText, path }) => {
  return <ModalBtn to={path}>{buttonText}</ModalBtn>;
};

const ModalBtn = styled(Link)`
  width: 100%;
  background-color: var(--black);
  color: #fff;
  padding: 8px 0;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export default ModalButton;
