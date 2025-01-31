"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface ProposalCard {
  imageUrl: string;
  description: string;
}

export default function ProposalPage() {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // This will be replaced with actual data from the database
  const mockProposal = {
    cards: [
      {
        imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
        description: "The day we first met..."
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e",
        description: "Our first date at the park..."
      }
    ],
    finalMessage: "Will you be mine forever?",
    style: "premium" as const
  };

  const handleResponse = async (answer: "yes" | "think") => {
    setLoading(true);
    setResponse(answer);
    // Will implement response handling in the next step
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-red-100 dark:from-pink-950 dark:to-red-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {mockProposal.cards.map((card, index) => (
            <div
              key={index}
              className="mb-12 opacity-0 animate-[fadeIn_1s_ease-in_forwards]"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <Card className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={card.imageUrl}
                    alt={`Memory ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    {card.description}
                  </p>
                </div>
              </Card>
            </div>
          ))}

          <div className="text-center mt-16 space-y-8">
            <div className="animate-[fadeIn_1s_ease-in_forwards]" style={{ animationDelay: "2s" }}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                {mockProposal.finalMessage}
              </h2>

              {!response ? (
                <div className="space-x-4">
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white px-8"
                    onClick={() => handleResponse("yes")}
                    disabled={loading}
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Yes, I Accept!
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleResponse("think")}
                    disabled={loading}
                  >
                    Let Me Think!
                  </Button>
                </div>
              ) : (
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {response === "yes" ? (
                    <div className="flex items-center justify-center">
                      <Heart className="w-8 h-8 mr-2 animate-pulse" />
                      Thank you for accepting!
                    </div>
                  ) : (
                    "Take your time to think about it!"
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}