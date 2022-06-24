import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import moment from "moment";

const PostContainer = styled.div`
  max-width: 100%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 7px 10px -10px rgba(0, 0, 0, 0.2);
  margin-top: 1rem;
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

function Post({ post }) {
  return (
    <PostContainer>
      <Header>
        <HeaderLeft>
          <Avatar
            alt={post.user.username}
            src={post.user.photoURL !== null ? post.user.photoURL : ""}
          />
          <AuthorContainer>
            <AuthorName>{post.user.username}</AuthorName>
            <Time>{moment(post.createdAt).fromNow()}</Time>
          </AuthorContainer>
        </HeaderLeft>
        <HeaderRight>
          <MoreHorizIcon style={{ cursor: "pointer" }} />
        </HeaderRight>
      </Header>

      <Content>
        <Image src={post.imgURL} alt="post" />
      </Content>

      <PostBottom>
        <FavoriteBorderIcon style={{ cursor: "pointer" }} />
        <CommentIcon style={{ cursor: "pointer" }} />
        <ShareIcon style={{ cursor: "pointer" }} />
      </PostBottom>
    </PostContainer>
  );
}

export default Post;
