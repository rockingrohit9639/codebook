import { Avatar } from "@mui/material";
import React from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const FriendContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: clamp(10rem, 30vw, 20rem);
  border: 2px solid #0000005f;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
`;

const FriendName = styled.h1`
  font-size: 1.2rem;
  cursor: pointer;
`;

const DeleteIconBox = styled.div`
  cursor: pointer;
  background: rgba(255, 68, 68, 0.33);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

function Friend({ friend }) {
  const navigate = useNavigate();

  return (
    <FriendContainer>
      <Avatar alt="friend" src={friend.photoURL || "/assets/images/logo.png"} />
      <FriendName onClick={() => navigate(`/profile/${friend.userID}`)}>
        {friend.username}
      </FriendName>
      <DeleteIconBox>
        <DeleteIcon style={{ color: "red" }} />
      </DeleteIconBox>
    </FriendContainer>
  );
}

export default Friend;
