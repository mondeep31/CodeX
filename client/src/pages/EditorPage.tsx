import TopNav from "@/components/CodeEditor/Appbar";
import Editor from "@/components/CodeEditor/Editor";
import OutputBox from "@/components/CodeEditor/OutputBox";
import RoomInfo from "@/components/CodeEditor/RoomInfo";
import VideoChat from "@/components/CodeEditor/VideoChat";
import { useLocation, useParams } from "react-router-dom";

export default function EditorPage() {
  const { roomId } = useParams();
  const location = useLocation();
  const { userName } = location.state || {};

  return (
    <div className="h-screen flex flex-col bg-[#1C1C1C] text-gray-300">
      <TopNav />
      <RoomInfo />
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <Editor />
          <OutputBox />
        </div>
        <VideoChat roomId={roomId!} userName={userName} />
      </div>
    </div>
  );
}
