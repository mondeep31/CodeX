import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import socket from "@/socket";

interface RoomData {
  id: string;
  name: string;
  host: string;
  participants: string[];
}

export default function RoomInfo() {
  const { roomId } = useParams();
  const location = useLocation();
  const { userName, roomName, isHost } = location.state || {};
  const [roomData, setRoomData] = useState<RoomData>({
    id: "",
    name: "",
    host: "",
    participants: [],
  });

  useEffect(() => {
    if (!roomId || !userName) return;

    // Emit join_room only once
    socket.emit("join_room", { roomId, userName });

    const handleRoomInfo = (data: RoomData) => {
      setRoomData(data);
    };

    // Listen for room info
    socket.on("room_info", handleRoomInfo);

    // Cleanup
    return () => {
      socket.off("room_info", handleRoomInfo);
    };
  }, [roomId, userName]);

  return (
    <div className="bg-[#252525] border-b border-[#2A2A2A] px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div>
            <span className="text-xs text-gray-400">Room ID:</span>
            <span className="ml-2 text-sm text-green-500 font-mono">
              {roomId}
            </span>
          </div>
          <div>
            <span className="text-xs text-gray-400">Session:</span>
            <span className="ml-2 text-sm">{roomName || roomData.name}</span>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div>
            <span className="text-xs text-gray-400">Host:</span>
            <span className="ml-2 text-sm">
              {isHost ? userName : roomData.host}
            </span>
          </div>
          <div>
            <span className="text-xs text-gray-400">Participants:</span>
            <span className="ml-2 text-sm">
              {roomData.participants.join(", ") || userName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
