"use client";

import { motion } from "framer-motion";

const steps = [
    { icon: "🗺️", title: "Search Tours", description: "Find experiences that match your interests" },
    { icon: "📅", title: "Book a Guide", description: "Request a tour at your preferred date/time" },
    { icon: "🌟", title: "Enjoy & Review", description: "Experience like a local and share feedback" },
];

export default function HowItWorks() {
    return (
        <section className="py-16 px-4 bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {steps.map((step, i) => (
                    <motion.div key={i} className="p-6 bg-white rounded-xl shadow-lg hover:translate-y-[-5px] transition-transform duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2, duration: 0.5 }}
                    >
                        <div className="text-blue-500 mb-4 text-4xl">{step.icon}</div>
                        <h3 className="font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}