import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
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
import { setAllPosts } from "./redux/postsRedux";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("@ttookk");
  const userID = localStorage.getItem("userID");
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const getBasicInfo = async () => {
      try {
        const userInfo = await server.get(
          `/users/details/${JSON.parse(userID)}`
        );
        dispatch(setUser(userInfo.data));
        dispatch(
          setUserFriends(
            userInfo.data.friends.filter((friend) => friend.status === 1)
          )
        );
        dispatch(setUserPosts(userInfo.data.posts));

        const { data } = await server.get("/posts/getAllPosts");
        const posts = data.sort(
          (a, b) =>
            Date.parse(new Date(b.createdAt)) -
            Date.parse(new Date(a.createdAt))
        );
        dispatch(setAllPosts(posts));
      } catch (err) {
        console.log(err);
      }
    };

    if (localStorage.getItem("@ttookk")) {
      dispatch(setAuth(true));
      server.defaults.headers["token"] = `Bearer ${JSON.parse(token)}`;
      getBasicInfo();
    } else {
      dispatch(setAuth(false));
    }
  }, [token, dispatch, userID, isAuthenticated]);

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
