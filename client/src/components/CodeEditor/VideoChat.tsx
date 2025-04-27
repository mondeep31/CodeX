import VideoCallComponent from "./VideoComponent";
import ChatComponent from "./ChatComponent";

interface VideoChatProps {
  roomId: string;
  userName: string;
}

const VideoChat = ({ roomId, userName }: VideoChatProps) => {
  return (
    <div className="flex-1 min-h-0 h-full overflow-hidden flex flex-col border-l border-gray-700">
      {/* Video Area */}
      <div className="flex-shrink-0">
        <VideoCallComponent roomId={roomId} userName={userName} />
      </div>

      {/* Chat Area */}
      <div className="flex-1 min-h-0 overflow-hidden border-t border-gray-700">
        <ChatComponent roomId={roomId} userName={userName} />
      </div>
    </div>
  );
};

export default VideoChat;
