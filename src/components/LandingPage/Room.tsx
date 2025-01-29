import { Link } from "react-router-dom";
import { Plus, Users } from "lucide-react";

export default function Room() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        Choose Your Room Type
      </h1>

      <Link
        to="/create"
        className="block p-6 rounded-lg border border-gray-600  hover:border-sky-500 transition-colors bg-[#1b1b1b]"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Create New Room</h2>
            <p className="text-gray-400 mt-1">
              Start a new collaborative coding session
            </p>
          </div>
          <Plus className="w-6 h-6 text-indigo-500" />
        </div>
      </Link>

      <Link
        to="/join"
        className="block p-6 border border-gray-600 rounded-lg bg-[#1b1b1b] hover:border-sky-500 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Join Existing Room</h2>
            <p className="text-gray-400 mt-1">
              Enter a room ID to join an existing session
            </p>
          </div>
          <Users className="w-6 h-6 text-purple-500" />
        </div>
      </Link>
    </div>
  );
}
