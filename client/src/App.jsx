import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./front/auth/LoginScreen";
import RegisterScreen from "./front/auth/RegisterScreen";
import ProjectIndexScreen from "./admin/project/ProjectIndexScreen";
import ProjectCreateScreen from "./admin/project/ProjectCreateScreen";
import ProjectEditScreen from "./admin/project/ProjectEditScreen";
import HomeScreen from "./front/pages/HomeScreen";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/admin/projects' element={<ProjectIndexScreen />} />
          <Route path='/admin/projects/create' element={<ProjectCreateScreen />} />
          <Route path='/admin/projects/:id' element={<ProjectEditScreen />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
