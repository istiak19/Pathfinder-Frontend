"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Autoplay from "swiper/modules/autoplay/autoplay";
import { motion } from "framer-motion";
import Image from "next/image";

// Guide type definition
interface Guide {
  id: number;
  name: string;
  photo: string;
  expertise: string;
  rating: number;
}

const guides: Guide[] = [
  { id: 1, name: "Alice", photo: "/guides/alice.jpg", expertise: "History", rating: 4.9 },
  { id: 2, name: "Bob", photo: "/guides/bob.jpg", expertise: "Food", rating: 4.8 },
  { id: 3, name: "Carlos", photo: "/guides/carlos.jpg", expertise: "Photography", rating: 5 },
];

const TopGuides: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Top Guides</h2>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {guides.map((guide: Guide) => (
          <SwiperSlide key={guide.id}>
            <motion.div
              className="bg-white rounded-xl shadow-lg p-4 text-center hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <Image
                  src={guide.photo}
                  alt={guide.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="font-bold">{guide.name}</h3>
              <p className="text-sm text-gray-500">{guide.expertise}</p>
              <p className="text-yellow-500 mt-2">⭐ {guide.rating}</p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TopGuides;