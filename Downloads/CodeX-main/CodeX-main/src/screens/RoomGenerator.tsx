import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import CollaborationUI from "./CollaborationUI";

const RoomGenerator: React.FC = () => {
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [isRoomCreated, setIsRoomCreated] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const generateRoom = async () => {
    try {
      const response = await axios.get("http://localhost:3050/generate-room");
      const generatedRoomCode = response.data.roomCode;

      // Create a slug: we take the first part of the room code (you can adjust this as needed)
      const slug = generatedRoomCode.slice(0, 6); // Example: taking the first 6 characters of the room code
      setRoomCode(slug);
      setIsRoomCreated(true);

      // Redirect to the room URL with the slug
      navigate(`/room/${slug}`); // This will change the URL to /room/{slug}
    } catch (error) {
      console.error("Error generating room code:", error);
      setRoomCode("Failed to generate room code.");
    }
  };

  return (
    <div> 
      {!isRoomCreated ? (
        <div style={styles.container}>
          <button onClick={generateRoom} style={styles.button}>
            Create Room
          </button>
        </div>
      ) : (
        <div style={styles.container}>
          <h2>Room Created Successfully!</h2>
          <p>Room Slug: <strong>{roomCode}</strong></p> {/* Displaying the slug */}
          <CollaborationUI roomCode={roomCode} />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center" as const,
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};

export default RoomGenerator;
