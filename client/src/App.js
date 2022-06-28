import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/Signup/Signup";
import {
  setAuth,
  setUser,
  setUserFriends,
  setUserPosts,
} from "./redux/userRedux";
import Logout from "./Components/Logout/Logout";
import Profile from "./Components/Profile/Profile";
import CreatePost from "./Components/CreatePost/CreatePost";
import server from "./axios/instance";
import Home from "./Components/Home/Home";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("@ttookk");
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await server.get(`/users/details/${JSON.parse(userID)}`);
      dispatch(setUser(userInfo.data));
      dispatch(setUserFriends(userInfo.data.friends));
      dispatch(setUserPosts(userInfo.data.posts));
    };
    if (localStorage.getItem("@ttookk")) {
      dispatch(setAuth(true));
      server.defaults.headers["token"] = `Bearer ${JSON.parse(token)}`;
      getUserInfo();
    } else {
      dispatch(setAuth(false));
    }
  }, [token, dispatch, userID]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile/:userID" element={<Profile />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
