import React from "react";
import { getUserVideosFromDatabase } from "@/actions/mongodb";
import DashboardVideoPlayer from "@/components/video/dashboard-video-player";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
  const videos = await getUserVideosFromDatabase();
  console.log("videos in dashboard = ", videos);

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <Link href="/dashboard/create-video">
          <div className="flex flex-col items-center justify-center">
            <Button
              variant="outline"
              className="h-[450px] w-[300px] flex flex-col items-center justify-center text-2xl"
            >
              <Image src="/logo.png" alt="upload" width={100} height={100} />
              <span>Create</span>
            </Button>
          </div>
        </Link>

        {videos.map((video: any) => (
          <div key={video._id} className="flex flex-col items-center">
            <DashboardVideoPlayer video={video} />
          </div>
        ))}
      </div>
    </div>
  );
}
