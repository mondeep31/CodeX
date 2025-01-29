import { useState } from "react";

export const ChatSec = () => {
  const [chatMessages, setChatMessages] = useState<
    { user: string; message: string }[]
  >([
    { user: "User 1", message: "Hello! Ready to code?" },
    { user: "User 2", message: "Yes, let's get started!" },
  ]);
  const [newMessage, setNewMessage] = useState("");

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
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-[#2a2b36]">
        <h2 className="text-white text-xs font-medium">Chat</h2>
      </div>
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {chatMessages.map((msg, index) => (
          <div key={index} className="bg-[#2a2b36] rounded-lg p-3">
            <span className="text-sm font-medium text-white">{msg.user}:</span>{" "}
            <span className="text-sm text-white">{msg.message}</span>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-[#2a2b36]">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-[#2a2b36] text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-[#888]"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
