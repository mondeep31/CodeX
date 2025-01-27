import React from "react";
import { Users2, MessageCircle, Zap, Search } from "lucide-react";

const FeatureCards = () => {
  return (
    <div>
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <FeatureCard
          icon={<Users2 className="w-6 h-6" />}
          title="Real-time Collaboration"
          description="Code together in real-time with your team"
        />
        <FeatureCard
          icon={<MessageCircle className="w-6 h-6" />}
          title="Built-in Chat"
          description="Communicate seamlessly while coding"
        />
        <FeatureCard
          icon={<Zap className="w-6 h-6" />}
          title="Live Compilation"
          description="Execute code in multiple languages"
        />
        <FeatureCard
          icon={<Search className="w-6 h-6" />}
          title="Error Detection"
          description="Instant error feedback and suggestions"
        />
      </div>
    </div>
  );
};

export default FeatureCards;

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center p-6 rounded-lg bg-zinc-900/50">
      <div className="inline-block p-3 bg-blue-600/10 rounded-lg mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
