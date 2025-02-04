import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Video, VideoOff, Mic, MicOff, Send } from "lucide-react";

export default function VideoChat() {
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "You", text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="w-80 border-l border-[#2A2A2A] flex flex-col">
      <div className="pt-4 px-2">
        <div className="aspect-video bg-[#2A2A2A] mb-2 rounded-lg flex items-center justify-center overflow-hidden">
          {videoOn ? (
            <video className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-500">Video Off</div>
          )}
        </div>
      </div>
      <div className="p-2">
        <div className="aspect-video bg-[#2A2A2A] mb-4 rounded-lg flex items-center justify-center overflow-hidden">
          {videoOn ? (
            <video className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-500">Video Off</div>
          )}
        </div>
        <div className="flex justify-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setVideoOn(!videoOn)}
            className={`${
              videoOn
                ? "bg-green-600 hover:bg-green-700"
                : "bg-[#2A2A2A] hover:bg-[#3E3E3E]"
            } border-[#3E3E3E]`}
          >
            {videoOn ? (
              <Video className="h-4 w-4" />
            ) : (
              <VideoOff className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setAudioOn(!audioOn)}
            className={`${
              audioOn
                ? "bg-green-600 hover:bg-green-700"
                : "bg-[#2A2A2A] hover:bg-[#3E3E3E]"
            } border-[#3E3E3E]`}
          >
            {audioOn ? (
              <Mic className="h-4 w-4" />
            ) : (
              <MicOff className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col border-t border-[#2A2A2A]">
        <ScrollArea className="flex-1 p-4">
          {messages.map((message, index) => (
            <div key={index} className="mb-2">
              <span className="font-bold text-green-500">
                {message.sender}:{" "}
              </span>
              <span>{message.text}</span>
            </div>
          ))}
        </ScrollArea>
        <div className="p-4 border-t border-[#2A2A2A] flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="bg-[#2A2A2A] border-[#3E3E3E] text-sm focus:ring-0 focus:border-green-500"
          />
          <Button
            onClick={sendMessage}
            size="icon"
            className="bg-green-600 hover:bg-green-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
