'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dancing_Script } from 'next/font/google';
import { Heart, Sparkles, Stars } from 'lucide-react';

const dancingScript = Dancing_Script({
    subsets: ['latin'],
    weight: '700',
});

interface PremiumCardPropsType {
    imageUrl?: string;
    description?: string;
    className?: string;
    badge?: boolean;
}

const PremiumCard = ({
    imageUrl = 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=2788&auto=format&fit=crop',
    description = 'Every moment with you feels like a beautiful dream come true.',
    className = '',
    badge = false,
}: PremiumCardPropsType) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={`perspective-1000 ${className}`}>
            <motion.div
                className="relative rounded-xl bg-gradient-to-br from-pink-50 to-red-50 shadow-lg h-full w-full p-6 border border-pink-200 overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={`star-${i}`}
                            className="absolute"
                            initial={{
                                opacity: 0.2,
                                scale: Math.random() * 0.5 + 0.5,
                                x: Math.random() * window.innerWidth,
                                y: Math.random() * window.innerHeight,
                            }}
                            animate={{
                                opacity: [0.2, 0.5, 0.2],
                                scale: [1, 1.2, 1],
                                y: [null, '-100%'],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                ease: 'linear',
                                delay: Math.random() * 2,
                            }}
                        >
                            <Stars className="text-pink-200" size={8} />
                        </motion.div>
                    ))}
                </div>

                {/* Floating hearts decoration */}
                <AnimatePresence>
                    {isHovered && (
                        <>
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute"
                                    initial={{
                                        opacity: 0,
                                        scale: 0,
                                        x: Math.random() * 200 - 100,
                                        y: Math.random() * 200 + 100
                                    }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        scale: [0, 1, 0],
                                        y: [0, -100 - (Math.random() * 100)],
                                        x: [0, (Math.random() * 100 - 50)]
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: i * 0.2,
                                        repeat: Infinity
                                    }}
                                    style={{
                                        left: `${20 + (i * 10)}%`,
                                    }}
                                >
                                    <Heart
                                        className="text-pink-400"
                                        size={16}
                                        style={{
                                            filter: 'drop-shadow(0 0 2px rgba(244, 114, 182, 0.3))'
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </>
                    )}
                </AnimatePresence>


                {badge && (
                    <motion.div
                        className="absolute top-4 right-4 z-20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                    >
                        <div className="relative">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-600 rounded-full blur"
                                animate={{
                                    scale: [0.85, 1.15, 0.85],
                                    opacity: [0.6, 0.8, 0.6],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                            <div className="relative px-4 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/20">
                                <span className="text-white/90 text-sm font-medium">Premium</span>
                            </div>
                        </div>
                    </motion.div>
                )}


                {/* Main image with decorative frame */}
                <div className="relative bg-white p-4 rounded-lg shadow-lg transform rotate-[-2deg] border-4 border-pink-100">


                    <div className="absolute inset-0 bg-gradient-to-r from-pink-100 via-white to-pink-100 opacity-50" />
                    <motion.div
                        className="relative overflow-hidden rounded-lg"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.img
                            src={imageUrl}
                            alt="Valentine's Memory"
                            className="w-full object-cover h-[300px] rounded-lg"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-pink-500/30 to-transparent"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                        {/* Decorative corners */}
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={`corner-${i}`}
                                className={`absolute w-6 h-6 border-2 border-pink-300 ${i === 0 ? 'top-2 left-2 rounded-tl-lg' :
                                    i === 1 ? 'top-2 right-2 rounded-tr-lg' :
                                        i === 2 ? 'bottom-2 left-2 rounded-bl-lg' :
                                            'bottom-2 right-2 rounded-br-lg'
                                    }`}
                            />
                        ))}
                    </motion.div>
                </div>


                {/* Message with decorative elements */}
                <motion.div
                    className="mt-8 relative px-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="absolute left-0 top-0 w-4 h-4 border-l-2 border-t-2 border-pink-300" />
                    <div className="absolute right-0 top-0 w-4 h-4 border-r-2 border-t-2 border-pink-300" />
                    <div className="absolute left-0 bottom-0 w-4 h-4 border-l-2 border-b-2 border-pink-300" />
                    <div className="absolute right-0 bottom-0 w-4 h-4 border-r-2 border-b-2 border-pink-300" />

                    <p className={`${dancingScript.className} text-center text-xl text-pink-700 leading-relaxed`}>
                        {description}
                    </p>

                </motion.div>
            </motion.div>
        </div>
    );
};

export default PremiumCard;