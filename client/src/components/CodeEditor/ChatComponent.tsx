// src/components/Chat.tsx
import { useEffect, useState } from "react";
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
} from "stream-chat-react";

import axios from "axios";
import { chatClient } from "@/client/streamClient";

interface ChatProps {
  roomId: string;
  userName: string;
}

const ChatComponent = ({ roomId, userName }: ChatProps) => {
  const [channel, setChannel] = useState<any>(null);

  useEffect(() => {
    const initChat = async () => {
      try {
        // Fetch token from backend
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/token/get-token`,
          {
            userId: userName,
          }
        );
        const token = response.data.token;

        // Connect the user
        await chatClient.connectUser(
          {
            id: userName,
            name: userName,
          },
          token
        );

        // Create or get a channel
        const channel = chatClient.channel("messaging", roomId, {
          name: `Room ${roomId}`,
          members: [userName],
        });

        await channel.watch();
        setChannel(channel);
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    initChat();

    return () => {
      chatClient.disconnectUser();
    };
  }, [roomId, userName]);

  if (!channel) return <div>Loading chat...</div>;

  return (
    <Chat client={chatClient} theme="messaging dark">
      <Channel channel={channel}>
        <Window>
          <div className="bg-[#252525] text-white p-4 border-b border-[#2A2A2A]">
            <ChannelHeader />
          </div>
          <div className="flex-1 p-4 bg-[#1C1C1C]">
            <MessageList />
          </div>
          <div className="bg-[#252525] p-4 border-t border-[#2A2A2A]">
            <MessageInput />
          </div>
        </Window>
      </Channel>
    </Chat>
  );
};

export default ChatComponent;
