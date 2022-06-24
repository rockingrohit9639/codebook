import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/Signup/Signup";
import Post from "./Components/Posts/Post";
import { setAuth, setUser } from "./redux/userRedux";
import Logout from "./Logout/Logout";
import Profile from "./Components/Profile/Profile";
import CreatePost from "./Components/CreatePost/CreatePost";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("@ttookk");

  useEffect(() => {
    if (localStorage.getItem("@ttookk")) {
      dispatch(setAuth(true));
      dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
    } else {
      dispatch(setAuth(false));
    }
  }, [token, dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-post" element={<CreatePost />} />

          {/* <Post /> */}
          {/* <Profile /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
