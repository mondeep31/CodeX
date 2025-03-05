import VideoCallComponent from "./VideoComponent";
import ChatComponent from "./ChatComponent";

interface VideoChatProps {
  roomId: string;
  userName: string;
}

const VideoChat = ({ roomId, userName }: VideoChatProps) => {
  return (
    <div className="h-full flex flex-col border-l border-gray-700">
      {/* Video Section - Always visible, takes only needed space */}
      <div className="flex-shrink-0">
        <VideoCallComponent roomId={roomId} userName={userName} />
      </div>
      
      {/* Chat Section - Takes remaining space */}
      <div className="flex-1 min-h-0 border-t border-gray-700">
        <ChatComponent roomId={roomId} userName={userName} />
      </div>
    </div>
  );
};

export default VideoChat;
