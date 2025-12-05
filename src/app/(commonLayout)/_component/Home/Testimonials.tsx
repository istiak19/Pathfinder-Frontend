"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

// Testimonial type
interface Testimonial {
    id: number;
    name: string;
    comment: string;
    photo: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    { id: 1, name: "Emma", comment: "Amazing experience!", photo: "/users/emma.jpg", rating: 5 },
    { id: 2, name: "Liam", comment: "Guide was very friendly!", photo: "/users/liam.jpg", rating: 4.8 },
    { id: 3, name: "Sophia", comment: "Hidden gems discovered!", photo: "/users/sophia.jpg", rating: 5 },
];

export default function Testimonials() {
    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: { perView: 1, spacing: 20 },
        breakpoints: {
            "(min-width: 768px)": { slides: { perView: 2, spacing: 20 } },
            "(min-width: 1024px)": { slides: { perView: 3, spacing: 25 } },
        },
    });

    // AutoPlay
    useEffect(() => {
        if (!slider.current) return;

        let timer: NodeJS.Timeout;
        const autoplay = () => {
            clearTimeout(timer);
            timer = setTimeout(() => slider.current?.next(), 4000);
        };

        slider.current.on("slideChanged", autoplay);
        autoplay();

        return () => clearTimeout(timer);
    }, [slider]);

    return (
        <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">
                Testimonials
            </h2>

            <div ref={sliderRef} className="keen-slider max-w-6xl mx-auto">
                {testimonials.map((t) => (
                    <div key={t.id} className="keen-slider__slide">
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition-shadow duration-500"
                        >
                            <div className="w-20 h-20 mx-auto mb-4 relative">
                                <Image
                                    src={t.photo}
                                    alt={t.name}
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <p className="italic text-gray-600 dark:text-gray-300 mb-2">{t.comment}</p>
                            <h4 className="font-semibold text-gray-800 dark:text-white">{t.name}</h4>
                            <p className="text-yellow-500 mt-2 font-medium">⭐ {t.rating}</p>
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    );
}