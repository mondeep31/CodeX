import React, { useState } from "react";
import { Folder, File, Video, MessageSquare, Terminal, ChevronRight, ChevronDown } from "lucide-react";
import { Appbar } from "../components/Appbar";

interface CollaborationUIProps {
  roomCode: string;
}

const CollaborationUI: React.FC<CollaborationUIProps> = ({ roomCode }) => {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({ Project: true });
  const [chatMessages, setChatMessages] = useState<{ user: string; message: string }[]>([
    { user: "User 1", message: "Hello! Ready to code?" },
    { user: "User 2", message: "Yes, let's get started!" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages((prev) => [
        ...prev,
        { user: "You", message: newMessage.trim() },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div>
      <div className="border-b border-white">
        {" "}
        <Appbar />
      </div>
      <div className="h-[calc(100vh-64px)] w-full bg-background text-foreground overflow-hidden">
        <div className="grid h-full grid-cols-[250px_1fr_300px]">
          {/* Left Sidebar */}
          <div className="border-r border-white overflow-y-auto p-4 bg-black text-white">
            <h2 className="mb-4 font-semibold">File Directory</h2>
            <div className="space-y-2">
              <div className="flex items-center cursor-pointer" onClick={() => toggleFolder("Project")}>
                {expandedFolders["Project"] ? (
                  <ChevronDown className="h-4 w-4 mr-1" />
                ) : (
                  <ChevronRight className="h-4 w-4 mr-1" />
                )}
                <Folder className="mr-2 h-4 w-4" />
                <span>Project</span>
              </div>
              {expandedFolders["Project"] && (
                <div className="ml-4 space-y-2">
                  <div className="flex items-center">
                    <File className="mr-2 h-4 w-4" />
                    <span>index.js</span>
                  </div>
                  <div className="flex items-center">
                    <File className="mr-2 h-4 w-4" />
                    <span>styles.css</span>
                  </div>
                  <div className="flex items-center cursor-pointer" onClick={() => toggleFolder("src")}>
                    {expandedFolders["src"] ? (
                      <ChevronDown className="h-4 w-4 mr-1" />
                    ) : (
                      <ChevronRight className="h-4 w-4 mr-1" />
                    )}
                    <Folder className="mr-2 h-4 w-4" />
                    <span>src</span>
                  </div>
                  {expandedFolders["src"] && (
                    <div className="ml-4 space-y-2">
                      <div className="flex items-center">
                        <File className="mr-2 h-4 w-4" />
                        <span>App.js</span>
                      </div>
                      <div className="flex items-center">
                        <File className="mr-2 h-4 w-4" />
                        <span>components.js</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Middle Section: Code Editor and Terminal */}
          <div className="flex flex-col bg-black text-lime-500 h-full">
            {/* Code Editor */}
            <div className="flex-grow">
              {/* Add your code editor here */}
            </div>

            {/* Terminal */}
            <div className="h-1/3 border-t border-white bg-muted p-4 font-mono text-sm overflow-y-auto">
              <div className="flex items-center mb-2">
                <Terminal className="mr-2 h-4 w-4" />
                <span className="font-semibold">Terminal</span>
              </div>
              <div className="overflow-y-auto h-full">
                {/* Terminal output */}
              </div>
            </div>
          </div>

          {/* Right Section: Video Call and Chat */}
          <div className="border-l border-white flex flex-col h-full">
            {/* Video Call */}
            <div className="p-4 border-b border-white bg-black text-white">
              <h2 className="mb-4 font-semibold">Video Call</h2>
              {/* Video call components */}
            </div>

            {/* Chat Interface */}
            <div className="flex-grow flex flex-col p-4 bg-black text-white">
              <h2 className="mb-4 font-semibold">Chat</h2>
              <div className="flex-grow overflow-y-auto mb-4 space-y-2">
                {chatMessages.map((msg, index) => (
                  <div key={index} className="bg-muted rounded p-2">
                    <span className="font-semibold">{msg.user}:</span> {msg.message}
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-grow rounded-l border border-white bg-input px-3 py-2 text-white bg-black"
                />
                <button
                  onClick={sendMessage}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationUI;
