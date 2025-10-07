import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faq = [
  {
    question: "How does the credit system work?",
    answer:
      "Each video generation costs a 1 credit. You can purchase credit packs anytime or top-up to your account.",
  },
  {
    question: "Can I decide what the AI will generate?",
    answer:
      "Yes, you can choose from the existing template options or you can enter your own custom prompts for generating video scripts, images and subtitles.",
  },
  {
    question: "What can these videos be used for?",
    answer:
      "These AI generated short-form video formats can be used to publish videos with platforms like TikTok, Instagram Reels and YouTube Shorts.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, new users can sign up and start generating AI videos for free. Free credits will apply to your account as soon as you signin. No credit card required.",
  },
];

export default function FAQ() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          {faq.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-gray-700"
            >
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
