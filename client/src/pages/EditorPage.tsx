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
  const [language, setLanguage] = useState("java");
  const location = useLocation();
  const { userName } = location.state || {};

  if (!roomId) {
    navigate("/");
    return null;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#1C1C1C] text-gray-300">
      <TopNav language={language} onLanguageChange={setLanguage} />
      <RoomInfo />
      <div className="flex-1 min-h-0 overflow-hidden flex w-full">
        {/* Left side (Editor + Output) */}
        <div className="flex-1 min-w-0 min-h-0 flex flex-col overflow-hidden">
          <div className="flex-1 min-h-0 overflow-hidden">
            <Editor
              roomId={roomId}
              language={language}
              onLanguageChange={setLanguage}
            />
          </div>
          <div className="h-40 min-h-0 overflow-hidden">
            <OutputBox />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="flex-shrink-0 w-[20%] min-w-[220px] max-w-[320px] h-full min-h-0 overflow-hidden flex flex-col bg-[#1C1C1C] border-l border-[#2A2A2A]">
          <div className="flex-1 min-h-0 overflow-hidden">
            <VideoChat roomId={roomId} userName={userName} />
          </div>
        </div>
      </div>
    </div>
  );
}
