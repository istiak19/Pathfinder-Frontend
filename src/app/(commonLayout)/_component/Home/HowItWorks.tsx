"use client";

import { motion } from "framer-motion";

const steps = [
    { icon: "🗺️", title: "Search Tours", description: "Find experiences that match your interests" },
    { icon: "📅", title: "Book a Guide", description: "Request a tour at your preferred date/time" },
    { icon: "🌟", title: "Enjoy & Review", description: "Experience like a local and share feedback" },
];

export default function HowItWorks() {
    return (
        <section className="py-20 px-4 bg-linear-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14 text-gray-800 dark:text-white">
                How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        className="p-8 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 cursor-pointer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.3, duration: 0.6 }}
                    >
                        <div className="text-5xl mb-5 text-blue-500 dark:text-yellow-400">{step.icon}</div>
                        <h3 className="font-semibold text-xl md:text-2xl mb-3 text-gray-800 dark:text-white">
                            {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">{step.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}