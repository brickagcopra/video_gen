import React from "react";
import { Player } from "@remotion/player";
import RemotionVideo from "@/components/video/remotion-video";
import { useVideo } from "@/context/video";

export default function RemotionPlayer() {
  const { images, audio, captions } = useVideo();

  // calculate total duration based on captions
  const totalDuration =
    captions.length > 0
      ? Math.ceil((captions[captions.length - 1] as any).end / (1000 / 30)) + 30
      : 1; // add 30 frames for an additional seconds

  return (
    <div>
      <Player
        component={RemotionVideo}
        durationInFrames={totalDuration}
        compositionWidth={300}
        compositionHeight={450}
        fps={30}
        inputProps={{ images, audio, captions }}
        controls={true}
      />
    </div>
  );
}
