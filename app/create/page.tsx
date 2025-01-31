"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, Plus, Loader2, Camera, X, SparklesIcon } from "lucide-react";

interface ProposalCard {
  imageUrl: string;
  description: string;
}

interface FormErrors {
  cards?: { imageUrl?: string; description?: string }[];
  recipientEmail?: string;
  option1?: string;
  option2?: string;
  finalMessage?: string;
}

export default function CreateProposal() {
  const [cards, setCards] = useState<ProposalCard[]>([{ imageUrl: "", description: "" }]);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [finalMessage, setFinalMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<(string | null)[]>([null]);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Animation for sparkles
  useEffect(() => {
    const interval = setInterval(() => {
      const sparkles = document.querySelectorAll('.sparkle');
      sparkles.forEach(sparkle => {
        sparkle.classList.add('animate-ping');
        setTimeout(() => sparkle.classList.remove('animate-ping'), 1000);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    newErrors.cards = cards.map(card => ({
      imageUrl: !card.imageUrl ? "Image URL is required" : undefined,
      description: !card.description.trim() ? "Description is required" : undefined
    }));

    if (newErrors.cards.some(card => card.imageUrl || card.description)) {
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!recipientEmail) {
      newErrors.recipientEmail = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(recipientEmail)) {
      newErrors.recipientEmail = "Please enter a valid email address";
      isValid = false;
    }

    if (!option1.trim()) {
      newErrors.option1 = "Option 1 is required";
      isValid = false;
    }

    if (!option2.trim()) {
      newErrors.option2 = "Option 2 is required";
      isValid = false;
    }

    if (!finalMessage.trim()) {
      newErrors.finalMessage = "Final message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const addCard = () => {
    if (cards.length < 10) {
      setCards([...cards, { imageUrl: "", description: "" }]);
      setPreviewUrls([...previewUrls, null]);
    }
  };

  const removeCard = (index: number) => {
    if (cards.length > 1) {
      const newCards = cards.filter((_, i) => i !== index);
      const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
      setCards(newCards);
      setPreviewUrls(newPreviewUrls);
    }
  };

  const updateCard = (index: number, field: keyof ProposalCard, value: string) => {
    const newCards = [...cards];
    newCards[index] = { ...newCards[index], [field]: value };
    setCards(newCards);

    if (field === "imageUrl") {
      const newPreviewUrls = [...previewUrls];
      newPreviewUrls[index] = value;
      setPreviewUrls(newPreviewUrls);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log({ cards, recipientEmail, finalMessage });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-red-50 to-pink-100 dark:from-pink-950 dark:via-red-900 dark:to-pink-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* <div className="w-24 h-24 bg-red-100 dark:bg-red-900 rounded-full blur-xl animate-pulse"></div> */}
            </div>
            <Heart className="w-16 h-16 mx-auto text-red-500 dark:text-red-400 mb-4 relative animate-bounce" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Create Your Proposal
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Share your love story through beautiful memories
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {cards.map((card, index) => (
              <Card
                key={index}
                className={`group relative p-6 border-2 transition-all duration-300 
                  ${activeCard === index ? 'scale-102 shadow-2xl border-red-300' : 'hover:border-red-200'}
                  bg-gradient-to-br from-white to-pink-50 dark:from-gray-900 dark:to-pink-950`}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="absolute -top-2 -right-2">
                  <span className="sparkle inline-block w-4 h-4 text-yellow-400">✨</span>
                </div>

                {cards.length > 1 && (
                  <X
                    size="20"
                    onClick={() => removeCard(index)}
                    className="absolute right-4 h-4 w-4 rounded-full top-4 cursor-pointer"
                  />
                )}

                <div className="space-y-6">
                  <div className="relative">
                    <Label htmlFor={`imageUrl-${index}`} className="inline-flex items-center gap-2 text-lg mb-2">
                      <Camera className="h-5 w-5" />
                      Memory Image {index + 1}
                      {errors.cards?.[index]?.imageUrl && (
                        <span className="text-red-500 text-sm ml-2">{errors.cards[index].imageUrl}</span>
                      )}
                    </Label>
                    <div className="flex gap-4 items-start">
                      <div className="flex-1">
                        <Input
                          id={`imageUrl-${index}`}
                          placeholder="Enter image URL"
                          value={card.imageUrl}
                          onChange={(e) => updateCard(index, "imageUrl", e.target.value)}
                          className={`transition-all text-base duration-200 ${errors.cards?.[index]?.imageUrl ? 'border-red-500' : 'hover:border-red-300'}`}
                        />
                      </div>
                      {previewUrls[index] && (
                        <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-pink-200 shadow-lg transition-transform duration-200 hover:scale-150 hover:z-10">
                          <img
                            src={previewUrls[index] || ''}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={() => {
                              const newPreviewUrls = [...previewUrls];
                              newPreviewUrls[index] = '/api/placeholder/150/150';
                              setPreviewUrls(newPreviewUrls);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`description-${index}`} className="inline-flex items-center gap-2 text-lg">
                      <Heart className="h-5 w-5" />
                      Your Message
                      {errors.cards?.[index]?.description && (
                        <span className="text-red-500 text-sm ml-2">{errors.cards[index].description}</span>
                      )}
                    </Label>
                    <Textarea
                      id={`description-${index}`}
                      placeholder="Share your special memory..."
                      value={card.description}
                      onChange={(e) => updateCard(index, "description", e.target.value)}
                      className={`mt-2 text-base min-h-[100px] transition-all duration-200 ${errors.cards?.[index]?.description ? 'border-red-500' : 'hover:border-red-300'
                        }`}
                    />
                  </div>
                </div>
              </Card>
            ))}

            {cards.length < 10 && (
              <Button
                type="button"
                variant="outline"
                onClick={addCard}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-pink-50 to-red-50 
                  hover:from-pink-100 hover:to-red-100 dark:from-pink-950 dark:to-red-950 
                  border-2 border-dashed border-red-200 h-16"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-200 to-transparent 
                  -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <Plus className="mr-2 h-5 w-5" />
                Add Another Beautiful Memory
              </Button>
            )}

            <Card className="p-8 border-2 bg-gradient-to-br from-white to-pink-50 dark:from-gray-900 dark:to-pink-950">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="finalMessage" className="inline-flex items-center gap-2 text-lg">
                    <SparklesIcon className="h-5 w-5" />
                    Your Final Message
                    {errors.finalMessage && (
                      <span className="text-red-500 text-sm ml-2">{errors.finalMessage}</span>
                    )}
                  </Label>
                  <Textarea
                    id="finalMessage"
                    placeholder="Confess your final message, Ask them out"
                    value={finalMessage}
                    onChange={(e) => setFinalMessage(e.target.value)}
                    className={`mt-2 text-base min-h-[150px] transition-all duration-200 ${errors.finalMessage ? 'border-red-500' : 'hover:border-red-300'
                      }`}
                  />
                </div>

                <div>
                  <Label htmlFor="recipientEmail" className="inline-flex items-center gap-2 text-lg">
                    <Heart className="h-5 w-5" />
                    Option 1
                    {errors.recipientEmail && (
                      <span className="text-red-500 text-sm ml-2">{errors.option1}</span>
                    )}
                  </Label>
                  <Input
                    id="option1"
                    placeholder="Yes"
                    value={option1}
                    onChange={(e) => setOption1(e.target.value)}
                    className={`mt-2 transition-all text-base duration-200 ${errors.option1 ? 'border-red-500' : 'hover:border-red-300'
                      }`}
                  />
                </div>

                <div>
                  <Label htmlFor="recipientEmail" className="inline-flex items-center gap-2 text-lg">
                    <Heart className="h-5 w-5" />
                    Option 2
                    {errors.recipientEmail && (
                      <span className="text-red-500 text-sm ml-2">{errors.option2}</span>
                    )}
                  </Label>
                  <Input
                    id="option2"
                    placeholder="No"
                    value={option2}
                    onChange={(e) => setOption2(e.target.value)}
                    className={`mt-2 transition-all text-base duration-200 ${errors.option2 ? 'border-red-500' : 'hover:border-red-300'
                      }`}
                  />
                </div>

                <div>
                  <Label htmlFor="recipientEmail" className="inline-flex items-center gap-2 text-lg">
                    <Heart className="h-5 w-5" />
                    Recipient's Email
                    {errors.recipientEmail && (
                      <span className="text-red-500 text-sm ml-2">{errors.recipientEmail}</span>
                    )}
                  </Label>
                  <Input
                    id="recipientEmail"
                    type="email"
                    placeholder="Enter recipient's email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className={`mt-2 transition-all text-base duration-200 ${errors.recipientEmail ? 'border-red-500' : 'hover:border-red-300'
                      }`}
                  />
                </div>
              </div>
            </Card>

            <Button
              type="submit"
              size="lg"
              className={`w-full h-16 relative overflow-hidden transition-all duration-300 ${isSubmitting
                ? 'bg-gray-400'
                : 'bg-gradient-to-r from-[#fb4042] to-[#ec228a] font-medium text-md hover:from-red-600 hover:to-pink-600'
                }`}
              disabled={isSubmitting}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 
                -translate-x-full animate-shimmer" />
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Creating Your Magical Proposal...
                </>
              ) : (
                <>
                  <Heart className="mr-2 h-6 w-6 animate-pulse " />
                  Create Your Magical Proposal
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}