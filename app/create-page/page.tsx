"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, Plus, Loader2, Camera, X, FileText } from "lucide-react";
import { useFormData } from "../store/useFormData";
import { useRouter } from "next/navigation";

export interface ProposalCard {
  imageUrl: string;
  description: string;
  className?: string;
}

interface FormErrors {
  proposalTitle?: string;
  cards?: { imageUrl?: string; description?: string }[];
}

type Proposal = {
  id: string;
  title: string;
  userId: string;
  cards: ProposalCard[];
  uniqueSlug: string;
  cardTypeId: string;
  createdAt: string; // ISO string format
  views: number;
};

export default function CreateProposal() {
  const [cards, setCards] = useState<ProposalCard[]>([{ imageUrl: "", description: "" }]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<(string | null)[]>([null]);
  const [activeCard, setActiveCard] = useState<number | null>(null);



  const router = useRouter();
  const proposalTitle = useFormData(state => state.proposalTitle);
  const setProposalTitle = useFormData(state => state.setProposalTitle);
  const setCardsInStore = useFormData(state => state.setCards);

  // Sparkle animation
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

  // adding it here so that all the hooks are present in every render
  const cardsType = useFormData(state => state.cardsType);

  if (!cardsType) {
    router.replace("/dashboard");
    return null;
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate proposal title
    if (!proposalTitle.trim()) {
      newErrors.proposalTitle = "Proposal title is required";
      isValid = false;
    }

    // Validate cards
    newErrors.cards = cards.map(card => ({
      imageUrl: !card.imageUrl ? "Image URL is required" : undefined,
      description: !card.description.trim() ? "Description is required" : undefined
    }));

    if (newErrors.cards.some(card => card.imageUrl || card.description)) {
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

    let cardsTypeFromDB;
    try {
      const cardTypes = await fetch('/api/cards');
      if (!cardTypes.ok) throw new Error('Failed to load card types');
      cardsTypeFromDB = await cardTypes.json();
    } catch (error: any) {
      console.log(error);
    }
    const cardsTypeId = cardsTypeFromDB.find((x: any) => x.name.toLowerCase() === cardsType).id;
    if (!cardsTypeId) throw new Error('Failed to find card type');
    try {
      const requestBody = {
        title: proposalTitle.trim(),
        cards: cards.map(({ imageUrl, description }) => ({
          imageUrl,
          description: description.trim()
        })),
        cardTypeId: cardsTypeId,
      }
      let response = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) throw new Error(`Failed to create proposal: ${response.status}`);
      response = await response.json()
      // @ts-ignore
      const { uniqueSlug } = response;
      router.push(`/proposal?slug=${uniqueSlug}`);
      setErrors({});
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
          <div className="text-center mb-6">
            <Heart className="w-12 h-12 mx-auto text-red-500 dark:text-red-400 mb-2 animate-bounce" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Create Your Proposal
            </h1>
            <p className="text-md text-gray-600 dark:text-gray-300 mt-2">Share your love story beautifully</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Proposal Title Section */}
            <Card className="p-6 bg-gradient-to-br from-white to-pink-50 dark:from-gray-900 dark:to-pink-950">
              <div className="space-y-4">
                <Label htmlFor="proposalTitle" className="inline-flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5" />
                  Proposal Title
                  {errors.proposalTitle && (
                    <span className="text-red-500 text-sm ml-2">{errors.proposalTitle}</span>
                  )}
                </Label>
                <Input
                  id="proposalTitle"
                  placeholder="Give your proposal a memorable name"
                  value={proposalTitle}
                  onChange={(e) => setProposalTitle(e.target.value)}
                  className={`text-base transition-all duration-200 ${errors.proposalTitle ? 'border-red-500' : 'hover:border-red-300'}`}
                />
              </div>
            </Card>

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
            <Button
              type="submit"
              size="lg"
              className={`w-full h-16 relative overflow-hidden transition-all duration-300 ${isSubmitting
                ? 'bg-gray-400'
                : 'bg-gradient-to-r from-[#fb4042] to-[#ec228a] text-white font-medium text-md hover:from-red-600 hover:to-pink-600'
                }`}
              disabled={isSubmitting}
            >
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