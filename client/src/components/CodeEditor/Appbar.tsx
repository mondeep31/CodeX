import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "react-router-dom";
import socket from "@/socket";

const languages = ["java", "python", "javascript", "cpp", "csharp"];

export default function TopNav() {
  const { roomId } = useParams();
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [language, setLanguage] = useState("java");

  useEffect(() => {
    if (!roomId) {
      return;
    }

    // Handle user joined event
    const handleUserJoined = ({
      roomUsers,
    }: {
      roomUsers: { id: string; name: string }[];
    }) => {
      if (Array.isArray(roomUsers)) {
        setUsers(roomUsers);
      } else {
        console.error("Invalid roomUsers data:", roomUsers);
        setUsers([]); // Fallback to empty array
      }
    };

    // Handle user left event
    const handleUserLeft = (userId: string) => {
      setUsers((prev) => {
        if (Array.isArray(prev)) {
          return prev.filter((user) => user.id !== userId);
        }
        return []; // Fallback to empty array
      });
    };

    // Listen for socket events
    socket.on("room_users_updated", handleUserJoined);
    socket.on("user_left", handleUserLeft);

    // Cleanup socket listeners
    return () => {
      socket.off("room_users_updated", handleUserJoined);
      socket.off("user_left", handleUserLeft);
    };
  }, [roomId]);

  return (
    <div className="h-12 border-b border-[#2A2A2A] flex items-center px-4">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <div className="text-lg font-semibold">CodeX</div>
        <div className="text-xs px-2 py-1 bg-[#423F33] text-[#A99E63] rounded">
          Beta
        </div>
      </div>

      {/* Language */}
      <div className="flex-1 flex justify-center items-center space-x-2">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[120px] h-8 bg-[#2A2A2A] border-[#3E3E3E] text-sm">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent className="bg-[#2A2A2A] border-[#3E3E3E]">
            {languages.map((lang) => (
              <SelectItem
                key={lang}
                value={lang}
                className="text-gray-300 hover:bg-[#3E3E3E]"
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button className="h-8 bg-green-600 hover:bg-green-700 text-white rounded text-sm px-6">
          Run
        </Button>
      </div>

      {/* Connected Users */}
      <div className="flex space-x-2">
        {Array.isArray(users) && users.map((user) => (
          <div
            key={user.id}
            className="w-8 h-8 flex items-center justify-center bg-green-700 text-white rounded-full text-sm font-bold"
          >
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}
