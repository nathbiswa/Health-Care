"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export default function Hero() {
    return (
        <div className="relative">
            <Swiper
                modules={[Navigation, Pagination]}
                navigation={true}
                pagination={{ clickable: true }}
                loop={false} // ❌ loop off
                className="h-[90vh]"
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className="h-full relative">
                        <Image
                            src="https://i.ibb.co.com/KxCm7f4j/photo-1588776814546-1ffcf47267a5.jpg"
                            alt="doctor"
                            width={800}
                            height={600}
                            className="w-full h-full object-cover"
                        />

                        {/* overlay */}
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-center text-white px-6 animate-fadeIn">
                                <h1 className="text-xl md:text-6xl font-bold mb-4">
                                    Your Health, Our Priority
                                </h1>
                                <p className="text-sm md:text-xl mb-6">
                                    Book appointments with top doctors easily.
                                </p>
                                <button className="bg-primary px-6 py-2 rounded hover:bg-blue-700 transition">
                                    Find Doctors
                                </button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className="h-full relative">
                        <Image
                            src="https://i.ibb.co.com/Y7rCDscN/photo-1579154204601-01588f351e67.jpg"
                            alt="hospital"
                            width={800}
                            height={600}
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-center text-white px-6 animate-fadeIn">
                                <h1 className="text-xl md:text-6xl font-bold mb-4">
                                    Trusted Medical Experts
                                </h1>
                                <p className="text-sm md:text-xl mb-6">
                                    Connect with experienced doctors anytime.
                                </p>
                                <button className="bg-secondary px-6 py-2 rounded hover:bg-green-600 transition">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <div className="h-full relative">
                        <Image
                            src="https://i.ibb.co.com/392tZnTJ/photo-1584515933487-779824d29309.jpg"
                            alt="clinic"
                            width={800}
                            height={600}
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-center text-white px-6 animate-fadeIn">
                                <h1 className="text-xl md:text-6xl font-bold mb-4">
                                    Fast & Easy Booking
                                </h1>
                                <p className="text-sm md:text-xl mb-6">
                                    Schedule appointments in seconds.
                                </p>
                                <button className="bg-primary px-6 py-2 rounded hover:bg-blue-700 transition">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}