import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Post from "./Components/Posts/Post";

function App() {
  return (
    <div className="App">
      
      <Router>
        <Navbar />
        {/* <Post /> */}
        <Login />
      </Router>
     
    </div>
  );
}

export default App;
