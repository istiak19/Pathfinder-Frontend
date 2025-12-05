"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface City {
    id: number;
    name: string;
    image: string;
}

const cities: City[] = [
    { id: 1, name: "Dhaka", image: "/cities/dhaka.jpg" },
    { id: 2, name: "Chittagong", image: "/cities/Chittagong.jpg" },
    { id: 3, name: "Sylhet", image: "/cities/Sylhet.jpg" },
    { id: 4, name: "Cox's Bazar", image: "/cities/Cox's Bazar.jpg" },
    { id: 5, name: "Rajshahi", image: "/cities/Rajshahi.jpg" },
    { id: 6, name: "Khulna", image: "/cities/Khulna.jpg" },
    { id: 7, name: "Barishal", image: "/cities/barishal.jpg" },
    { id: 8, name: "Rangpur", image: "/cities/Rangpur.jpg" },
];

const FeaturedCities: React.FC = () => {
    return (
        <section className="py-16 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
            <motion.h2
                className="text-3xl md:text-4xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Popular Cities in Bangladesh
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cities.map((city, index) => (
                    <motion.div
                        key={city.id}
                        className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                    >
                        <Image
                            src={city.image}
                            alt={city.name}
                            width={600}
                            height={400}
                            className="w-full h-52 md:h-56 lg:h-60 object-cover"
                        />

                        <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md p-3 text-white text-center font-semibold text-lg">
                            {city.name}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedCities;