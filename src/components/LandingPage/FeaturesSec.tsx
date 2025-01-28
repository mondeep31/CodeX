import { Users, MessageCircle, Code2, AlertTriangle } from "lucide-react";

const FeaturesSection = () => {
  return (
    <div className="min-h-screen text-white px-4 md:px-32 border-spacing-1">
      <div className="container mx-auto px-4 py-16 space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-6xl font-bold">
            Powerful Features for Modern Development
          </h1>
          <p className="text-lg text-gray-400">
            Everything you need for seamless collaborative coding, all in one
            place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 border border-gray-600 rounded-lg p-6 hover:border-sky-500 bg-[#1b1b1b] drop-shadow-2xl">
            <div className="w-12 h-12 bg-blue-950 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold">Collaborative Code Editor</h2>
            <p className="text-gray-400">
              Code together in real-time with your team members. See live
              changes, cursor positions, and selections. Perfect for pair
              programming and code reviews.
            </p>
          </div>

          <div className="space-y-4 border border-gray-600 rounded-lg p-6 hover:border-sky-500 bg-[#1b1b1b] drop-shadow-2xl">
            <div className="w-12 h-12 bg-purple-950 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold">Inbuilt Chat Feature</h2>
            <p className="text-gray-400">
              Communicate effectively with built-in text and video chat. Share
              ideas, discuss code changes, and resolve issues in real-time.
            </p>
          </div>

          <div className="space-y-4 border border-gray-600 rounded-lg p-6 hover:border-sky-500 bg-[#1b1b1b] drop-shadow-2xl">
            <div className="w-12 h-12 bg-green-950 rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="text-xl font-semibold">Multi-Language Support</h2>
            <p className="text-gray-400">
              Execute code in multiple languages including C, C++, Java, and
              more. Built-in compiler support with instant feedback.
            </p>
          </div>

          <div className="space-y-4 border border-gray-600 rounded-lg p-6 hover:border-sky-500 bg-[#1b1b1b] drop-shadow-2xl">
            <div className="w-12 h-12 bg-red-950 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <h2 className="text-xl font-semibold">Error Detection</h2>
            <p className="text-gray-400">
              Instant error detection with squiggly underlines. Get real-time
              suggestions and fixes for common programming mistakes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
