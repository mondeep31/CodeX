import React from "react";

import { Avatar } from "./Avatar";

export const Appbar: React.FC = () => {
  return (
    <div className="h-14 bg-[#1a1b26] border-b border-[#2a2b36] px-4 flex items-center justify-between">
      <span className="text-white text-lg font-semibold">CodeX</span>
      <div className="flex justify-around gap-4">
        <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-full transition-colors duration-200">
          Generate Room ID / Join Room
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-full transition-colors duration-200">
          Run Code
        </button>
      </div>
      <Avatar size={"big"} name={"Kaziranga University"} />
    </div>
  );
};
