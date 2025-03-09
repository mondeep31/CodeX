import { useEffect, useRef, useState } from "react";
import socket from "../../socket";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";

interface VideoCallProps {
  roomId: string;
  userName: string;
}

interface UserInfo {
  socketId: string;
  userName: string;
}

const VideoCallComponent = ({ roomId, userName }: VideoCallProps) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Connecting...");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [remoteUserName, setRemoteUserName] = useState<string>("");

  // Track remote peer socketId
  const [remotePeerId, setRemotePeerId] = useState<string>("");

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
  };

  const startCall = async () => {
    try {
      // Wait for video elements to be ready
      if (!localVideoRef.current || !remoteVideoRef.current) {
        console.log("Video elements not ready, retrying in 100ms");
        setTimeout(startCall, 100);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      localVideoRef.current.srcObject = stream;

      // Create new RTCPeerConnection
      peerConnectionRef.current = new RTCPeerConnection(servers);

      // Add local tracks to the connection
      stream.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, stream);
      });

      // Handle incoming tracks
      peerConnectionRef.current.ontrack = (event) => {
        console.log("Received remote track", event.streams[0]);
        if (event.streams && event.streams[0]) {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
            console.log("Set remote video source");
          }
        }
      };

      // Handle ICE candidates
      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("Sending ICE candidate");
          socket.emit("ice-candidate", {
            candidate: event.candidate,
            roomId,
            target: remotePeerId, // Send to specific peer
          });
        }
      };

      // Log connection state changes
      peerConnectionRef.current.onconnectionstatechange = () => {
        const state = peerConnectionRef.current?.connectionState;
        console.log("Connection state:", state);
        setConnectionStatus(state || "Connecting...");
      };

      // Log ICE connection state changes
      peerConnectionRef.current.oniceconnectionstatechange = () => {
        console.log(
          "ICE connection state:",
          peerConnectionRef.current?.iceConnectionState
        );
      };

      // Join room with current user name
      socket.emit("join_room", { roomId, userName });

      // Listen for new users joining the room
      socket.on(
        "user_joined",
        (data: { socketId: string; userName: string }) => {
          console.log("New user connected:", data);
          // Store remote peer info
          setRemotePeerId(data.socketId);
          setRemoteUserName(data.userName);

          // Create and send offer
          createAndSendOffer(data.socketId);
        }
      );

      // Listen for existing users when joining
      socket.on("existing_users", (users: UserInfo[]) => {
        console.log("Existing users:", users);
        if (users.length > 0) {
          // Just use the first user for simplicity in this example
          setRemotePeerId(users[0].socketId);
          setRemoteUserName(users[0].userName);
        }
      });

      // Handle WebRTC signaling
      socket.on("offer", async ({ offer, from, fromUserName }) => {
        console.log("Received offer from:", from, fromUserName);
        // Set remote user info
        setRemotePeerId(from);
        if (fromUserName) {
          setRemoteUserName(fromUserName);
        }

        try {
          if (!peerConnectionRef.current) {
            console.error("No peer connection available");
            return;
          }
          console.log("Setting remote description from offer");
          await peerConnectionRef.current.setRemoteDescription(
            new RTCSessionDescription(offer)
          );
          console.log("Creating answer");
          const answer = await peerConnectionRef.current.createAnswer();
          console.log("Setting local description");
          await peerConnectionRef.current.setLocalDescription(answer);
          console.log("Sending answer");
          socket.emit("answer", {
            answer,
            roomId,
            target: from, // Send directly to the peer who sent the offer
          });
        } catch (error) {
          console.error("Error handling offer:", error);
        }
      });

      socket.on("answer", async ({ answer, from, fromUserName }) => {
        console.log("Received answer from:", from, fromUserName);
        if (fromUserName) {
          setRemoteUserName(fromUserName);
        }

        try {
          if (!peerConnectionRef.current) {
            console.error("No peer connection available");
            return;
          }
          console.log("Setting remote description from answer");
          await peerConnectionRef.current.setRemoteDescription(
            new RTCSessionDescription(answer)
          );
          console.log("Connection established");
          setConnectionStatus("Connected");
        } catch (error) {
          console.error("Error setting remote description:", error);
        }
      });

      socket.on("ice-candidate", async ({ candidate, from }) => {
        console.log("Received ICE candidate from:", from);
        try {
          if (!peerConnectionRef.current) {
            console.error("No peer connection available");
            return;
          }
          if (candidate) {
            console.log("Adding ICE candidate");
            await peerConnectionRef.current.addIceCandidate(
              new RTCIceCandidate(candidate)
            );
            console.log("Added ICE candidate successfully");
          }
        } catch (error) {
          console.error("Error adding ICE candidate:", error);
        }
      });

      socket.on(
        "user_disconnected",
        (data: { socketId: string; userName: string }) => {
          console.log("User disconnected:", data);
          if (data.socketId === remotePeerId) {
            setConnectionStatus("Remote user disconnected");
            setRemoteUserName("");
            setRemotePeerId("");
          }
        }
      );
    } catch (error) {
      console.error("Error starting call:", error);
      setConnectionStatus("Failed to start call");
    }
  };

  // Helper function to create and send an offer
  const createAndSendOffer = async (targetPeerId: string) => {
    try {
      // Create and send offer
      const offer = await peerConnectionRef.current?.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      console.log("Created offer:", offer);
      if (offer && peerConnectionRef.current) {
        await peerConnectionRef.current.setLocalDescription(offer);
        console.log("Set local description");
        socket.emit("offer", {
          offer,
          roomId,
          target: targetPeerId, // Send to specific peer
        });
        console.log("Sent offer to:", targetPeerId);
      }
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  };

  useEffect(() => {
    startCall();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      // Clean up socket listeners
      socket.off("user_joined");
      socket.off("existing_users");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("user_disconnected");
    };
  }, [roomId]);

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-1">
        <div className="relative w-full">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full aspect-video bg-black rounded-lg"
          />
          <div className="absolute bottom-2 left-2 text-white text-sm bg-black/50 px-2 py-0.5 rounded">
            You ({userName})
          </div>
        </div>
        <div className="relative w-full">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full aspect-video bg-black rounded-lg"
          />
          <div className="absolute bottom-2 left-2 text-white text-sm bg-black/50 px-2 py-0.5 rounded">
            {remoteUserName ? remoteUserName : "Waiting for peer..."}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 p-3 border-t border-gray-700 bg-[#1C1C1C]">
        <button
          onClick={toggleAudio}
          className={`p-2.5 rounded-full transition-all duration-200 hover:scale-110 ${
            isMuted
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isMuted ? (
            <FaMicrophoneSlash className="text-white w-3.5 h-3.5" />
          ) : (
            <FaMicrophone className="text-white w-3.5 h-3.5" />
          )}
        </button>
        <button
          onClick={toggleVideo}
          className={`p-2.5 rounded-full transition-all duration-200 hover:scale-110 ${
            isVideoOff
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isVideoOff ? (
            <FaVideoSlash className="text-white w-3.5 h-3.5" />
          ) : (
            <FaVideo className="text-white w-3.5 h-3.5" />
          )}
        </button>
        <div className="text-sm font-medium text-gray-400">
          {connectionStatus}
        </div>
      </div>
    </div>
  );
};

export default VideoCallComponent;
