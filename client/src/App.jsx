import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./style.css";
import "./responsive.css";
import LoginScreen from "./auth/LoginScreen";
import ProjectIndexScreen from "./project/ProjectIndexScreen";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/projects' element={<ProjectIndexScreen />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
