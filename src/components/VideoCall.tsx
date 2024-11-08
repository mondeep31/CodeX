import { Video } from "lucide-react";
const VideoCall = () => {
  return (
    <div className="p-4 border-b border-[#2a2b36]">
      <h2 className="text-white text-xs font-medium mb-3">Video Call</h2>
      <div className="space-y-3">
        <div className="bg-[#2a2b36] rounded-lg p-3 flex items-center justify-center h-28">
          <Video className="h-6 w-6 mr-2 text-white" />
          <span className="text-white text-sm">User 1</span>
        </div>
        <div className="bg-[#2a2b36] rounded-lg p-3 flex items-center justify-center h-28">
          <Video className="h-6 w-6 mr-2 text-white" />
          <span className="text-white text-sm">User 2</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
