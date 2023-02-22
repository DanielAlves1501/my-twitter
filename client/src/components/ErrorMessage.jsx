import React from "react";
import styled from "styled-components";

const ErrorMessage = ({ message }) => {
  return (
    <SucceedMesageCard>
      <p>{message}</p>
    </SucceedMesageCard>
  );
};

const SucceedMesageCard = styled.div`
  width: 100%;
  background: #e41d49;
  padding: 10px;
  color: #fff;
  border-radius: 10px;
`;

export default ErrorMessage;
