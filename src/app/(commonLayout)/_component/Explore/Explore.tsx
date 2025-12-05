"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Tour {
    id: number;
    title: string;
    city: string;
    category: string;
    price: number;
    image: string;
    guide: string;
    rating: number;
}

// Sample tour data
const tours: Tour[] = [
    {
        id: 1,
        title: "Hidden Jazz Bars of New Orleans",
        city: "New Orleans",
        category: "Music",
        price: 50,
        image: "/tours/jazz.jpg",
        guide: "Emma",
        rating: 4.8,
    },
    {
        id: 2,
        title: "Rome Street Food Walk",
        city: "Rome",
        category: "Food",
        price: 70,
        image: "/tours/rome-food.jpg",
        guide: "Liam",
        rating: 5,
    },
    {
        id: 3,
        title: "Historic Tokyo Walking Tour",
        city: "Tokyo",
        category: "History",
        price: 65,
        image: "/tours/tokyo.jpg",
        guide: "Sophia",
        rating: 4.9,
    },
];

export default function Explore() {
    const [cityFilter, setCityFilter] = useState<string>("");
    const [categoryFilter, setCategoryFilter] = useState<string>("");

    const filteredTours = tours.filter(
        (tour) =>
            (cityFilter
                ? tour.city.toLowerCase().includes(cityFilter.toLowerCase())
                : true) &&
            (categoryFilter ? tour.category === categoryFilter : true)
    );

    return (
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
            {/* Page Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    Explore Tours & Local Experiences
                </h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Discover unique local experiences and connect with passionate guides
                    worldwide.
                </p>
            </div>

            {/* Filters */}
            <motion.div
                className="flex flex-col md:flex-row justify-center gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Input
                    placeholder="Search by city"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    className="md:w-1/4"
                />

                <Select
                    value={categoryFilter || "all"}
                    onValueChange={(value: string) =>
                        setCategoryFilter(value === "all" ? "" : value)
                    }
                >
                    <SelectTrigger className="md:w-1/4">
                        <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="Food">Food</SelectItem>
                        <SelectItem value="Music">Music</SelectItem>
                        <SelectItem value="History">History</SelectItem>
                        <SelectItem value="Adventure">Adventure</SelectItem>
                    </SelectContent>
                </Select>

                <Button
                    onClick={() => {
                        setCityFilter("");
                        setCategoryFilter("");
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    Reset Filters
                </Button>
            </motion.div>

            {/* Tours Grid */}
            <motion.div
                className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {filteredTours.length > 0 ? (
                    filteredTours.map((tour) => (
                        <Card
                            key={tour.id}
                            className="bg-white dark:bg-gray-800 shadow-md rounded-2xl hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative w-full h-48 rounded-t-2xl overflow-hidden">
                                <Image src={tour.image} alt={tour.title} fill className="object-cover" />
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {tour.title}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-2">
                                    {tour.city} • {tour.category}
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mb-2">
                                    Hosted by <span className="font-semibold">{tour.guide}</span>
                                </p>
                                <p className="text-yellow-500 font-medium mb-2">⭐ {tour.rating}</p>
                                <p className="text-gray-700 dark:text-gray-200 font-semibold mb-4">
                                    ${tour.price} per person
                                </p>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                    Book Now
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                        No tours found matching your criteria.
                    </p>
                )}
            </motion.div>
        </section>
    );
}