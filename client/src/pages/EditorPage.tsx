import { useState } from "react";
import TopNav from "@/components/CodeEditor/Appbar";
import Editor from "@/components/CodeEditor/Editor";
import OutputBox from "@/components/CodeEditor/OutputBox";
import VideoChat from "@/components/CodeEditor/VideoChat";
import RoomInfo from "@/components/CodeEditor/RoomInfo";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function EditorPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("javascript");
  const location = useLocation();
  const { userName } = location.state || {};

  if (!roomId) {
    navigate("/");
    return null;
  }

  return (
    <div className="h-screen flex flex-col bg-[#1C1C1C] text-gray-300 overflow-hidden">
      <TopNav language={language} onLanguageChange={setLanguage} />
      <RoomInfo />
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <Editor
              roomId={roomId}
              language={language}
              onLanguageChange={setLanguage}
            />
          </div>
          <div className="h-40">
            <OutputBox />
          </div>
        </div>
        <div className="w-80 bg-[#1C1C1C] border-l border-[#2A2A2A] flex flex-col">
          <div className="flex-1">
            <VideoChat roomId={roomId} userName={userName} />
          </div>
        </div>
      </div>
    </div>
  );
}
