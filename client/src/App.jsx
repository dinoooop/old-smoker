import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./front/auth/LoginScreen";
import ProjectIndexScreen from "./admin/project/ProjectIndexScreen";

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
