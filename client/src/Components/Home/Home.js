import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import server from "../../axios/instance";
import Friend from "../Friend/Friend";
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
  flex: 70%;
  padding: 2rem;
`;

const HomeRight = styled.div`
  flex: 30%;
  padding: 2rem 1rem;
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

const FriendsBox = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 5px 15px -10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [userFriends, setUserFriends] = useState([]);

  useEffect(() => {
    const getAllPosts = async () => {
      const res = await server.get("/posts/getAllPosts");
      setAllPosts(res.data);
    };

    setUserFriends(user.friends);

    getAllPosts();
  }, [user]);

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
      <HomeRight>
        {isAuthenticated && userFriends?.length > 0 ? (
          <FriendsBox>
            <Title>Your Friends</Title>
            {userFriends?.map((friend, index) => (
              <Friend
                key={index}
                friend={friend}
                style={{ marginTop: "1rem" }}
              />
            ))}
          </FriendsBox>
        ) : null}
      </HomeRight>
    </Container>
  );
}

export default Home;
