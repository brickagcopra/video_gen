import React from "react";
import { Copyright } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <div className="flex justify-center gap-2">
            <Copyright /> {new Date().getFullYear()} AiVid. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
