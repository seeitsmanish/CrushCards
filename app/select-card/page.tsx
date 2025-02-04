"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import FreeCards from "../components/FreeCards";
import BasicCard from "../components/BasicCard";
import PremiumCard from "../components/PremiumCard";

interface CardOption {
  title: string;
  icon: React.ReactNode;
  type: "free" | "basic" | "premium";
  demoCards: React.ReactNode;
}

export default function SelectCardDesign() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const cardOptions: CardOption[] = [
    {
      title: "Simple Love",
      icon: <Heart className="w-6 h-6" />,
      type: "free",
      demoCards: <FreeCards className="h-[450px] w-[300px]" />
    },
    {
      title: "Elegant Memories",
      icon: <Heart className="w-6 h-6" />,
      type: "basic",
      demoCards: <BasicCard className="h-[450px] w-[300px]" />
    },
    {
      title: "Premium Moments",
      icon: <Heart className="w-6 h-6" />,
      type: "premium",
      demoCards: <PremiumCard className="w-[300px]" />
    }
  ];

  const handleContinue = () => {
    if (!selectedCard) return;
    window.location.href = "/proposal/preview";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-red-100 dark:from-pink-950 dark:to-red-900 py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <Heart className="w-12 h-12 mx-auto text-red-500 dark:text-red-400 mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Design
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Select a design that tells your unique story
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cardOptions.map((option) => (
              <Card
                key={option.type}
                className={`p-6 relative cursor-pointer transform transition-all duration-300 hover:scale-[1.01] ${selectedCard === option.type
                  ? "ring-2 ring-red-500 dark:ring-red-400"
                  : ""
                  }`}
                onClick={() => setSelectedCard(option.type)}
              >
                <div className="text-center">
                  <div className="mb-10 h-[500px]">
                    {option.demoCards}
                  </div>

                  <h2 className="text-2xl font-bold mb-2 mt-4">{option.title}</h2>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button
              size="lg"
              className={`bg-red-600 hover:bg-red-700 text-white px-8 ${!selectedCard ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handleContinue}
              disabled={!selectedCard}
            >
              <Heart className="mr-2 h-5 w-5" />
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}