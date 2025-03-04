import { useEffect, useState } from "react";
import {
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamVideo,
} from "@stream-io/video-react-sdk";
import axios from "axios";
import { initializeVideoClient } from "@/client/streamClient";

interface VideoCallProps {
  roomId: string;
  userName: string;
}

const VideoCallComponent = ({ roomId, userName }: VideoCallProps) => {
  const [call, setCall] = useState<any>(null);
  const [videoClient, setVideoClient] = useState<any>(null);

  useEffect(() => {
    const initVideoCall = async () => {
      try {
        // Fetch token from backend
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/token/get-token`,
          {
            userId: userName,
          }
        );
        const token = response.data.token;

        // Initialize video client
        const videoClient = initializeVideoClient(userName, userName, token);
        setVideoClient(videoClient);

        // Create or join a call
        const call = videoClient.call("default", roomId);
        await call.join({ create: true });
        setCall(call);
      } catch (error) {
        console.error("Error initializing video call:", error);
      }
    };

    initVideoCall();

    return () => {
      if (call) {
        call.leave();
      }
    };
  }, [roomId, userName]);

  if (!call) return <div className="text-white">Loading video call...</div>;

  return (
    <div className="flex flex-col h-full bg-[#1C1C1C] rounded-lg overflow-hidden shadow-lg">
      <StreamVideo client={videoClient}>
        <StreamCall call={call}>
          <div className="flex-1 relative">
            <div className="custom-speaker-layout">
              <SpeakerLayout participantsBarPosition="bottom" />
            </div>
          </div>
          <div className="p-4 bg-[#252525] border-t border-[#2A2A2A]">
            <div className="flex justify-center space-x-4">
              <CallControls />
            </div>
          </div>
        </StreamCall>
      </StreamVideo>
    </div>
  );
};

export default VideoCallComponent;
