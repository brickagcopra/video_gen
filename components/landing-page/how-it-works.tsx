import React from "react";

const works = [
  {
    image: "/icons/ideas.png",
    title: "1. Script Idea",
    description: "Start with your video concept or choose one",
  },
  {
    image: "/icons/generation.png",
    title: "2. AI Generation",
    description: "Our AI creates script, visuals, and audio",
  },
  {
    image: "/icons/preview.png",
    title: "3. Preview",
    description: "Review and tweak your AI-generated video",
  },
  {
    image: "/icons/publish.png",
    title: "4. Publish",
    description: "Share your video to your favorite platforms",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {works.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <GradientIcon imageSrc={step.image} />
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const GradientIcon = ({ imageSrc }: { imageSrc: string }) => (
  <div className="relative w-16 h-16 mb-4">
    <img
      src={imageSrc}
      alt="Step icon"
      className="w-full h-full object-contain"
    />
  </div>
);
