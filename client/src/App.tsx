import { Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import CreateRoom from "./components/LandingPage/create-room";
import JoinRoom from "./components/LandingPage/join-room";
import EditorPage from "./pages/EditorPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/editor" element={<EditorPage />} />
      <Route path="create" element={<CreateRoom />} />
      <Route path="join" element={<JoinRoom />} />
      {/* <Route path="room/:roomId" element={<Room />} /> */}
    </Routes>
  );
};

export default App;
