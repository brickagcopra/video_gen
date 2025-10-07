"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { Coins } from "lucide-react";
import { useVideo } from "@/context/video";

export default function CreditsComponent() {
  const [total, setTotal] = React.useState(0);
  const { credits } = useVideo();

  const displayCredits = credits > 99 ? "99+" : credits.toString();
  const badgeColor = credits < 10 ? "bg-red-500" : "bg-green-500";

  return (
    <div className="flex items-center">
      <div className="relative inline-block">
        <Coins className="h-10 w-10 text-[#6a5acd]" />
        <span
          className={`
            absolute -top-1 -right-2 ${badgeColor} text-white text-xs font-bold rounded-full px-1
            `}
        >
          {displayCredits}
        </span>
      </div>
    </div>
  );
}
