'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export type SimpleCardPropsType = {
    description?: string;
    imageUrl?: string;
    className?: string;
    badge?: boolean;
}
const SimpleCard = ({
    description = 'Every beat of my heart belongs to you my love',
    imageUrl = 'https://photosnow.org/wp-content/uploads/2024/04/cute-girl-pic_11.jpg',
    className,
    badge = false
}: SimpleCardPropsType) => {

    const floatingHearts = Array(5).fill(null);

    return (
        <div className={cn("relative", className)}>
            <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                {/* Background Glow */}
                <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 rounded-2xl opacity-75 blur-xl"
                    animate={{
                        scale: [0.8, 1, 0.8],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Main Heart Container */}
                <motion.div
                    className="relative bg-gradient-to-br from-red-400 via-pink-500 to-purple-500 rounded-2xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Premium Badge */}
                    {badge && (
                        <motion.div
                            className="absolute top-4 right-4 z-20"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                        >
                            <div className="relative">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-600 rounded-full blur"
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
                                    <span className="text-white/90 text-sm font-medium">Free</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Content Container */}
                    <div className="relative p-6 flex flex-col items-center">
                        {/* Heart Border */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-red-300 to-pink-400"
                            style={{
                                clipPath: "path('M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z')"
                            }}
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Image */}
                        <motion.div
                            className="relative mt-8 mb-6"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className=" h-[280px] w-[280px] rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
                                <img
                                    src={imageUrl}
                                    alt="Love"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>

                        {/* Text Content */}
                        <motion.div
                            className="relative text-center z-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <p className="text-white/90 mb-6">
                                {description}
                            </p>
                        </motion.div>

                        {/* Floating Hearts */}
                        {floatingHearts.map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-white/40"
                                initial={{
                                    y: 0,
                                    x: Math.random() * 200 - 100,
                                    scale: 0
                                }}
                                animate={{
                                    y: -200,
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: i * 0.8
                                }}
                            >
                                <Heart size={16 + Math.random() * 16} fill="currentColor" />
                            </motion.div>
                        ))}

                        {/* Sparkle Effects */}
                        <motion.div
                            className="absolute bottom-4 right-4"
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity
                            }}
                        >
                            <Sparkles className="text-yellow-300" size={24} />
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default SimpleCard;

export const SimpleBackground = () => {
    return (
        <div className="fixed w-full h-full bg-gradient-to-r from-blue-500 to-purple-500" />
    )
}