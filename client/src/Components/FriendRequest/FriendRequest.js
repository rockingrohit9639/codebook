import { Avatar } from "@mui/material";
import React from "react";
import styled from "styled-components";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const FriendRequestWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.8rem 1rem;
  border-radius: 10px;
`;

const FriendRequestUserName = styled.h3`
  margin: 0 0.5rem;
`;

const RequestButton = styled.button`
  border: none;
  outline: none;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${(props) => props.bgColor || "#fff"};
`;

function FriendRequest({ request, handleAcceptReqeust }) {
  return (
    <FriendRequestWrapper>
      <Avatar
        src={request.photoURL || "/assets/images/logo.png"}
        alt="friend request"
      />
      <FriendRequestUserName>{request.username}</FriendRequestUserName>

      <RequestButton
        bgColor="#d3ffcf"
        onClick={() => handleAcceptReqeust(request.friendshipID)}
      >
        <PersonAddIcon style={{ color: "green" }} />
      </RequestButton>

      <RequestButton bgColor="rgba(255, 68, 68, 0.33)">
        <PersonRemoveIcon style={{ color: "red" }} />
      </RequestButton>
    </FriendRequestWrapper>
  );
}

export default FriendRequest;
