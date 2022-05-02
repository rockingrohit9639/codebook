import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Post from "./Components/Posts/Post";
import Profile from "./Components/Profile/Profile";
import Signup from "./Components/Signup/Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
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
