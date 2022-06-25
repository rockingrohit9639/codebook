import React, { useState } from "react";
import { ColorExtractor } from "react-color-extractor";
// import { Link } from "react-router-dom";
import styledComponents from "styled-components";
import Modal from "@mui/material/Modal";
import { Button } from "../Basic/Basic";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Friend from "../Friend/Friend";
import { handleProfilePhotoUpload } from "../../utils/handleProfilePhotoUpload";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import server from "../../axios/instance";
import { CircularProgress } from "@mui/material";

const ProfileComponent = styledComponents.div``;

const ProfileBg = styledComponents.div`
  width: 100%;
  height: 20vh;
  background-color: ${(props) => props.bgColor};
`;

const ProfileInfo = styledComponents.div`
  padding: 1rem clamp(2rem, 12vw, 6rem);
  display: flex;
  justify-content: space-between;
`;

const ProfileInfoLeft = styledComponents.div`
  height: 15rem;
  transform: translateY(-40%);
  flex: 30%;
`;

const ProfileInfoCenter = styledComponents.div`
  flex: 50%;
`;

const ProfileInfoRight = styledComponents.div`
  flex: 20%;
`;

const ProfileName = styledComponents.h2`
  font-size: 1.5rem;
`;

const ProfileEmail = styledComponents.p`
  font-size: 1rem;
  color: #939393;
  line-height: 2.5rem;
`;

const ProfileBio = styledComponents.p``;

const ProfileImageBox = styledComponents.div``;

const TabsBox = styledComponents.div`
  width: 100%;
  background-color: #fff;
  padding: 1rem clamp(2rem, 12vw, 6rem);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// const StyledTab = styledComponents(Tabs)`
//   color: #000;
//   padding: 0.5rem 1rem;
//   border-radius: 5px;
//   &.active {
//     color: #fff;
//     background-color: var(--primary-color);
//   }
// `;

const ProfileDetails = styledComponents.div`
  display: flex;
  padding: 1rem clamp(2rem, 12vw, 6rem);
`;

const ProfileDetailsLeft = styledComponents.div`
  flex: 30%;
  padding: 2rem;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 10px 12px 15px -10px rgba(0, 0, 0, 0.2);
`;

const AboutTitle = styledComponents.h1``;

const Row = styledComponents.div`
  margin-block: 1rem;
  display: flex;
  justify-content: space-between;
`;

const RowHead = styledComponents.h3``;

const RowItem = styledComponents.p``;

const FriendRequestButton = styledComponents.button`
  width: 100%;
  margin-top: 1rem;
  border: none;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

const ProfileDetailsRight = styledComponents.div`
  flex: 70%;
`;

const ModalBox = styledComponents.div`
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #fff;
  transform: translate(-50%, -50%);
  padding: 2rem;
  border-radius: 10px;
  width: 50%;
`;

const Input = styledComponents.input`
  border: none;
  outline: none;
  padding: 0.5rem 0.8rem;
  background-color: #efefef;
  border-radius: 5px;
  font-size: 1rem;
`;

const TextArea = styledComponents.textarea`
  border: none;
  outline: none;
  padding: 0.5rem 0.8rem;
  background-color: #efefef;
  border-radius: 5px;
  font-size: 1rem;
`;

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    color: "#000",
    borderRadius: "5px",
    "&.Mui-selected": {
      color: "#fff",
      backgroundColor: "#5701ff",
    },
  })
);

const Friends = styledComponents.div`
  margin: 1rem clamp(2rem, 12vw, 6rem);
  background: #FFF;
  padding: 2rem;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
`;

function Profile() {
  const [bgColor, setBgColor] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("one");
  const [imageLoading, setImageLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getColors = (colors) => {
    setBgColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProfileUpload = async (e) => {
    const image = e.target.files[0];
    // Uploading image to firebase storage
    if (!image) {
      toast.error("Please select an image.");
      return;
    }

    if (
      image.type !== "image/jpeg" &&
      image.type !== "image/png" &&
      image.type !== "image/jpg"
    ) {
      toast.error("Please select a valid image.");
      return;
    }

    const url = await handleProfilePhotoUpload(
      image,
      user.username,
      setImageLoading
    );

    if (url) {
      try {
        // Updating profile photo in database
        const res = await server.put(`/users/update/${user.userID}`, {
          photoURL: url,
        });

        if (res.status === 200) {
          toast.success("Profile photo updated successfully.");
        }
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.message);
        }
        console.log(err);
      }
    } else {
      toast.error("Error uploading image.");
    }
  };

  return (
    <ProfileComponent>
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
              <Input
                type={"file"}
                onChange={handleProfileUpload}
                accept="image/x-png,image/jpeg,png"
              />
            </RowItem>
          </Row>

          {imageLoading && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CircularProgress
                style={{ color: "#5701ff", marginRight: "2rem" }}
                size={20}
              />
              <Typography>Uploading image...</Typography>
            </Box>
          )}

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
              <TextArea rows={5}></TextArea>
            </RowItem>
          </Row>

          <Button>Submit</Button>
        </ModalBox>
      </Modal>

      <TabContext value={value}>
        <TabsBox>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            <StyledTab label="About" value={"one"} />
            <StyledTab label="Friends" value={"two"} />
          </StyledTabs>
        </TabsBox>

        <TabPanel value={"one"}>
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
            <ProfileDetailsRight>{/* <Post /> */}</ProfileDetailsRight>
          </ProfileDetails>
        </TabPanel>

        <TabPanel value="two">
          <Friends>
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
          </Friends>
        </TabPanel>
      </TabContext>
    </ProfileComponent>
  );
}

export default Profile;
