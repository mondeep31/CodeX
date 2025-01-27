import { Route, Routes } from "react-router-dom";
import Login from "./pages/Signin";
import Signup from "./pages/Signup";
import CodeEditorPage from "./pages/CodeEditorPage";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/editor" element={<CodeEditorPage />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
