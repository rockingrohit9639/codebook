import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Post from "./Components/Posts/Post";

function App() {
  return (
    <div className="App">
      
      <Router>
        <Navbar />
        <Post />
      </Router>
     
    </div>
  );
}

export default App;
