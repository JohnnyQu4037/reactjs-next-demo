import React from "react";
import styled from "styled-components";

const StyledContent = styled.div`
  margin: 16px;
  background-color: rgb(255, 255, 255);
  padding: 16px;
  min-height: auto;
  flex: auto;
`;

const AppLayoutContent = ({ children }: any) => {
  return <StyledContent>{children}</StyledContent>;
};
export default AppLayoutContent;
