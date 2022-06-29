import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import { deletePost } from "../../redux/postsRedux";
import server from "../../axios/instance";
import { handlePostImageDelete } from "../../utils/firebase";
import { motion } from "framer-motion";

const PostContainer = styled(motion.div)`
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
  cursor: pointer;
`;

const Time = styled.p`
  font-size: 0.8rem;
  color: #5a5a5a;
`;

const HeaderRight = styled.div``;

const Content = styled.div`
  width: 100%;
`;

const PostTitle = styled.p`
  font-size: 1rem;
  padding: 1rem 2rem;
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

const DeleteButton = styled.button`
  border: none;
  outline: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  cursor: pointer;
  background-color: #fad4d4;
`;

function Post({ post }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDeletePost = async () => {
    const userRes = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (userRes) {
      try {
        const res = await server.delete(`/posts/deletePost/${post.postID}`);

        if (res.status === 200) {
          dispatch(deletePost(post.postID));
          await handlePostImageDelete(post.imgURL);
        } else {
          toast.error("Error deleting post");
        }
      } catch (err) {
        if (err.response) {
        }
        console.log(err);
      }
    } else {
      return null;
    }
  };

  return (
    <PostContainer
      layout
      initial={{ y: "-300px", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header>
        <HeaderLeft>
          <Avatar
            alt={post?.user.username}
            src={post?.user.photoURL || "/assets/images/logo.png"}
          />
          <AuthorContainer>
            <AuthorName
              onClick={() => navigate(`/profile/${post.user.userID}`)}
            >
              {post?.user?.username}
            </AuthorName>
            <Time>{moment(post?.createdAt).fromNow()}</Time>
          </AuthorContainer>
        </HeaderLeft>
        {user?.userID === post?.user?.userID && (
          <HeaderRight>
            <DeleteButton onClick={handleDeletePost}>
              <DeleteIcon style={{ color: "#FF0000" }} />
            </DeleteButton>
          </HeaderRight>
        )}
      </Header>

      <Content>
        <PostTitle>{post.postTitle}</PostTitle>
        <Image src={post.imgURL || "/assets/images/logo.png"} alt="post" />
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
