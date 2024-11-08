import React from "react";

interface AvatarProps {
  size: "small" | "medium" | "big";
  name: string;
}

export const Avatar: React.FC<AvatarProps> = ({ size, name }) => {
  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "w-8 h-8 text-sm";
      case "medium":
        return "w-10 h-10 text-base";
      case "big":
        return "w-12 h-12 text-lg";
      default:
        return "w-10 h-10 text-base";
    }
  };

  return (
    <div
      className={`bg-gray-700 rounded-full flex items-center justify-center text-wh ${getSizeClass()}`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
};
