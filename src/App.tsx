import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import {
  Folder,
  File,
  Video,
  MessageSquare,
  Terminal,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

export default function CollaborationUI() {
  const [expandedFolders, setExpandedFolders] = useState<
    Record<string, boolean>
  >({ Project: true });
  const [chatMessages, setChatMessages] = useState<
    { user: string; message: string }[]
  >([
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
    <div className="h-screen w-full bg-background text-foreground">
      <div className="grid h-full grid-cols-[250px_1fr_300px]">
        <div className="border-r border-border overflow-y-auto p-4 ">
          <h2 className="mb-4 font-semibold">File Directory</h2>
          <div className="space-y-2">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => toggleFolder("Project")}
            >
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
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => toggleFolder("src")}
                >
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

        <div className="flex flex-col bg-black  text-lime-500">
          {/* Code Editor */}
          <div className="flex-grow">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              defaultValue="// Start coding here
function helloWorld() {
  console.log('Hello, world!');
}

helloWorld();"
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
              }}
            />
          </div>

          {/* Terminal */}
          <div className="h-1/3 border-t border-border bg-muted p-4 font-mono text-sm">
            <div className="flex items-center mb-2">
              <Terminal className="mr-2 h-4 w-4" />
              <span className="font-semibold">Terminal</span>
            </div>
            <div className="overflow-y-auto h-full">
              <div>$ npm install</div>
              <div>added 1256 packages, and audited 1257 packages in 30s</div>
              <div>$ npm start</div>
              <div>Compiled successfully!</div>
              <div>You can now view your project in the browser.</div>
              <div>Local: http://localhost:3000</div>
              <div>On Your Network: http://192.168.1.5:3000</div>
              <div>Note that the development build is not optimized.</div>
              <div>To create a production build, use npm run build.</div>
              <div>webpack compiled successfully</div>
            </div>
          </div>
        </div>

        {/* Right Section: Video Call and Chat */}
        <div className="border-l border-border flex flex-col">
          {/* Video Call */}
          <div className="p-4 border-b border-border">
            <h2 className="mb-4 font-semibold">Video Call</h2>
            <div className="flex flex-col space-y-4">
              <div className="h-32 bg-muted rounded flex items-center justify-center">
                <Video className="h-8 w-8" />
                <span className="ml-2">User 1</span>
              </div>
              <div className="h-32 bg-muted rounded flex items-center justify-center">
                <Video className="h-8 w-8" />
                <span className="ml-2">User 2</span>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="flex-grow flex flex-col p-4">
            <h2 className="mb-4 font-semibold">Chat</h2>
            <div className="flex-grow overflow-y-auto mb-4 space-y-2">
              {chatMessages.map((msg, index) => (
                <div key={index} className="bg-muted rounded p-2">
                  <span className="font-semibold">{msg.user}:</span>{" "}
                  {msg.message}
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
                className="flex-grow rounded-l border border-border bg-input px-3 py-2"
              />
              <button
                onClick={sendMessage}
                className="rounded-r bg-primary px-4 py-2 text-primary-foreground"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
