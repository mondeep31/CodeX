import Hero from "@/components/LandingPage/Hero";
import CodeSnippet from "@/components/LandingPage/CodeSnippet";

import FeaturesSection from "@/components/LandingPage/FeaturesSec";
import Footer from "@/components/LandingPage/Footer";
import Room from "@/components/LandingPage/Room";
import { useRef } from "react";

export default function LandingPage() {
  const roomRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-[#171717] text-white">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <Hero roomRef={roomRef} />
        {/* Code Snippet */}
        <CodeSnippet />
        {/* Feature Card */}
        {/* <FeatureCards /> */}
        {/* Feature Section */}
        <FeaturesSection />
        <Room ref={roomRef} />
      </main>
      <Footer />
    </div>
  );
}
