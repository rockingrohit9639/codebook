import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

function Loading({ loading, title }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <Content>
        <CircularProgress style={{ color: "#5701ff" }} />

        <h1>{title}</h1>
      </Content>
    </Backdrop>
  );
}

export default Loading;
