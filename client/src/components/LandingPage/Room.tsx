import { Plus, Users } from "lucide-react";
import React, { useState, forwardRef } from "react";
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

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Room = forwardRef<HTMLDivElement>((_, ref) => {
  const [roomName, setRoomName] = useState("");
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  // const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);

  const navigate = useNavigate();

  const handleRoomIdCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms/create-room`
      );
      const id = response.data.roomID;
      setRoomId(id);
    } catch (err) {
      console.log("Error creating room: ", err);
    }
  };

  const handleRoomCreation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!roomId) {
      alert("Please generate a room ID first");
      return;
    }

    navigate(`/editor/${roomId}`);
  };

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/rooms/join-room", { roomId });
      if (response.status === 200) {
        navigate(`/editor/${roomId}`);
      }
    } catch (err) {
      console.log("Error joining room", err);
    }
  };

  const handleCreateDialogClose = () => {
    setRoomId("");
    setRoomName("");
    setUserName("");
  };

  const handleJoinDialogClose = () => {
    setRoomId("");
    setUserName("");
  };

  return (
    <div ref={ref} className="mb-8 bg-[#171717] text-white">
      <div className="max-w-2xl mx-auto space-y-8 p-8">
        <h1 className="text-4xl font-bold text-center mb-12">
          Choose Your Room Type
        </h1>

        <Dialog
          open={createDialogOpen}
          onOpenChange={(isOpen) => {
            setCreateDialogOpen(isOpen);
            if (!isOpen) {
              handleCreateDialogClose();
            }
          }}
        >
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
            <form className="space-y-6 ">
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
                <Label htmlFor="roomName">Your name</Label>
                <Input
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="bg-[#1b1b1b] border-gray-700"
                />
                <Label htmlFor="roomName">Room ID</Label>
                <Input
                  id="roomName"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter room ID"
                  required
                  className="bg-[#1b1b1b] border-gray-700"
                />
                <p>
                  <a
                    className="rounded-xs text-blue-600 hover:underline"
                    onClick={handleRoomIdCreation}
                    role="button"
                    type="button"
                  >
                    Click here{" "}
                  </a>
                  &nbsp;to generate room ID
                </p>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleRoomCreation}
              >
                Create Room
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog
          open={joinDialogOpen}
          onOpenChange={(isOpen) => {
            setJoinDialogOpen(isOpen);
            if (!isOpen) {
              handleJoinDialogClose();
            }
          }}
        >
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
                <Label htmlFor="roomName">Your name</Label>
                <Input
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="bg-[#1b1b1b] border-gray-700"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleJoinRoom}
              >
                Join Room
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
});

export default Room;
