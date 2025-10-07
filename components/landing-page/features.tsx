import React from "react";
import { Button } from "@/components/ui/button";

const features = [
  "Prompt to Video",
  "Video Script Generator",
  "Script to Video",
  "AI Voices",
  "AI Text to Speech",
  "AI Audio to Text",
  "Short Videos",
  "AI Image Generator",
  "AI Animated Image Generator",
  "AI Art Image Generator",
  "AI Fantasy Image Generator",
  "AI Audio Subtitle Generator",
];

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Powerful AI Features
        </h2>

        <div className="flex flex-wrap gap-4 p-4 justify-center">
          {features.map((feature, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto py-3 px-4 flex items-center justify-start whitespace-nowrap font-sans font-bold rounded-full transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:text-white"
            >
              <span className="text-sm">{feature}</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
