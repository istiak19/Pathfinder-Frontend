"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Category {
    id: number;
    name: string;
    icon: string;
}

const categories: Category[] = [
    { id: 1, name: "Food", icon: "/icons/food.png" },
    { id: 2, name: "Adventure", icon: "/icons/adventure.png" },
    { id: 3, name: "Culture", icon: "/icons/culture.png" },
    { id: 4, name: "Art", icon: "/icons/Art.jpg" },
    { id: 5, name: "Nature", icon: "/icons/Nature.jpg" },
    { id: 6, name: "Shopping", icon: "/icons/Shopping.jpg" },
    { id: 7, name: "Sports", icon: "/icons/Sports.jpg" },
    { id: 8, name: "Wellness", icon: "/icons/Wellness.jpg" },
    { id: 9, name: "History", icon: "/icons/History.jpg" },
    { id: 9, name: "Entertainment", icon: "/icons/Entertainment.jpg" },
];

const Categories: React.FC = () => {
    return (
        <section className="py-16 bg-linear-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">
                Tour Categories
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
                {categories.map((cat: Category, i) => (
                    <motion.div
                        key={cat.id}
                        className="flex flex-col items-center justify-center p-6 w-36 h-36 bg-white/90 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 cursor-pointer"
                        whileHover={{ scale: 1.07 }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2, duration: 0.5 }}
                    >
                        <div className="w-16 h-16 relative">
                            <Image
                                src={cat.icon}
                                alt={cat.name}
                                fill
                                className=" rounded-full"
                            />
                        </div>
                        <span className="font-semibold text-gray-800 dark:text-white text-lg text-center">
                            {cat.name}
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Categories;