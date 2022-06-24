import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import server from "../../axios/instance";
import Post from "../Posts/Post";

const Container = styled.div`
  width: 100%;
  padding: 0 clamp(2rem, 12vw, 6rem);
  display: flex;

  @media only screen and (max-width: 680px) {
    padding: 0 clamp(1rem, 12vw, 2rem);
  }
`;

const HomeLeft = styled.div`
  flex: 1;
  padding: 2rem;
`;

const HomeRight = styled.div`
  flex: 1;
`;

const AddPostButton = styled.button`
  background-color: var(--primary-color);
  width: 100%;
  border: none;
  outline: none;
  color: #fff;
  padding: 1rem 0;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 4px 13px -1px rgba(87, 1, 255, 0.5);
`;

function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllPosts = async () => {
      const res = await server.get("/posts/getAllPosts");
      setAllPosts(res.data);
    };

    getAllPosts();
  }, []);

  return (
    <Container>
      <HomeLeft>
        <AddPostButton onClick={() => navigate("/create-post")}>
          Add New Code
        </AddPostButton>

        {allPosts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </HomeLeft>
      <HomeRight>right</HomeRight>
    </Container>
  );
}

export default Home;
