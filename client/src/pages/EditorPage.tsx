import TopNav from "@/components/CodeEditor/Appbar";
import Editor from "@/components/CodeEditor/Editor";
import OutputBox from "@/components/CodeEditor/OutputBox";
import RoomInfo from "@/components/CodeEditor/RoomInfo";
import VideoChat from "@/components/CodeEditor/VideoChat";

export default function EditorPage() {
  return (
    <div className="h-screen flex flex-col bg-[#1C1C1C] text-gray-300">
      <TopNav />
      <RoomInfo />
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <Editor />
          <OutputBox />
        </div>
        <VideoChat />
      </div>
    </div>
  );
}
