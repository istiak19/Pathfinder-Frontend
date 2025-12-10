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
    {
        id: 1,
        name: "Ayesha Rahman",
        comment: "Amazing experience!",
        photo: "https://i.ibb.co.com/fzQHM0d3/user1.jpg",
        rating: 9
    },

    {
        id: 2,
        name: "Mehedi Hasan",
        comment: "The guide was very friendly!",
        photo: "https://i.ibb.co.com/QFvHbkHs/user2.jpg",
        rating: 8.8
    },
    {
        id: 3,
        name: "Nusrat Jahan",

        comment: "Discovered beautiful hidden places!",
        photo: "https://i.ibb.co.com/QRxsYpv/user3.jpg",
        rating: 9.5
    },
    {
        id: 4,
        name: "Farhan Khan",
        comment: "A very memorable trip! Highly recommended.",
        photo: "https://i.ibb.co.com/QFvHbkHs/user2.jpg",
        rating: 9.3
    },
    {
        id: 5,
        name: "Sadia Alam",
        comment: "Everything was well organized. Loved it!",
        photo: "https://i.ibb.co.com/QRxsYpv/user3.jpg",
        rating: 9.1
    },
    {
        id: 6,
        name: "Rakibul Islam",
        comment: "Great experience with amazing views!",
        photo: "https://i.ibb.co.com/QFvHbkHs/user2.jpg",
        rating: 8.7
    },
    {
        id: 7,
        name: "Mahira Chowdhury",
        comment: "The guide explained everything clearly.",
        photo: "https://i.ibb.co.com/QRxsYpv/user3.jpg",
        rating: 9.2
    },
    {
        id: 8,
        name: "Tanvir Ahmed",
        comment: "Super friendly team and helpful guide!",
        photo: "https://i.ibb.co.com/QFvHbkHs/user2.jpg",
        rating: 8.9
    },
    {
        id: 9,
        name: "Samira Hossain",
        comment: "Loved the hospitality and locations!",
        photo: "https://i.ibb.co.com/QRxsYpv/user3.jpg",
        rating: 9.4
    },
    {
        id: 10,
        name: "Abdullah Saad",
        comment: "A wonderful trip with beautiful scenery!",
        photo: "https://i.ibb.co.com/QFvHbkHs/user2.jpg",
        rating: 8.6
    },
    {
        id: 11,
        name: "Faria Tasnim",
        comment: "Very well planned tour. I enjoyed it a lot.",
        photo: "https://i.ibb.co.com/QRxsYpv/user3.jpg",
        rating: 9.0
    },
    {
        id: 12,
        name: "Imran Hossain",
        comment: "Loved every moment of this journey!",
        photo: "https://i.ibb.co.com/QFvHbkHs/user2.jpg",
        rating: 9.3
    },
    {
        id: 13,
        name: "Raisa Karim",
        comment: "A peaceful and relaxing experience!",
        photo: "https://i.ibb.co.com/QFvHbkHs/user3.jpg",
        rating: 8.9
    }
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