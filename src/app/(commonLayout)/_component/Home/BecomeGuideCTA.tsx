"use client";

import { motion } from "framer-motion";

export default function BecomeGuideCTA() {
    return (
        <section
            className="relative py-24 bg-cover bg-center"
            style={{ backgroundImage: 'url("/login.jpg")' }}
        >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/70"></div>

            <div className="relative z-10 flex flex-col items-center text-center px-4">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Share Your City, Earn Money!
                </motion.h2>

                <motion.p
                    className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-2xl drop-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                >
                    Become a local guide and host unique experiences that travelers will never forget.
                </motion.p>

                <motion.button
                    className="bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Become a Guide
                </motion.button>
            </div>
        </section>
    );
}