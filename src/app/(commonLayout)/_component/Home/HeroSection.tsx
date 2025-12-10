"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HeroSection: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (!searchTerm.trim()) return;
        // Navigate to /explore with query param
        router.push(`/explore?search=${encodeURIComponent(searchTerm.trim())}`);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSearch();
    };
    return (
        <div
            className="relative w-full h-[75vh] md:h-[80vh] bg-cover bg-center"
            style={{
                backgroundImage: 'url("/images/banner.jpg")',
            }}
        >
            {/* Dark + Blur Overlay */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center px-6 text-center">

                {/* Heading */}
                <motion.h1
                    className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg leading-tight"
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Discover The World <br />
                    <span className="text-blue-400">With Local Experts</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="text-base md:text-xl text-gray-200 mt-3 max-w-2xl leading-relaxed"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                >
                    Find hidden gems, authentic culture, and unforgettable experiences.
                </motion.p>

                {/* Search Bar */}
                <motion.div
                    className="mt-6 w-full max-w-xl"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    <div
                        className="flex items-center  bg-white/30 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.15)] rounded-full px-5 py-4 border border-white/40 hover:bg-white/40 transition-all duration-300"
                    >
                        <input
                            type="text"
                            placeholder="Where are you going?"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className=" w-full bg-transparent text-white placeholder-white/50 outline-none px-2"
                        />

                        <button
                            onClick={handleSearch}
                            className="bg-blue-600/80 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold backdrop-blur-md transition-all cursor-pointer"
                        >
                            Search
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;