import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically create a room on your backend
    const roomId = Math.random().toString(36).substr(2, 9);
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-[#171717] text-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Create New Room</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="roomName">Room Name</Label>
            <Input
              id="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room name"
              required
              className="bg-gray-900 border-gray-700"
            />
          </div>
          <Button type="submit" className="w-full">
            Create Room
          </Button>
        </form>
      </main>
    </div>
  );
}
