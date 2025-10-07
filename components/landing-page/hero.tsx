"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  const [titles, setTitles] = React.useState([
    "AI VIDEOS",
    "YOUTUBE SHORTS",
    "TIKTOK VIDEOS",
    "INSTAGRAM REELS",
    "SHORT VIDEOS",
  ]);

  const [currentTitleIndex, setCurrentTitleIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [titles]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/uhd-laser.jpg"
            alt="AI Video Creation"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <small className="animate-bounce bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 block">
              {titles[currentTitleIndex]}
            </small>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              GENERATOR
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Why pay more when you can generate stunning videos for free?
          </p>

          <Link href="/dashboard/create-video">
            <Button
              type="submit"
              className="w-1/2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
