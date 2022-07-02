import React, { useEffect, useState } from "react";
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
import { handleProfilePhotoUpload } from "../../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import server from "../../axios/instance";
import { CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  setUserProfilePhoto,
  updateUserDetails,
  updateUserFriends,
} from "../../redux/userRedux";
import Dropdown from "../Dropdown/Dropdown";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import LanguageIcon from "@mui/icons-material/Language";
import { handleFriendshipStatus } from "../../utils/utils";
import Post from "../Posts/Post";
import FriendRequest from "../FriendRequest/FriendRequest";

const ProfileComponent = styledComponents.div``;

const ProfileBg = styledComponents.div`
  width: 100%;
  height: 20vh;
  background-color: ${(props) => props.bgColor || "green"};
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
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
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
  gap: 2rem;
`;

const ProfileDetailsLeft = styledComponents.div`
  flex: 30%;
  padding: 2rem;
  margin-top: 1rem;
  background-color: #fff;
  border-radius: 5px;
  max-height: 20rem;
  box-shadow: 10px 12px 15px -10px rgba(0, 0, 0, 0.2);
`;

const AboutTitle = styledComponents.h1``;

const Row = styledComponents.div`
  margin-block: 1rem;
  display: flex;
  justify-content: space-between;
`;

const RowHead = styledComponents.h3``;

const RowItem = styledComponents.div``;

const ProfileDetailsRight = styledComponents.div`
  flex: 70%;
  position: sticky;
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const NoFriends = styledComponents.h2`
  font-size: 1.5rem;
`;

const FriendButton = styledComponents.button`
  border: none;
  outline: none;
  padding: 0.54rem 1.3rem;
  font-size: 0.9rem;
  cursor: pointer;
  background: var(--primary-color);
  color: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function Profile() {
  const [bgColor, setBgColor] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("one");
  const [imageLoading, setImageLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { userID } = useParams();

  const dispatch = useDispatch();

  const [userProfile, setUserProfile] = useState({});
  const [userFriends, setUserFriends] = useState([]);
  const [userFriendRequests, setUserFriendRequests] = useState([]);

  const [dob, setDob] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const [friendship, setFriendship] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      if (userID === localStorage.getItem("userID")) {
        setUserProfile(user);
        setDob(user.dob);
        setWebsite(user.website);
        setBio(user.bio);
        setGender(user.gender);
        setUserFriends(user?.friends?.filter((friend) => friend.status === 1));
        setUserFriendRequests(
          user?.friends?.filter(
            (friend) => friend.status === 0 && friend.type === "sender"
          )
        );
        const fship = handleFriendshipStatus(user.friends, userID);
        setFriendship(fship);
      } else {
        // Getting user profile
        const res = await server.get(`/users/details/${userID}`);
        setUserProfile(res.data);
        setDob(res.data.dob);
        setWebsite(res.data.website);
        setBio(res.data.bio);
        setGender(res.data.gender);
        setUserFriends(
          res?.data?.friends.filter((friend) => friend.status === 1)
        );
        setUserFriendRequests(
          res?.data?.friends?.filter(
            (friend) => friend.status === 0 && friend.type === "sender"
          )
        );
        const fship = handleFriendshipStatus(res.data.friends, userID);
        setFriendship(fship);
      }
    };

    const token = JSON.parse(localStorage.getItem("@ttookk"));

    if (!token) {
      navigate("/login");
      return;
    } else {
      getUserProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, userID, user]);

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
        // Updating user in redux
        dispatch(setUserProfilePhoto(url));

        // Updating profile photo in database
        const res = await server.put("/users/update", {
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

  const handleProfileDetailsUpdate = async () => {
    try {
      const data = {};

      if (dob !== "") {
        data.DOB = dob;
      }
      if (website !== "") {
        const expression =
          /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
        const regex = new RegExp(expression);

        if (!website?.match(regex)) {
          toast.error("Please enter a valid website URL.");
          return;
        } else {
          data.website = website;
        }
      }
      if (bio !== "") {
        data.bio = bio;
      }

      if (gender !== "") {
        data.gender = gender;
      }

      const res = await server.put("/users/update", data);
      if (res.status === 200) {
        dispatch(updateUserDetails(data));
        toast.success(res.data.message);
      } else {
        toast.error("Could not update your profile.");
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
      console.log(err);
    }
  };

  const handleSendFriendRequest = async () => {
    if (friendship) {
      toast.error(
        "You are already friends with this user. There is something wrong with UI."
      );
      return;
    }

    try {
      const res = await server.post("/friends/friendRequest", {
        receiverID: userID,
      });

      if (res.status === 200) {
        setFriendship(res.data.body);
        toast.success(res.data.message);
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
      console.log(err);
    }
  };

  const handleAcceptReqeust = async (friendshipID) => {
    console.log("running");
    if (!friendshipID) {
      toast.error("Request is not valid.");
      return;
    }
    try {
      const res = await server.post(
        `/friends/friendRequest/accept/${friendshipID}`
      );
      if (res.status === 200) {
        setFriendship((prevFriendship) => {
          return { ...prevFriendship, status: 1 };
        });

        setUserFriends((prevFriends) => {
          return [...prevFriends, friendship];
        });
        dispatch(
          updateUserFriends({
            userID,
            username: userProfile.username,
            photoURL: userProfile.photoURL,
            status: 1,
          })
        );
      } else {
        toast.error("Something went wrong.");
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
      console.log(err);
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
                  objectFit: "cover",
                }}
                src={userProfile?.photoURL || "/assets/images/logo.png"}
                alt={userProfile?.username}
              />
            </ColorExtractor>
          </ProfileImageBox>
        </ProfileInfoLeft>
        <ProfileInfoCenter>
          <ProfileName>{userProfile?.username}</ProfileName>
          <ProfileEmail>{userProfile?.email}</ProfileEmail>
          <ProfileBio>{userProfile?.bio}</ProfileBio>
          {userProfile.website && (
            <LanguageIcon
              style={{
                marginTop: "0.5rem",
                color: "var(--primary-color)",
                cursor: "pointer",
              }}
              onClick={() => window.open(userProfile.website)}
            />
          )}
        </ProfileInfoCenter>

        <ProfileInfoRight>
          {user.userID === userProfile?.userID && (
            <Button onClick={() => setOpen(true)}>Edit Profile</Button>
          )}

          {friendship?.status === 1 && (
            <FriendButton style={{ backgroundColor: "red" }}>
              <PersonRemoveIcon />
              Remove Friend
            </FriendButton>
          )}

          {friendship?.status === 0 &&
            (friendship.type === "sender" ? (
              <FriendButton style={{ backgroundColor: "red" }}>
                <CancelIcon />
                Cancel Friend Request
              </FriendButton>
            ) : (
              <>
                <FriendButton
                  style={{ backgroundColor: "green" }}
                  onClick={() => handleAcceptReqeust(friendship.friendshipID)}
                >
                  <PersonAddIcon />
                  Accept Friend Request
                </FriendButton>
                <FriendButton style={{ backgroundColor: "grey " }}>
                  <PersonAddIcon />
                  Reject Friend Request
                </FriendButton>
              </>
            ))}

          {!friendship && parseInt(userID) !== user?.userID && (
            <FriendButton onClick={handleSendFriendRequest}>
              <AddIcon />
              Add Friend
            </FriendButton>
          )}
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
              <Input
                type={"date"}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </RowItem>
          </Row>

          <Row>
            <RowHead>Website</RowHead>
            <RowItem>
              <Input
                type={"url"}
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </RowItem>
          </Row>

          <Row>
            <RowHead>Gender</RowHead>
            <RowItem>
              <Dropdown
                label={"Gender"}
                list={[
                  {
                    name: "Male",
                    value: "male",
                  },
                  {
                    name: "Female",
                    value: "female",
                  },
                ]}
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                valueKey={"value"}
              />
            </RowItem>
          </Row>

          <Row>
            <RowHead>Bio</RowHead>
            <RowItem>
              <TextArea
                rows={5}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></TextArea>
            </RowItem>
          </Row>

          <Button onClick={handleProfileDetailsUpdate}>Submit</Button>
        </ModalBox>
      </Modal>

      <TabContext value={value}>
        <TabsBox>
          <StyledTabs value={value} onChange={handleChange}>
            <StyledTab label="About" value={"one"} />
            <StyledTab label="Friends" value={"two"} />
            {userID === localStorage.getItem("userID") && (
              <StyledTab label="Friend Requests" value={"three"} />
            )}
          </StyledTabs>
        </TabsBox>

        <TabPanel value={"one"}>
          <ProfileDetails>
            <ProfileDetailsLeft>
              <AboutTitle>About</AboutTitle>
              <hr />
              {userProfile?.DOB && (
                <Row>
                  <RowHead>DOB</RowHead>
                  <RowItem>{userProfile?.DOB}</RowItem>
                </Row>
              )}

              {userProfile?.gender && (
                <Row>
                  <RowHead>Gender</RowHead>
                  <RowItem>{userProfile?.gender}</RowItem>
                </Row>
              )}

              <Row>
                <RowHead>Friends</RowHead>
                <RowItem>{userFriends?.length}</RowItem>
              </Row>
            </ProfileDetailsLeft>
            <ProfileDetailsRight>
              {userProfile?.posts?.length > 0 &&
                userProfile?.posts?.map((post, index) => (
                  <Post key={index} post={post} />
                ))}
            </ProfileDetailsRight>
          </ProfileDetails>
        </TabPanel>

        <TabPanel value="two">
          <Friends>
            {userFriends?.length > 0 ? (
              userFriends?.map((friend, index) => (
                <Friend key={index} friend={friend} />
              ))
            ) : (
              <NoFriends>User have no friends.</NoFriends>
            )}
          </Friends>
        </TabPanel>

        {userID === localStorage.getItem("userID") && (
          <TabPanel value="three">
            <Friends>
              {userFriendRequests?.length > 0 &&
                userFriendRequests.map((request, index) => (
                  <FriendRequest
                    key={index}
                    request={request}
                    handleAcceptReqeust={handleAcceptReqeust}
                  />
                ))}
            </Friends>
          </TabPanel>
        )}
      </TabContext>
    </ProfileComponent>
  );
}

export default Profile;
