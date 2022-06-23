import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavbarContainer = styled.div`
  width: 100%;
  height: 60px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 9px 48px -25px rgba(0, 0, 0, 0.25);
  padding: 0 clamp(2rem, 12vw, 6rem);
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  @media only screen and (max-width: 680px) {
    padding: 0 clamp(1rem, 12vw, 2rem);
  }
`;

const Left = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

const Span = styled.span`
  color: #5701ff;
`;
const Name = styled(Link)`
  color: #000;
`;

const Center = styled.form`
  width: 50%;
  background: #f3f5f8;
  border-radius: 50px;
  padding: 0.4rem 1rem;

  @media only screen and (max-width: 570px) {
    /* display: none; */
  }
`;

const SearchIconBox = styled.div`
  display: none;
  @media only screen and (max-width: 570px) {
    /* display: flex; */
    align-items: center;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.9rem;
  margin-left: 0.5rem;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LinkBox = styled(Link)`
  color: #000;
  &:hover {
    color: var(--primary-color);
  }
`;

function Navbar() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const user = useSelector((state) => state.user);

  return (
    <NavbarContainer>
      <Left>
        <Name to={"/"}>
          <Span>C</Span>odebook
        </Name>
      </Left>

      <Center>
        <SearchBox>
          <SearchIcon style={{ cursor: "pointer", opacity: 0.5 }} />

          <Input placeholder="Search for codes..." />
        </SearchBox>
      </Center>

      {isAuthenticated ? (
        <Right>
          <SearchIconBox>
            <SearchIcon />
          </SearchIconBox>
          <NotificationsIcon style={{ cursor: "pointer" }} />
          <ChatIcon style={{ cursor: "pointer" }} />
          <Avatar alt={user.username} src={user.photoURL} />
          <LinkBox to="/logout">Logout</LinkBox>
        </Right>
      ) : (
        <Right>
          <LinkBox to="/login">Login</LinkBox>
          <LinkBox to="/signup">Sign Up</LinkBox>
        </Right>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
