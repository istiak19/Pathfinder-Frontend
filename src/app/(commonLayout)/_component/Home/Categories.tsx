"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Category type definition
interface Category {
    id: number;
    name: string;
    icon: string;
}

const categories: Category[] = [
    { id: 1, name: "Food", icon: "/icons/food.png" },
    { id: 2, name: "Adventure", icon: "/icons/adventure.png" },
    { id: 3, name: "Culture", icon: "/icons/culture.png" },
    { id: 4, name: "Photography", icon: "/icons/photo.png" },
];

const Categories: React.FC = () => {
    return (
        <section className="py-16 px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Tour Categories</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {categories.map((cat: Category) => (
                    <motion.div
                        key={cat.id}
                        className="flex flex-col items-center p-4 bg-white rounded-xl shadow hover:scale-105 transition-transform duration-300 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="w-12 h-12 mb-2 relative">
                            <Image
                                src={cat.icon}
                                alt={cat.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="font-semibold">{cat.name}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Categories;