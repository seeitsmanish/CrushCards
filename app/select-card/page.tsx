"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import FreeCards from "../components/SimpleCard";
import BasicCard from "../components/ElegantCard";
import PremiumCard from "../components/PremiumCard";
import { cardType, useFormData } from "../store/useFormData";
import { useRouter } from "next/navigation";

interface CardOption {
  title: string;
  icon: React.ReactNode;
  type: cardType;
  demoCards: React.ReactNode;
}

export default function SelectCardDesign() {
  const router = useRouter();

  const cardOptions: CardOption[] = [
    {
      title: "Simple Love",
      icon: <Heart className="w-6 h-6" />,
      type: "simple",
      demoCards: <FreeCards className="h-[450px] w-[300px]" imageUrl="https://i.ibb.co/gWx39fC/3.jpg" description="You are the reason my world feels so beautiful. ❤️" />
    },
    {
      title: "Elegant Memories",
      icon: <Heart className="w-6 h-6" />,
      type: "elegant",
      demoCards: <BasicCard className="h-[450px] w-[300px]" imageUrl="https://i.ibb.co/gWx39fC/3.jpg" description="You are the reason my world feels so beautiful. ❤️" />
    },
    {
      title: "Premium Moments",
      icon: <Heart className="w-6 h-6" />,
      type: "premium",
      demoCards: <PremiumCard className="w-[300px]" imageUrl="https://i.ibb.co/gWx39fC/3.jpg" description="You are the reason my world feels so beautiful. ❤️" />
    }
  ];
  const cardsType = useFormData(state => state.cardsType);
  const setCardsType = useFormData(state => state.setCardsType);
  const handleContinue = () => {
    if (!cardsType) return;
    router.push('/create-page');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-red-100 dark:from-pink-950 dark:to-red-900 py-12 overflow-hidden relative">
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
                className={`p-6 relative cursor-pointer transform transition-all duration-300 hover:scale-[1.01] ${cardsType === option.type
                  ? "ring-2 ring-red-500 dark:ring-red-400"
                  : ""
                  }`}
                onClick={() => setCardsType(option.type)}
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

          {/* Floating button section */}
          {cardsType && (
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-xs">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white w-full"
                onClick={handleContinue}
              >
                <Heart className="mr-2 h-5 w-5" />
                Continue
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}