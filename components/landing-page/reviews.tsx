import React from "react";

const reviews = [
  {
    name: "Alex Johnson",
    role: "Content Creator",
    quote:
      "AiVid has revolutionized my content creation process. I can now produce high-quality shorts in minutes!",
  },
  {
    name: "Sarah Lee",
    role: "Marketing Manager",
    quote:
      "The AI-generated scripts and visuals are incredibly creative. It's like having a whole production team at my fingertips.",
  },
  {
    name: "Mike Brown",
    role: "Small Business Owner",
    quote:
      "Affordable and easy to use. AiVid has helped me boost my social media presence without breaking the bank.",
  },
];

export default function Reviews() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors"
            >
              <p className="mb-4 italic text-gray-300">"{testimonial.quote}"</p>
              <div className="font-semibold">{testimonial.name}</div>
              <div className="text-gray-400">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
