import { useEffect, useState, useRef } from "react";
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
import axios from "axios";

const languages = ["java", "python", "cpp", "c"];

interface TopNavProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

export default function TopNav({ language, onLanguageChange }: TopNavProps) {
  const { roomId } = useParams();
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const lastExecutionTime = useRef(0);
  const EXECUTION_COOLDOWN = 5000;

  useEffect(() => {
    if (!roomId) return;

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

    const handleUserLeft = (userId: string) => {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    };

    const handleLanguageChange = (newLanguage: string) => {
      onLanguageChange(newLanguage);
    };

    socket.on("room_users_updated", handleUserJoined);
    socket.on("user_left", handleUserLeft);
    socket.on("language_changed", handleLanguageChange);

    return () => {
      socket.off("room_users_updated", handleUserJoined);
      socket.off("user_left", handleUserLeft);
      socket.off("language_changed", handleLanguageChange);
    };
  }, [roomId, onLanguageChange]);

  const handleLanguageChange = (newLanguage: string) => {
    if (newLanguage !== language && roomId) {
      onLanguageChange(newLanguage);
      socket.emit("change_language", { roomId, language: newLanguage });
    }
  };

  const executeCode = async () => {
    const now = Date.now();
    if (now - lastExecutionTime.current < EXECUTION_COOLDOWN) {
      alert(
        `Please wait ${
          (EXECUTION_COOLDOWN - (now - lastExecutionTime.current)) / 1000
        } seconds before executing again`
      );
      return;
    }

    if (!window.editor) {
      console.error("Editor not initialized");
      return;
    }

    const code = window.editor.getValue();
    if (!code.trim()) {
      alert("Please enter some code to execute");
      return;
    }

    setIsExecuting(true);
    lastExecutionTime.current = now;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/execution/run`,
        {
          code,
          language,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result =
        response.data.stdout || response.data.stderr || "No output";
      const error = !!response.data.stderr;

      socket.emit("execution_result", {
        roomId,
        result,
        error,
      });
    } catch (error: any) {
      console.error("Execution error:", error);
      socket.emit("execution_result", {
        roomId,
        result: error.message || "Error executing code",
        error: true,
      });
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="h-12 border-b border-[#2A2A2A] flex items-center px-4">
      <div className="flex items-center space-x-4">
        <div className="text-lg font-semibold">CodeX</div>
        <div className="text-xs px-2 py-1 bg-[#423F33] text-[#A99E63] rounded">
          Beta
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center space-x-2">
        <Select value={language} onValueChange={handleLanguageChange}>
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

        <Button
          className={`h-8 ${
            isExecuting ? "bg-gray-600" : "bg-green-600 hover:bg-green-700"
          } text-white rounded text-sm px-6`}
          onClick={executeCode}
          disabled={isExecuting}
        >
          {isExecuting ? "Running..." : "Run"}
        </Button>
      </div>

      <div className="flex space-x-2">
        {users.map((user) => (
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
