import React, { useState } from "react";
import { ColorExtractor } from "react-color-extractor";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Post from "../Posts/Post";
import Modal from "@mui/material/Modal";
import { Button } from "../Basic/Basic";

const ProfileComponent = styled.div``;

const ProfileBg = styled.div`
  width: 100%;
  height: 20vh;
  background-color: ${(props) => props.bgColor};
`;

const ProfileInfo = styled.div`
  padding: 1rem clamp(2rem, 12vw, 6rem);
  display: flex;
  justify-content: space-between;
`;

const ProfileInfoLeft = styled.div`
  height: 15rem;
  transform: translateY(-40%);
  flex: 30%;
`;

const ProfileInfoCenter = styled.div`
  flex: 50%;
`;

const ProfileInfoRight = styled.div`
  flex: 20%;
`;

const ProfileName = styled.h2`
  font-size: 1.5rem;
`;

const ProfileEmail = styled.p`
  font-size: 1rem;
  color: #939393;
  line-height: 2.5rem;
`;

const ProfileBio = styled.p``;

const ProfileImageBox = styled.div``;

const TabsBox = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 1rem clamp(2rem, 12vw, 6rem);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Tab = styled(Link)`
  color: #fff;
  background-color: var(--primary-color);
  padding: 0.5rem 1rem;
  border-radius: 5px;
`;

const ProfileDetails = styled.div`
  display: flex;
  padding: 1rem clamp(2rem, 12vw, 6rem);
`;

const ProfileDetailsLeft = styled.div`
  flex: 30%;
  padding: 2rem;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 10px 12px 15px -10px rgba(0, 0, 0, 0.2);
`;

const AboutTitle = styled.h1``;

const Row = styled.div`
  margin-block: 1rem;
  display: flex;
  justify-content: space-between;
`;

const RowHead = styled.h3``;

const RowItem = styled.p``;

const FriendRequestButton = styled.button`
  width: 100%;
  margin-top: 1rem;
  border: none;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

const ProfileDetailsRight = styled.div`
  flex: 70%;
`;

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #fff;
  transform: translate(-50%, -50%);
  padding: 2rem;
  border-radius: 10px;
  width: 50%;
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding: 0.5rem 0.8rem;
  background-color: #efefef;
  border-radius: 5px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  border: none;
  outline: none;
  padding: 0.5rem 0.8rem;
  background-color: #efefef;
  border-radius: 5px;
  font-size: 1rem;
`;

const ModalButton = styled.button``;

function Profile() {
  const [bgColor, setBgColor] = useState("");
  const [open, setOpen] = useState(false);

  const getColors = (colors) => {
    setBgColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ProfileComponent>
      <ProfileBg bgColor={bgColor} />
      <ProfileInfo>
        <ProfileInfoLeft>
          <ProfileImageBox>
            <ColorExtractor getColors={getColors}>
              <img
                style={{
                  width: "18rem",
                  height: "18rem",
                  borderRadius: "50%",
                  border: "5px solid #F3F5F8",
                }}
                src="https://i.imgur.com/OCyjHNF.jpg"
                alt="alternate"
              />
            </ColorExtractor>
          </ProfileImageBox>
        </ProfileInfoLeft>
        <ProfileInfoCenter>
          <ProfileName>_rohit__404</ProfileName>
          <ProfileEmail>rohit@gmail.com</ProfileEmail>
          <ProfileBio>Lemme show my code on Codebook.</ProfileBio>
        </ProfileInfoCenter>
        <ProfileInfoRight>
          <Button onClick={() => setOpen(true)}>Edit Profile</Button>
        </ProfileInfoRight>
      </ProfileInfo>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <h1>Edit Profile</h1>

          <hr style={{ marginBottom: "1rem" }} />

          <Row>
            <RowHead>Profile Photo</RowHead>
            <RowItem>
              <Input type={"file"} />
            </RowItem>
          </Row>

          <Row>
            <RowHead>DOB</RowHead>
            <RowItem>
              <Input type={"date"} />
            </RowItem>
          </Row>

          <Row>
            <RowHead>Website</RowHead>
            <RowItem>
              <Input type={"url"} />
            </RowItem>
          </Row>

          <Row>
            <RowHead>Bio</RowHead>
            <RowItem>
              <TextArea rows={5}> </TextArea>
            </RowItem>
          </Row>

          <Button>Submit</Button>
        </ModalBox>
      </Modal>

      <TabsBox>
        <Tab to={"/profile"}>About</Tab>
        <Tab to={"/friends"}>Friends</Tab>
      </TabsBox>

      <ProfileDetails>
        <ProfileDetailsLeft>
          <AboutTitle>About</AboutTitle>
          <hr />
          <Row>
            <RowHead>DOB</RowHead>
            <RowItem>24/02/2001</RowItem>
          </Row>

          <Row>
            <RowHead>Gender</RowHead>
            <RowItem>Male</RowItem>
          </Row>

          <Row>
            <RowHead>Friends</RowHead>
            <RowItem>50</RowItem>
          </Row>

          <FriendRequestButton>Friend Requests</FriendRequestButton>
        </ProfileDetailsLeft>
        <ProfileDetailsRight>
          <Post />
        </ProfileDetailsRight>
      </ProfileDetails>
    </ProfileComponent>
  );
}

export default Profile;
