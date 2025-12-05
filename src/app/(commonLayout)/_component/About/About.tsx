/* eslint-disable react-hooks/purity */
"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const About = () => {
    const [sparkles, setSparkles] = useState<{ x: number; y: number }[]>([]);

    useEffect(() => {
        const count = 20;
        const positions = Array.from({ length: count }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
        }));
        setSparkles(positions);
    }, []);

    return (
        <section className="bg-gray-50 dark:bg-[#0f172a] overflow-hidden py-10 relative">
            {/* 🌟 Floating Sparkles */}
            <div className="absolute inset-0 pointer-events-none">
                {sparkles.map((pos, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-blue-400 blur-sm opacity-70"
                        initial={{ x: pos.x, y: pos.y, scale: 0, opacity: 0 }}
                        animate={{
                            x: pos.x + (Math.random() - 0.5) * 100,
                            y: pos.y + (Math.random() - 0.5) * 100,
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 px-4 py-2 rounded-full shadow-sm mb-4">
                        <Sparkles className="text-blue-600 w-4 h-4" />
                        <span className="text-sm font-medium text-blue-600">
                            Local Guide Platform
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Connect Travelers with Local Experts
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Our platform empowers passionate locals to share their city’s hidden gems, culture, and stories. Travelers can discover guides that match their interests – whether for a food crawl, photography walk, or historical tour – and explore a destination like a local.
                    </p>
                </motion.div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative flex justify-center"
                    >
                        <Image
                            src="/register.jpg"
                            alt="Local Guides Team"
                            width={550}
                            height={400}
                            className="rounded-2xl shadow-lg object-cover"
                        />
                    </motion.div>

                    {/* Text & Features */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        {[
                            {
                                title: "Project Overview",
                                desc: "Connect travelers with passionate local experts who provide authentic, personalized experiences. Locals can monetize their knowledge, while travelers enjoy unique, off-the-beaten-path adventures.",
                            },
                            {
                                title: "Objectives",
                                desc: "Build a platform connecting travelers and local guides, enable bookings, provide detailed profiles, reviews, and ensure a secure and engaging experience.",
                            },
                            {
                                title: "Core Features",
                                desc: "User authentication with roles, profile management, tour listings, search and matching, booking workflow, reviews & ratings, and secure payment integration.",
                            },
                        ].map((item, idx) => (
                            <Card
                                key={idx}
                                className="border-none shadow-md dark:bg-gray-900 bg-white rounded-xl"
                            >
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold text-blue-600 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {item.desc}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mt-20"
                >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Join the Local Guide Revolution
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
                        Become a guide, share your city’s stories, and offer unique experiences for travelers worldwide.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl">
                        Become a Guide
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default About;