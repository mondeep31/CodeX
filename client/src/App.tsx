import { Route, Routes } from "react-router-dom";
import CodeEditorPage from "./pages/CodeEditorPage";
import LandingPage from "./pages/LandingPage";
import CreateRoom from "./components/LandingPage/create-room";
import JoinRoom from "./components/LandingPage/join-room";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/editor" element={<CodeEditorPage />} />
      <Route path="create" element={<CreateRoom />} />
      <Route path="join" element={<JoinRoom />} />
      {/* <Route path="room/:roomId" element={<Room />} /> */}
    </Routes>
  );
};

export default App;
