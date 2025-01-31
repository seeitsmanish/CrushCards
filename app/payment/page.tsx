"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, CreditCard, Lock } from "lucide-react";

export default function Payment() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Payment processing will be implemented here
    setTimeout(() => {
      window.location.href = "/proposal/preview";
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-red-100 dark:from-pink-950 dark:to-red-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <Heart className="w-12 h-12 mx-auto text-red-500 dark:text-red-400 mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Your Purchase
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Your proposal is almost ready
            </p>
          </div>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="pl-10"
                      required
                    />
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <div className="relative">
                      <Input
                        id="cvv"
                        placeholder="123"
                        className="pl-10"
                        required
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="name">Cardholder Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Processing...
                  </div>
                ) : (
                  <>
                    <Heart className="mr-2 h-5 w-5" />
                    Pay Now
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              <Lock className="inline-block w-4 h-4 mr-1" />
              Secured by Stripe. We never store your card details.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}