"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const reviews = [
    {
        name: "Rahim Uddin",
        text: "Very smooth booking experience. Doctor was highly professional and caring.",
        rating: 5,
    },
    {
        name: "Nusrat Jahan",
        text: "I found the right specialist within minutes. Excellent platform!",
        rating: 5,
    },
    {
        name: "Arif Khan",
        text: "Fast, secure and reliable healthcare service. Highly recommended.",
        rating: 4.9,
    },
    {
        name: "Shila Akter",
        text: "Loved the experience. Everything is very simple and user friendly.",
        rating: 5,
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-gradient-to-b from-white via-blue-50 to-white">

            {/* Header */}
            <div className="text-center mb-14 px-4">
                <h2 className="text-4xl font-bold text-gray-900">
                    What Our Patients Say
                </h2>
                <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                    Real experiences from people who trust our healthcare platform
                </p>
            </div>

            {/* Slider */}
            <div className="container mx-auto px-4">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    loop={true}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {reviews.map((item, i) => (
                        <SwiperSlide key={i}>
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                className="bg-white rounded-3xl shadow-md p-6 border hover:shadow-xl transition h-full"
                            >

                                {/* Stars */}
                                <div className="text-yellow-500 mb-3">
                                    {"⭐".repeat(Math.floor(item.rating))}
                                </div>

                                {/* Text */}
                                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                    "{item.text}"
                                </p>

                                {/* Name */}
                                <h4 className="font-semibold text-gray-900">
                                    {item.name}
                                </h4>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}