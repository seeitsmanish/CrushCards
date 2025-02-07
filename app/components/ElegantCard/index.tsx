'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export type ElegantCardPropsType = {
    description?: string;
    imageUrl?: string;
    className?: string;
    badge?: boolean;
}

const ElegantCard = ({
    description,
    imageUrl,
    className,
    badge = false
}: ElegantCardPropsType) => {
    // Particles for the background effect
    const particles = Array(20).fill(null);
    const orbs = Array(3).fill(null);

    return (
        <div className={className}>
            <motion.div>

                {/* Main Card Container */}
                <motion.div
                    className="relative backdrop-blur-xl bg-slate-900/30 rounded-3xl overflow-hidden border border-white/10"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Glassmorphic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5" />

                    {/* Basic Badge */}
                    {badge && (
                        <motion.div
                            className="absolute top-4 right-4 z-20"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                        >
                            <div className="relative">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full blur"
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
                                    <span className="text-white/90 text-sm font-medium">Basic</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Content Container */}
                    <div className="relative p-8">
                        {/* Floating Orbs */}
                        {orbs.map((_, i) => (
                            <motion.div
                                key={`orb-${i}`}
                                className="absolute w-32 h-32 rounded-full"
                                style={{
                                    background: `radial-gradient(circle, ${['rgba(139,92,246,0.15)', 'rgba(236,72,153,0.15)', 'rgba(99,102,241,0.15)'][i]
                                        } 0%, transparent 70%)`,
                                    left: `${[20, 50, 80][i]}%`,
                                    top: `${[30, 60, 40][i]}%`,
                                }}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0.8, 0.5],
                                    x: [0, 10, 0],
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 4 + i,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}

                        {/* Image Container */}
                        {
                            imageUrl && (
                                <motion.div
                                    className="relative mb-6"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="relative">
                                        {/* Image */}
                                        <div className="relative rounded-xl overflow-hidden">
                                            <img
                                                src={imageUrl}
                                                alt="Love"
                                                className="w-full h-[300px] object-cover"
                                            />
                                            {/* Image Overlay */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        }


                        {/* Message */}
                        <motion.div
                            className="relative text-center z-10 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <p className="text-white/90 text-lg font-medium italic">
                                {description}
                            </p>
                        </motion.div>

                        {/* Particle Effects */}
                        {particles.map((_, i) => (
                            <motion.div
                                key={`particle-${i}`}
                                className="absolute"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                }}
                                initial={{
                                    opacity: 0,
                                    scale: 0,
                                    y: 0,
                                }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0],
                                    y: -100,
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            >
                                {Math.random() > 0.5 ? (
                                    <Heart className="text-purple-500" size={8 + Math.random() * 8} />
                                ) : (
                                    <Heart className="text-purple-500" size={8 + Math.random() * 8} />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ElegantCard;


export const ElegantBackground = () => {
    return (
        <div className="fixed inset-0 w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] flex items-center justify-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>
    );
};