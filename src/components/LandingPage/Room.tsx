import { Plus, Users } from "lucide-react";
import { useState, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RoomView from "./RoomView"; // Import the RoomView component

const Room = forwardRef<HTMLDivElement>((_, ref) => {
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically create a room on your backend
    const newRoomId = Math.random().toString(36).substr(2, 9);
    setActiveRoom(newRoomId);
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveRoom(roomId);
  };

  return (
    <div ref={ref} className="mb-8 bg-[#171717] text-white">
      {!activeRoom ? (
        <div className="max-w-2xl mx-auto space-y-8 p-8">
          <h1 className="text-4xl font-bold text-center mb-12">
            Choose Your Room Type
          </h1>

          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full p-6 rounded-lg bg-[#1b1b1b] border border-gray-600 hover:bg-gray-800 hover:border-sky-500 transition-colors drop-shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-left">
                      Create New Room
                    </h2>
                    <p className="text-gray-400 mt-1">
                      Start a new collaborative coding session
                    </p>
                  </div>
                  <Plus className="w-6 h-6 text-indigo-500" />
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-[#171717] text-white border border-gray-600">
              <DialogHeader>
                <DialogTitle>Create New Room</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateRoom} className="space-y-6 ">
                <div className="space-y-2">
                  <Label htmlFor="roomName">Room Name</Label>
                  <Input
                    id="roomName"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="Enter room name"
                    required
                    className="bg-[#1b1b1b] border-gray-700"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Create Room
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full p-6 rounded-lg border border-gray-600 bg-[#1b1b1b] hover:bg-gray-800 hover:border-sky-500 transition-colors drop-shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-left">
                      Join Existing Room
                    </h2>
                    <p className="text-gray-400 mt-1">
                      Enter a room ID to join an existing session
                    </p>
                  </div>
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-[#171717] text-white border border-gray-600">
              <DialogHeader>
                <DialogTitle>Join Existing Room</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleJoinRoom} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="roomId">Room ID</Label>
                  <Input
                    id="roomId"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="Enter room ID"
                    required
                    className="bg-[#1b1b1b] border-gray-700 text-white"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Join Room
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <RoomView roomId={activeRoom} onLeave={() => setActiveRoom(null)} />
      )}
    </div>
  );
});

export default Room;
