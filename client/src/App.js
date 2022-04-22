import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
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
        {/* <Post /> */}
        {/* <Login /> */}
        {/* <Signup /> */}
        <Profile />
        
      </Router>
     
    </div>
  );
}

export default App;
