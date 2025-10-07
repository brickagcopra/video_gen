import React from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const pricePlans = [
  { name: "Starter", credits: 10, price: 5.0 },
  { name: "Pro", credits: 20, price: 10.0, popular: true },
  { name: "Enterprise", credits: 50, price: 20.0 },
];

export default function Pricing() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Simple Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {pricePlans.map((plan, index) => (
            <PriceCard index={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

const PriceCard = ({ index, plan }: any) => (
  <div
    key={index}
    className={`bg-gray-800 p-6 rounded-lg border ${
      plan.popular ? "border-purple-500" : "border-gray-700"
    } hover:border-purple-500 transition-colors`}
  >
    {plan.popular && (
      <div className="text-purple-400 text-sm mb-2">Most Popular</div>
    )}
    <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
    <div className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
      ${plan.price}
      <span className="text-xl text-gray-400">/mo</span>
    </div>
    <ul className="mb-6 space-y-2">
      <li className="flex items-center">
        <Check className="w-5 h-5 mr-2 text-green-500" />
        {plan.credits} AI-generated videos
      </li>
      <li className="flex items-center">
        <Check className="w-5 h-5 mr-2 text-green-500" />
        Access to all features
      </li>
      <li className="flex items-center">
        <Check className="w-5 h-5 mr-2 text-green-500" />
        24/7 support
      </li>
    </ul>
    <Link href="/buy-credits">
      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
        {plan.popular ? "Get Started" : "Choose Plan"}
      </Button>
    </Link>
  </div>
);
