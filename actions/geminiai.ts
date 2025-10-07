"use server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is required");
}

const defaultMessage =
  "Create a 5 second long INSPIRATIONAL STORY video script. Include AI imagePrompts in GTA FORMAT for each scene in realistic format. Provide the result in JSON format with 'imagePrompt' and 'textContent' flields.";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function createVideoAi(message: string = defaultMessage) {
  console.log("createVideoAi message = ", message);
  const chatSession = model.startChat({
    generationConfig,
  });

  const result = await chatSession.sendMessage(message);
  const response = result.response.text();
  const cleanedResponse = response.replace(/```json|\n```/g, "").trim();
  let jsonResponse;

  // let jsonResponse = [
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

  try {
    jsonResponse = JSON.parse(cleanedResponse);
    console.log(jsonResponse);
    if (jsonResponse) {
      return {
        success: true,
        data: jsonResponse,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: "",
    };
  }
}
