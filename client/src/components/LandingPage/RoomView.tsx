import { useState } from "react";
import TopNav from "../CodeEditor/Appbar";
import CodeEditor from "../CodeEditor/Editor";
import OutputBox from "../CodeEditor/OutputBox";
import VideoComponent from "../CodeEditor/VideoComponent";
import ChatComponent from "../CodeEditor/ChatComponent";
import { Button } from "@/components/ui/button";

interface RoomViewProps {
  roomId: string;
  userName: string;
  onLeave: () => void;
}

export default function RoomView({ roomId, userName, onLeave }: RoomViewProps) {
  const [language, setLanguage] = useState("javascript");

  return (
    <div className="h-screen flex flex-col">
      <TopNav language={language} onLanguageChange={setLanguage} />
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <CodeEditor 
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
            <VideoComponent roomId={roomId} userName={userName} />
          </div>
          <div className="h-80">
            <ChatComponent roomId={roomId} userName={userName} />
          </div>
          <div className="p-4 border-t border-[#2A2A2A]">
            <Button 
              variant="outline" 
              onClick={onLeave}
              className="w-full"
            >
              Leave Room
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
