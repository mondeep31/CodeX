import { Appbar } from "../components/CodeEditor/Appbar";
import { Sidebar } from "../components/CodeEditor/Sidebar";
import { CodeEditor } from "../components/CodeEditor/Editor";
import { CodeTerminal } from "../components/CodeEditor/CodeTerminal";
import VideoCall from "../components/CodeEditor/VideoCall";
import { ChatSec } from "../components/CodeEditor/ChatSec";

export default function CodeEditorPage() {
  return (
    <div className="flex flex-col h-screen bg-[#1a1b26]">
      {/* Navbar */}
      <Appbar />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Middle Section */}
        <div className="flex-1 flex flex-col bg-[#1a1b26]">
          <CodeEditor />
          <CodeTerminal />
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-[#1a1b26] border-l border-[#2a2b36] flex flex-col">
          <VideoCall />
          <ChatSec />
        </div>
      </div>
    </div>
  );
}
