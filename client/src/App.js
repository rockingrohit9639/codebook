import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/Signup/Signup";
import { setAuth, setUser } from "./redux/userRedux";
import Logout from "./Components/Logout/Logout";
import Profile from "./Components/Profile/Profile";
import CreatePost from "./Components/CreatePost/CreatePost";
import server from "./axios/instance";
import Home from "./Components/Home/Home";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("@ttookk");

  useEffect(() => {
    if (localStorage.getItem("@ttookk")) {
      dispatch(setAuth(true));
      dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
      server.defaults.headers["token"] = `Bearer ${JSON.parse(token)}`;
    } else {
      dispatch(setAuth(false));
    }
  }, [token, dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
