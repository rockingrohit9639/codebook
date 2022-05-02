import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/Signup/Signup";
import Post from "./Components/Posts/Post";
import { setAuth } from "./redux/userRedux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("@ttookk") !== "") {
      dispatch(setAuth(true));
    } else {
      dispatch(setAuth(true));
    }
  }, [localStorage.getItem("@ttookk"), dispatch]);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Post /> */}
          {/* <Profile /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
