"use client";
import React from "react";
import { useVideo } from "@/context/video";
import { createVideoAi } from "@/actions/geminiai";
import { Button } from "@/components/ui/button";
import { storyOptions, styleOptions } from "@/constants";
import Image from "next/image";
import { Loader2Icon } from "lucide-react";
import LoadingModal from "@/components/modal/loading";
import RemotionPlayer from "@/components/video/remotion-player";

export default function CreateVideoPage() {
  const {
    selectedStory,
    selectedStyle,
    customPrompt,
    handleStorySelect,
    handleStyleSelect,
    handleCustomPromptChange,
    handleSubmit,
    loading,
    images,
    audio,
    captions,
  } = useVideo();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div className="p-10 bg-gray-800 text-white">
            <h1 className="text-2xl font-bold mb-5">Create video page</h1>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">
                Select a Story Type of Enter Custom Prompt
              </h2>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {storyOptions.map((story) => (
                  <div key={story.label} className="h-auto">
                    {story.type === "custom" ? (
                      <>
                        <input
                          type="text"
                          value={customPrompt}
                          onChange={handleCustomPromptChange}
                          placeholder="Enter custom prompt"
                          className={`h-12 w-full bg-gray-700 text-white border-2 text-xs ${
                            selectedStory === "Custom Prompt"
                              ? "border-blue-500"
                              : "border-gray-500"
                          } focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2`}
                        />
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => handleStorySelect(story.label)}
                          variant="outline"
                          className={`h-12 w-full bg-gray-700 text-white border-2 text-xs ${
                            selectedStory === story.label
                              ? "bg-blue-500 text-white border-blue-500"
                              : "bg-gray-700 text-gray-300 border-gray-500"
                          } rounded-lg p-2`}
                        >
                          {story.label}
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">
                Select A Video Style
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {styleOptions.map((style) => (
                  <div
                    key={style.name}
                    onClick={() => handleStyleSelect(style.name)}
                    className={`relative cursor-pointer rounded-lg transition-all duration-200 aspect-square overflow-hidden ${
                      selectedStyle === style.name
                        ? "ring-4 ring-blue-500 ring-offset-4 ring-offset-gray-800"
                        : "hover:scale-105"
                    }`}
                  >
                    <Image
                      src={style.image}
                      alt={style.name}
                      layout="fill"
                      objectFit="cover"
                      className={`transition-transform duration-200 ${
                        selectedStyle === style.name ? "scale-105" : ""
                      }`}
                    />

                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                        selectedStyle === style.name
                          ? "bg-transparent"
                          : "bg-black bg-opacity-40"
                      }`}
                    >
                      <span className="font-semibold text-white text-lg">
                        {style.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={(!selectedStory && !customPrompt) || !selectedStyle}
              className="w-full h-12 bg-green-500 text-white text-lg rounded hover:bg-green-700"
            >
              {loading && (
                <Loader2Icon size={24} className="mr-4 animate-spin" />
              )}{" "}
              Create Video
            </Button>

            <LoadingModal />

            {/* <pre>{JSON.stringify(images, null, 4)}</pre>
            <pre>{JSON.stringify(audio, null, 4)}</pre>
            <pre>{JSON.stringify(captions, null, 4)}</pre> */}
          </div>
        </div>

        <div className="flex justify-center items-center vh-100 order-1 lg:order-2">
          {images && audio && captions ? (
            <div className="flex justify-center p-10">
              <RemotionPlayer />
            </div>
          ) : (
            <p className="text-center my-10">No video data</p>
          )}
        </div>
      </div>
    </>
  );
}
