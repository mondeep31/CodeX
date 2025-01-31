
import { useEffect, useState } from "react"

export default function RoomInfo() {
  const [roomInfo, setRoomInfo] = useState({
    id: "",
    name: "",
    host: "",
    participant: "",
  })

  useEffect(() => {
    // Simulating room info fetch
    setRoomInfo({
      id: "ROOM-123",
      name: "Code Review Session",
      host: "John Doe",
      participant: "Jane Smith",
    })
  }, [])

  return (
    <div className="bg-[#252525] border-b border-[#2A2A2A] px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div>
            <span className="text-xs text-gray-400">Room ID:</span>
            <span className="ml-2 text-sm text-green-500 font-mono">{roomInfo.id}</span>
          </div>
          <div>
            <span className="text-xs text-gray-400">Session:</span>
            <span className="ml-2 text-sm">{roomInfo.name}</span>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div>
            <span className="text-xs text-gray-400">Host:</span>
            <span className="ml-2 text-sm">{roomInfo.host}</span>
          </div>
          <div>
            <span className="text-xs text-gray-400">Participant:</span>
            <span className="ml-2 text-sm">{roomInfo.participant}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

