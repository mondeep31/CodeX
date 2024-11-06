// import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Appbar = () => {
  return (
    <div className="border-border shadow-none flex justify-between px-10 py-4 bg-black">
      <a
        href={"/blogs"}
        className="flex flex-col justify-center cursor-pointer text-white"
      >
        CodeX
      </a>

      <div>
        <a>
          <button
            type="button"
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            Logout
          </button>
        </a>

        {/* <Avatar size={"big"} name="harkirat" /> */}
      </div>
    </div>
  );
};
