"use client";

import { LocalGuideLoaderProps } from "@/types/user.interface";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function LocalGuideLoader({
    text = "Finding the perfect guide for you...",
    size = "md",
    className = "",
    animated = true,
    showIcon = true,
}: LocalGuideLoaderProps) {
    const sizeClasses = {
        sm: "w-20 h-20",
        md: "w-32 h-32",
        lg: "w-48 h-48",
        xl: "w-64 h-64",
    };

    const textSizeClasses = {
        sm: "text-[10px]",
        md: "text-[13.6px]",
        lg: "text-[18px]",
        xl: "text-[24px]",
    };

    const iconSizeClasses = {
        sm: 14,
        md: 20,
        lg: 26,
        xl: 34,
    };

    return (
        <div className={`flex flex-col items-center gap-4 ${className} justify-center min-h-screen`}>

            {/* Main Loader Container */}
            <div className={`relative ${sizeClasses[size]}`}>

                {/* Outer Pulsing Ring */}
                {animated && (
                    <motion.div
                        className="absolute inset-0 rounded-full border-[3px] border-emerald-500"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 1.2, opacity: 0 }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                        }}
                    />
                )}

                {/* Static Outer Ring */}
                <div className="absolute inset-0 rounded-full border-[3px] border-emerald-500" />

                {/* Inner Icon */}
                <div className="absolute inset-[15%] flex items-center justify-center">
                    {showIcon && (
                        <motion.div
                            animate={
                                animated
                                    ? { scale: [1, 1.12, 1] }
                                    : {}
                            }
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <MapPin
                                className="text-orange-500"
                                size={iconSizeClasses[size]}
                                strokeWidth={2}
                            />
                        </motion.div>
                    )}
                </div>

                {/* Inner Pulse Animation */}
                {animated && (
                    <motion.div
                        className="absolute inset-[15%] rounded-full bg-orange-400/20"
                        animate={{
                            scale: [1, 1.25, 1],
                            opacity: [0.5, 0.15, 0.5],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                )}

            </div>

            {/* Text */}
            {text && (
                <motion.p
                    className={`font-medium text-gray-700 text-center ${textSizeClasses[size]}`}
                    initial={animated ? { opacity: 0, y: 12 } : {}}
                    animate={animated ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    {text}
                </motion.p>
            )}
        </div>
    );
};