import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Ready to Create Amazing Videos?
        </h2>
        <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
          Join thousands of content creators who are already using AiVid to
          produce stunning short-form videos with AI.
        </p>
        <Link href="/dashboard/create-video">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-3">
            Get Started Now <ChevronRight className="ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
