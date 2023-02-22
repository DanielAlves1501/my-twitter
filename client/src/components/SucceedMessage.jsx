import React from "react";
import styled from "styled-components";

const SucceedMessage = ({ message }) => {
  return (
    <SucceedMesageCard>
      <p>{message}</p>
    </SucceedMesageCard>
  );
};

const SucceedMesageCard = styled.div`
  width: 100%;
  background: #00a752;
  padding: 10px;
  color: #fff;
  border-radius: 10px;
`;

export default SucceedMessage;
