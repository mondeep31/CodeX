import { useEffect, useState, useRef } from "react";
import socket from "../../socket";

interface Message {
  userName: string;
  userId?: string; // Add userId to identify sender
  message: string;
  timestamp: string;
}

interface ChatProps {
  roomId: string;
  userName: string;
}

const ChatComponent = ({ roomId, userName }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [mySocketId, setMySocketId] = useState<string>("");

  useEffect(() => {
    // Listen for your own socket ID when joining the room
    socket.on("room_info", (info: any) => {
      // Assuming the socket ID is sent in the room info
      setMySocketId(info.mySocketId); // Ensure this is set correctly
    });

    // Listen for incoming messages
    socket.on("receive_message", (message: Message) => {
      console.log("Message received:", message);
      // If this message has a userId and it's the first message we're seeing
      // with our own name, save that ID so we can identify our own messages
      if (message.userId && message.userName === userName && !mySocketId) {
        setMySocketId(message.userId);
      }

      setMessages((prevMessages) => [...prevMessages, message]);

      // Only auto-scroll if we're already near the bottom
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          chatContainerRef.current;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        if (isNearBottom) {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      }
    });

    return () => {
      socket.off("receive_message");
      socket.off("room_info");
    };
  }, [userName]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const messageData = {
      roomId,
      userName,
      message: inputMessage.trim(),
      userId: mySocketId, // Include userId to identify the sender
    };

    socket.emit("send_message", messageData);
    setInputMessage("");
    // Always scroll to bottom when sending a message
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const isOwnMessage = (msg: Message): boolean => {
    return msg.userId === mySocketId; // Check if the message is from the current user
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#1C1C1C]">
      <div
        ref={chatContainerRef}
        className="flex-1 min-h-0 overflow-y-auto px-2 py-1.5 space-y-1.5 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              isOwnMessage(msg) ? "items-end" : "items-start"
            }`}
          >
            <div className="text-[10px] text-gray-500">{msg.userName}</div>
            <div
              className={`max-w-[85%] break-words rounded-lg px-2 py-1 text-sm ${
                isOwnMessage(msg)
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {msg.message}
            </div>
            <div className="text-[10px] text-gray-500">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex-shrink-0 border-t border-gray-700 p-1.5">
        <form onSubmit={handleSendMessage} className="flex gap-1.5">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 min-w-0 bg-gray-700 text-white rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <button
            type="submit"
            className="shrink-0 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;
