"use client";

import { motion } from "framer-motion";

export default function BecomeGuideCTA() {
    return (
        <section className="relative py-20 bg-cover bg-center" style={{ backgroundImage: 'url("/cta-bg.jpg")' }}>
            <div className="absolute inset-0 bg-black/40 flex justify-center items-center flex-col text-center text-white px-4">
                <motion.h2 className="text-4xl font-bold mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Share Your City, Earn Money!
                </motion.h2>
                <motion.p className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    Become a local guide and host unique experiences.
                </motion.p>
                <motion.button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full font-semibold transition-transform transform hover:scale-105"
                    whileHover={{ scale: 1.1 }}
                >
                    Become a Guide
                </motion.button>
            </div>
        </section>
    );
}