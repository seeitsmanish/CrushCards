"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Share2, PenTool } from "lucide-react";
import Link from "next/link";
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description }: {
    icon: any;
    title: string;
    description: string;
}) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="relative bg-white/90 dark:bg-gray-800/90 p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-pink-100 dark:border-pink-900"
    >
        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <div className="bg-gradient-to-br from-red-400 to-pink-500 p-4 rounded-2xl shadow-lg">
                <Icon className="w-8 h-8 text-white" />
            </div>
        </div>
        <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
    </motion.div>
);

const features = [
    {
        icon: PenTool,
        title: "Personalized Cards",
        description: "Create up to 10 beautiful cards with your special memories and moments that tell your unique story."
    },
    {
        icon: Heart,
        title: "Custom Message",
        description: "Craft the perfect heartfelt message with our beautiful templates and customization options."
    },
    {
        icon: Share2,
        title: "Instant Sharing",
        description: "Share your proposal instantly with a unique, beautiful link that your loved one will treasure forever."
    }
];

// clientAnimation.tsx

export function AnimatedContent() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-12 max-w-4xl mx-auto"
        >
            {/* Hero icon */}
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative"
            >
                <div className="absolute inset-0 bg-red-500/20 dark:bg-red-400/20 rounded-full blur-xl" />
                <Heart className="w-20 h-20 mx-auto text-red-500 dark:text-red-400 relative z-10" />
            </motion.div>

            {/* Main title */}
            <motion.h1
                className="text-4xl md:text-7xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <span className="bg-gradient-to-r from-red-600 via-pink-600 to-red-600 dark:from-red-400 dark:via-pink-400 dark:to-red-400 text-transparent bg-clip-text">
                    Create Your Perfect Proposal
                </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                className="text-sm md:text-2xl text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                Craft a beautiful, personalized proposal that will make their heart skip a beat.
                Share your love story in a unique and memorable way.
            </motion.p>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12"
            >
                <Link href="/create">
                    <Button
                        size="lg"
                        className="group bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-10 py-7 text-lg rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                    >
                        <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
                        Create Your Proposal
                    </Button>
                </Link>
            </motion.div>

            {/* Features grid */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 pt-12"
            >
                {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </motion.div>
        </motion.div>
    );
}
