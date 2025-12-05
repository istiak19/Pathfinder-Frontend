"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Guide {
  id: number;
  name: string;
  photo: string;
  expertise: string;
  rating: number;
}

const guides: Guide[] = [
  { id: 1, name: "Alice", photo: "/images/images.jpg", expertise: "History", rating: 4.9 },
  { id: 2, name: "Bob", photo: "/images/images.jpg", expertise: "Food", rating: 4.8 },
  { id: 3, name: "Carlos", photo: "/images/images.jpg", expertise: "Photography", rating: 5 },
];

export default function TopGuides() {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    rtl: true,
    breakpoints: {
      "(min-width: 768px)": { slides: { perView: 2, spacing: 20 } },
      "(min-width: 1024px)": { slides: { perView: 3, spacing: 20 } },
    },
    slides: { perView: 1, spacing: 20 },
  });

  useEffect(() => {
    if (!slider.current) return;

    let timer: NodeJS.Timeout;
    const autoplay = () => {
      clearTimeout(timer);
      timer = setTimeout(() => slider.current?.next(), 3000);
    };

    slider.current.on("slideChanged", autoplay);
    autoplay();

    return () => clearTimeout(timer);
  }, [slider]);

  return (
    <section className="py-20 px-4 bg-linear-to-r from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-300">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-800 dark:text-white"
      >
        🌟 Our Top Guides 🌟
      </motion.h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
        Meet the experts who will show you hidden gems and unforgettable experiences.
      </p>

      <div ref={sliderRef} className="keen-slider max-w-6xl mx-auto">
        {guides.map((guide) => (
          <div key={guide.id} className="keen-slider__slide">
            <motion.div whileHover={{ scale: 1.07, y: -5 }} transition={{ type: 'spring', stiffness: 200 }}>
              <Card className="rounded-2xl shadow-lg dark:shadow-black/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30">
                <CardContent className="p-6 text-center">
                  <motion.div
                    className="w-28 h-28 mx-auto mb-4 relative"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Image src={guide.photo} alt={guide.name} fill className="rounded-full object-cover shadow-md" />
                  </motion.div>

                  <h3 className="text-lg font-bold text-gray-800 dark:text-white drop-shadow-sm">
                    {guide.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{guide.expertise}</p>

                  <p className="text-yellow-500 mt-2 font-semibold text-sm">⭐ {guide.rating}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}