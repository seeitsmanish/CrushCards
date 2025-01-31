"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles, Crown } from "lucide-react";
import Link from "next/link";

interface CardOption {
  title: string;
  price: string;
  features: string[];
  icon: React.ReactNode;
  type: "free" | "basic" | "premium";
}

export default function SelectCard() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const cardOptions: CardOption[] = [
    {
      title: "Free",
      price: "$0",
      features: [
        "Up to 5 memory cards",
        "Basic design template",
        "24-hour link validity",
        "Email notification"
      ],
      icon: <Heart className="w-6 h-6" />,
      type: "free"
    },
    {
      title: "Basic",
      price: "$4.99",
      features: [
        "Up to 8 memory cards",
        "Enhanced design templates",
        "7-day link validity",
        "Email notification",
        "Custom response options"
      ],
      icon: <Sparkles className="w-6 h-6" />,
      type: "basic"
    },
    {
      title: "Premium",
      price: "$9.99",
      features: [
        "Up to 10 memory cards",
        "Premium design templates",
        "30-day link validity",
        "Priority email delivery",
        "Custom response options",
        "Background music",
        "Advanced animations"
      ],
      icon: <Crown className="w-6 h-6" />,
      type: "premium"
    }
  ];

  const handleContinue = () => {
    if (!selectedCard) return;
    
    if (selectedCard === "free") {
      // Redirect to final page
      window.location.href = "/proposal/preview";
    } else {
      // Redirect to payment page
      window.location.href = "/payment";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-red-100 dark:from-pink-950 dark:to-red-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <Heart className="w-12 h-12 mx-auto text-red-500 dark:text-red-400 mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Perfect Design
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Select a design that matches your love story
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cardOptions.map((option) => (
              <Card
                key={option.type}
                className={`p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                  selectedCard === option.type
                    ? "ring-2 ring-red-500 dark:ring-red-400"
                    : ""
                }`}
                onClick={() => setSelectedCard(option.type)}
              >
                <div className="text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mb-4">
                    <div className="text-red-500 dark:text-red-400">
                      {option.icon}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{option.title}</h2>
                  <p className="text-3xl font-bold text-red-500 dark:text-red-400 mb-4">
                    {option.price}
                  </p>
                  <ul className="text-left space-y-2">
                    {option.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Heart className="w-4 h-4 text-red-500 dark:text-red-400 mr-2" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button
              size="lg"
              className={`bg-red-600 hover:bg-red-700 text-white px-8 ${
                !selectedCard ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleContinue}
              disabled={!selectedCard}
            >
              <Heart className="mr-2 h-5 w-5" />
              Continue with {selectedCard ? selectedCard.charAt(0).toUpperCase() + selectedCard.slice(1) : "Selected"} Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}