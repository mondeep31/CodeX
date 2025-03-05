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
    <div className="h-screen flex flex-col bg-[#1C1C1C] text-gray-300 overflow-hidden">
      <TopNav />
      <RoomInfo />
      <div className="flex-1 flex min-h-0 overflow-y-hidden">
        <div className="flex-[3] flex flex-col min-w-0 overflow-y-hidden">
          <div className="flex-[2] min-h-0 overflow-y-auto">
            <Editor />
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto">
            <OutputBox />
          </div>
        </div>
        <div className="flex-1 min-w-[300px] max-w-[400px] flex flex-col min-h-0 overflow-y-auto">
          <VideoChat roomId={roomId!} userName={userName} />
        </div>
      </div>
    </div>
  );
}
