"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";
import { motion } from "framer-motion";
import Image from "next/image";

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

const Testimonials: React.FC = () => {
    return (
        <section className="py-16 px-4 bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>

            <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                spaceBetween={20}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                loop
                autoplay={{ delay: 4000, disableOnInteraction: false }}
            >
                {testimonials.map((t: Testimonial) => (
                    <SwiperSlide key={t.id}>
                        <motion.div
                            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
                            whileHover={{ scale: 1.03 }}
                        >
                            <div className="w-16 h-16 mx-auto mb-4 relative">
                                <Image
                                    src={t.photo}
                                    alt={t.name}
                                    width={64}
                                    height={64}
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <p className="italic text-gray-600 mb-2">"{t.comment}"</p>
                            <h4 className="font-bold">{t.name}</h4>
                            <p className="text-yellow-500">⭐ {t.rating}</p>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Testimonials;