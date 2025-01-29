import { Button } from "@/components/ui/button";

interface RoomViewProps {
  roomId: string;
  onLeave: () => void;
}

export default function RoomView({ roomId, onLeave }: RoomViewProps) {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Room: {roomId}</h1>
        <Button variant="outline" onClick={onLeave}>
          Leave Room
        </Button>
      </div>
      <div className="bg-gray-900 rounded-lg p-6">
        <p className="text-gray-400">
          This is where your collaborative coding interface would go.
        </p>
      </div>
    </div>
  );
}
