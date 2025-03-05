import { useEffect, useState, useRef } from "react";
import socket from "../../socket";

interface Message {
  userName: string;
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

  useEffect(() => {
    socket.on("receive_message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      // Only auto-scroll if we're already near the bottom
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        if (isNearBottom) {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    socket.emit("send_message", {
      roomId,
      userName,
      message: inputMessage.trim(),
    });

    setInputMessage("");
    // Always scroll to bottom when sending a message
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
            className={`flex flex-col ${msg.userName === userName ? 'items-end' : 'items-start'}`}
          >
            <div className="text-[10px] text-gray-500">{msg.userName}</div>
            <div
              className={`max-w-[85%] break-words rounded-lg px-2 py-1 text-sm ${
                msg.userName === userName
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-white'
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
