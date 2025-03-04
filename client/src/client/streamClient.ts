import {StreamChat} from "stream-chat"
import {StreamVideoClient} from "@stream-io/video-react-sdk"
import { Stream_API_KEY } from "@/config/stream"

const API_KEY = Stream_API_KEY;

console.log("API KEY:", API_KEY)
export const chatClient = StreamChat.getInstance(API_KEY)
export const initializeVideoClient = (userId: string, userName: string, token: string) => {
    return new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: userId,
        name: userName,
      },
      tokenProvider: async() => token, // Function to provide the token
    });
  };

