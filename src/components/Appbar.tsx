// // import { Avatar } from "./BlogCard";
// import { Link } from "react-router-dom";

// export const Appbar = () => {
//   return (
//     <div className="border-border shadow-none flex justify-between px-10 py-4 bg-black">
//       <a
//         href={"/blogs"}
//         className="flex flex-col justify-center cursor-pointer text-white"
//       >
//         CodeX
//       </a>

//       <div>
//         <a>
//           <button
//             type="button"
//             className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
//           >
//             Logout
//           </button>
//         </a>

//         {/* <Avatar size={"big"} name="harkirat" /> */}
//       </div>
//     </div>
//   );
// };

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
