import React from "react";
import { Container } from "../Basic/Basic";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";

const PostContainer = styled.div`
  max-width: 60%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 7px 10px -10px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  gap: 1rem;
`;

const AuthorContainer = styled.div``;

const AuthorName = styled.h1`
  font-size: 1rem;
`;

const Time = styled.p`
  font-size: 0.8rem;
  color: #5a5a5a;
`;

const HeaderRight = styled.div``;

const Content = styled.div`
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const PostBottom = styled.div`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function Post() {
  return (
    <Container>
      <PostContainer>
        <Header>
          <HeaderLeft>
            <Avatar
              alt="Rohit Saini"
              src="https://www.indiewire.com/wp-content/uploads/2021/06/MCDAVAT_FE094.jpg?resize=960,540"
            />
            <AuthorContainer>
              <AuthorName>Rohit Saini</AuthorName>
              <Time>2 days ago</Time>
            </AuthorContainer>
          </HeaderLeft>
          <HeaderRight>
            <MoreHorizIcon style={{ cursor: "pointer" }} />
          </HeaderRight>
        </Header>

        <Content>
          <Image
            src="https://code.visualstudio.com/assets/docs/editor/userdefinedsnippets/builtin-javascript-snippets.png"
            alt="post"
          />
        </Content>

        <PostBottom>
          <FavoriteBorderIcon style={{ cursor: "pointer" }} />
          <CommentIcon style={{ cursor: "pointer" }} />
          <ShareIcon style={{ cursor: "pointer" }} />
        </PostBottom>
      </PostContainer>
    </Container>
  );
}

export default Post;
