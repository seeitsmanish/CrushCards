"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Share2, Copy } from "lucide-react";
import { useState } from "react";

export default function ProposalPreview() {
  const [copied, setCopied] = useState(false);
  const proposalUrl = "https://yourwebsite.com/proposal/123"; // Will be dynamic

  const copyToClipboard = () => {
    navigator.clipboard.writeText(proposalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-red-100 dark:from-pink-950 dark:to-red-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <Heart className="w-12 h-12 mx-auto text-red-500 dark:text-red-400 mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Your Proposal is Ready!
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Share this special moment with your loved one
            </p>
          </div>

          <Card className="p-6 mb-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Share Your Proposal</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Copy the link below and share it with your special someone
                </p>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={proposalUrl}
                  readOnly
                  className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
                <Button
                  variant="outline"
                  onClick={copyToClipboard}
                  className="min-w-[100px]"
                >
                  {copied ? (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>

              <div className="flex gap-4">
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => window.open(proposalUrl, "_blank")}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  View Proposal
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    // Will implement sharing functionality
                  }}
                >
                  <Share2 className="mr-2 h-5 w-5" />
                  Share
                </Button>
              </div>
            </div>
          </Card>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>The proposal link will be active according to your selected plan.</p>
            <p>Make sure to save it somewhere safe!</p>
          </div>
        </div>
      </div>
    </div>
  );
}