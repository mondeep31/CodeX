import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomGenerator from "./screens/RoomGenerator";
import CollaborationUI from "./screens/CollaborationUI"; // Make sure to import the CollaborationUI

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoomGenerator />} />
        <Route path="/room/:slug" element={<CollaborationUI />} />
      </Routes>
    </Router>
  );
};

export default App;
