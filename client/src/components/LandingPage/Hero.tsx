// import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { RefObject } from "react";

interface HeroProps {
  roomRef: RefObject<HTMLDivElement>;
}

const Hero = ({ roomRef }: HeroProps) => {
  const scrollToRoom = () => {
    if (roomRef.current) {
      roomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="relative">
      <h2 className="absolute top-0 left-4 text-white text-[32px] font-bold font-sans">
        CodeX
      </h2>
      <div className="text-center space-y-6 mb-16 pb-8 pt-32">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          <span className="text-blue-500">Real-time Collaborative</span>
          <br />
          <span className="text-white">Code Editor</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl ">
          Write, compile, and collaborate on code in real-time. Experience
          seamless coding with built-in video chat, instant messaging, and
          multi-language support.
        </p>
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-md"
          onClick={scrollToRoom}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Hero;
