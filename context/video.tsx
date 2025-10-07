"use client";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  ChangeEvent,
} from "react";
import { createVideoAi } from "@/actions/geminiai";
import { generateImageAi } from "@/actions/replicateai";
import { generateAudio } from "@/actions/googlecloud";
import { generateCaptions } from "@/actions/assemblyai";
import { saveVideoToDatabase } from "@/actions/mongodb";
import { getUserCreditsDb, checkCreditRecordDb } from "@/actions/credit";
import toast from "react-hot-toast";

// const aiVideoScript = [
//   {
//     imagePrompt:
//       "A young person sitting on a park bench, looking down at their phone, feeling sad and defeated.",
//     textContent:
//       "Once upon a time, there was a young person struggling with a tough challenge.",
//   },
//   {
//     imagePrompt:
//       "The young person looks up at the sky and sees a beautiful sunrise, feeling a glimmer of hope.",
//     textContent:
//       "They felt lost and alone, like giving up was the only option.",
//   },
//   {
//     imagePrompt:
//       "The young person is shown walking through a field of flowers, with a bright and hopeful expression.",
//     textContent:
//       "But then, they took a moment to look up at the sky and saw a sunrise...",
//   },
//   {
//     imagePrompt:
//       "The young person is shown standing confidently and looking determined, with a sunrise in the background.",
//     textContent: "That sunrise gave them the strength to keep going.",
//   },
//   {
//     imagePrompt:
//       "The young person is shown smiling brightly, with a beautiful sunset in the background, looking happy and successful.",
//     textContent:
//       "And they realized, even in the darkest of times, hope can always be found.",
//   },
// ];
// const aiImages = [
//   "https://www.ailocal.com.au/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdz3j7khia%2Fimage%2Fupload%2Fv1731679645%2Fai_images%2FgH3OCtnJwxAbwk4PhmEKw.png&w=1920&q=75",
//   "https://res.cloudinary.com/dz3j7khia/image/upload/v1731241181/ai_video_images_udemy/ieLW5u2T-DsZ8QwjlvaLg.png",
//   "https://res.cloudinary.com/dz3j7khia/image/upload/v1731241186/ai_video_images_udemy/YZF3-gG51KMOtMNi3D2mo.png",
//   "https://res.cloudinary.com/dz3j7khia/image/upload/v1731241192/ai_video_images_udemy/e-epRC37SvCEey8m1KEKN.png",
//   "https://res.cloudinary.com/dz3j7khia/image/upload/v1731241197/ai_video_images_udemy/MA87j4-SVR-H_GafNyqsD.png",
// ];

const initialState = {
  script: "Script...",
  images: [] as string[],
  audio: "",
  captions: [] as object[],
  loading: false,
  selectedStory: "Inspirational Story",
  selectedStyle: "gta",
};

interface VideoContextType {
  script: string;
  setScript: Dispatch<SetStateAction<string>>;
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
  audio: string;
  setAudio: Dispatch<SetStateAction<string>>;
  captions: object[];
  setCaptions: Dispatch<SetStateAction<object[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loadingMessage: string;
  setLoadingMessage: Dispatch<SetStateAction<string>>;
  selectedStory: string;
  selectedStyle: string;
  customPrompt: string;
  handleStorySelect: (story: string) => void;
  handleStyleSelect: (style: string) => void;
  handleCustomPromptChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  credits: number;
  setCredits: Dispatch<SetStateAction<number>>;
  getUserCredits: () => void;
}

interface VideoScriptItem {
  imagePrompt: string;
  textContent: string;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  // state
  const [script, setScript] = useState(initialState.script);
  const [images, setImages] = useState(initialState.images);
  const [audio, setAudio] = useState(initialState.audio);
  const [captions, setCaptions] = useState(initialState.captions);
  const [loading, setLoading] = useState(initialState.loading);
  const [loadingMessage, setLoadingMessage] = useState("");
  // add state to create a new video
  const [selectedStory, setSelectedStory] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  // credits
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    getUserCredits();
  }, []);

  useEffect(() => {
    checkCreditRecordDb().then((credit) => {
      if (credit?.credits > 0) {
        setCredits(credit.credits);
      }
    });
  }, []);

  const getUserCredits = async () => {
    getUserCreditsDb().then((credit) => {
      console.log("credit in useEffect = ", credit);
      if (credit?.credits > 0) {
        setCredits(credit.credits);
      }
    });
  };

  const handleStorySelect = (story: string) => {
    setSelectedStory(story);
    if (story !== "Custom Prompt") {
      setCustomPrompt("");
    }
  };

  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style);
  };

  const handleCustomPromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomPrompt(e.target.value);
    setSelectedStory("Custom Prompt");
  };

  // const handleSubmit = async () => {
  //   try {
  //     setLoading(true);
  //     setLoadingMessage("Generating video script...");
  //     // 1. create video script using google generative ai
  //     const videoResponse: any = await createVideoAi(
  //       `Create a 30 second long ${
  //         customPrompt || selectedStory
  //       } video script. Include AI imagePrompt for each scene in ${selectedStyle} format. Provide the result in JSON format with 'imagePrompt' and 'textContent' fields.`
  //     );
  //     if (!videoResponse.success) {
  //       setLoading(false);
  //       setLoadingMessage("Failed to generate video script");
  //     }
  //     console.log(videoResponse);

  //     if (videoResponse.data.length >= 1) {
  //       setLoadingMessage("Generating images from the script...");

  //       const imageGenerationPromises: Promise<string | null>[] =
  //         videoResponse.data.map(
  //           async (item: VideoScriptItem): Promise<string | null> => {
  //             try {
  //               const imageUrl: string = await generateImageAi(
  //                 item.imagePrompt
  //               );
  //               return imageUrl;
  //             } catch (err) {
  //               console.error(err);
  //               return null;
  //             }
  //           }
  //         );

  //       const images: (string | null)[] = await Promise.all(
  //         imageGenerationPromises
  //       );

  //       const validImages: string[] = images.filter((image) => image !== null);

  //       setImages(validImages);
  //     }

  //     // 2. create video images replicate ai and cloudinary
  //     // 3. convert script to speech using google cloud text-to-speech
  //     // 4. save the audio to cloudinary
  //     // 5. generate captions from audio using assembly ai
  //   } catch (err) {
  //     console.error(err);
  //     setLoadingMessage("Failed to generate video script");
  //   } finally {
  //     setLoading(false);
  //     setLoadingMessage("");
  //   }
  // };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const videoScript: any = await generateVideoScript();
      console.log("videoScript in handleSubmit() => ", videoScript);
      const images = await generateImages(videoScript);
      const audioUrl = await generateAudioFile(videoScript);
      const captions = await generateCaptionsArray(audioUrl);

      if (videoScript && images && audioUrl && captions) {
        // save to db
        setLoadingMessage("Saving video to database...");
        const { success, credits }: any = await saveVideoToDatabase({
          videoScript,
          images,
          audioUrl,
          captions,
        });

        if (success) {
          setCredits(credits);
          setLoadingMessage("🎉 Video saved successfully!");
          toast.success("🎉 Video saved successfully!");
        } else {
          setCredits(credits);
          toast.error("Failed to save video to database");
        }
      }
      setLoadingMessage("Your video is ready for preview...");
    } catch (err) {
      console.error(err);
      setLoadingMessage("Failed to generate video script");
    } finally {
      setLoading(false);
    }
  };

  // const generateVideoScript = async () => {
  //   setLoadingMessage("Generating video script...");
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(aiVideoScript);
  //     }, 3000);
  //   });
  // };

  const generateVideoScript = async () => {
    try {
      setLoadingMessage("Generating video script...");

      const videoResponse: any = await createVideoAi(
        `Create a 10 second long ${
          customPrompt || selectedStory
        } video script. Include AI imagePrompt for each scene in ${selectedStyle} format. Provide the result in JSON format with 'imagePrompt' and 'textContent' fields. Ensure 'textContent' field has only the story text.`
      );

      if (!videoResponse.success) {
        setLoadingMessage("Failed to generate video script");
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        return null;
      }

      return videoResponse;
    } catch (err) {
      console.log(err);
      setLoadingMessage("Error generating video script");
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  // const generateImages = async (videoResponse: VideoScriptItem[]) => {
  //   setLoadingMessage("Generating images from the script...");

  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       setImages(aiImages);
  //       resolve(aiImages);
  //     }, 5000);
  //   });
  // };

  const generateImages = async (videoResponse: any) => {
    setLoadingMessage("Generating images from the script...");
    try {
      const imageGenerationPromises: Promise<string | null>[] =
        videoResponse.data.map(
          async (item: VideoScriptItem): Promise<string | null> => {
            try {
              const imageUrl: string = await generateImageAi(item.imagePrompt);
              return imageUrl;
            } catch (err) {
              console.error(err);
              return null;
            }
          }
        );

      const images: (string | null)[] = await Promise.all(
        imageGenerationPromises
      );

      const validImages: string[] = images.filter((image) => image !== null);

      setImages(validImages);
      return validImages;
    } catch (err) {
      console.error(err);
    }
  };

  const generateAudioFile = async (
    videoScript: any
  ): Promise<string | undefined> => {
    setLoading(true);
    setLoadingMessage("Generating audio file ...");

    console.log("videoScript to generate audio => ", videoScript);

    try {
      const script = videoScript.data
        .map((item: { textContent: string }) => item.textContent)
        .join(" ");

      const data: any = await generateAudio(script);
      console.log("audio response => ", data);
      setAudio(data.url);
      return data.url;

      // const url =
      //   "https://res.cloudinary.com/dz3j7khia/video/upload/v1731499829/8IYGDS.mp3";
      // setAudio(url);
      // return url;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  const generateCaptionsArray = async (audioUrl: any) => {
    setLoadingMessage("Generating captions from audio...");

    try {
      const captionsArray = await generateCaptions(audioUrl);
      setCaptions(captionsArray);
      return captionsArray;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <VideoContext.Provider
      value={{
        script,
        setScript,
        images,
        setImages,
        audio,
        setAudio,
        captions,
        setCaptions,
        loading,
        setLoading,
        loadingMessage,
        setLoadingMessage,
        selectedStory,
        selectedStyle,
        customPrompt,
        handleStorySelect,
        handleStyleSelect,
        handleCustomPromptChange,
        handleSubmit,
        credits,
        setCredits,
        getUserCredits,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
};
