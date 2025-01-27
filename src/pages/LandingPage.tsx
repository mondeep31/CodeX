import Hero from "@/components/LandingPage/Hero";
import CodeSnippet from "@/components/LandingPage/CodeSnippet";

import FeaturesSection from "@/components/LandingPage/FeaturesSec";
import Footer from "@/components/LandingPage/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#171717] text-white">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <Hero />
        {/* Code Snippet */}
        <CodeSnippet />
        {/* Feature Card */}
        {/* <FeatureCards /> */}
        {/* Feature Section */}
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
