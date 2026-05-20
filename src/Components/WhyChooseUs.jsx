"use client";

import { motion } from "framer-motion";

const features = [
    {
        title: "Verified Doctors",
        desc: "All doctors are professionally verified and approved for quality care.",
        icon: "🩺",
    },
    {
        title: "Fast Appointment",
        desc: "Book appointments instantly without waiting or hassle.",
        icon: "⚡",
    },
    {
        title: "Secure Data",
        desc: "Your personal health data is fully encrypted and protected.",
        icon: "🔒",
    },
    {
        title: "24/7 Support",
        desc: "We are always available to help you anytime you need assistance.",
        icon: "💬",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-24 bg-gradient-to-b from-blue-50 via-white to-cyan-50">

            {/* Header */}
            <div className="text-center mb-14 px-4">
                <h2 className="text-4xl font-bold text-gray-900">
                    Why Choose Us
                </h2>
                <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                    A smarter, safer, and faster healthcare experience designed for everyone
                </p>
            </div>

            {/* Grid */}
            <div className="container mx-auto grid md:grid-cols-4 gap-6 px-4">
                {features.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{
                            y: -10,
                            scale: 1.05,
                        }}
                        className="relative p-6 rounded-3xl bg-white/70 backdrop-blur-md border border-white/40 shadow-md hover:shadow-2xl transition"
                    >

                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-200/30 to-cyan-200/30 opacity-0 hover:opacity-100 transition"></div>

                        {/* Icon */}
                        <div className="relative z-10 w-14 h-14 flex items-center justify-center rounded-2xl bg-blue-100 text-2xl mb-5 shadow-sm">
                            {item.icon}
                        </div>

                        {/* Title */}
                        <h3 className="relative z-10 text-lg font-semibold text-gray-900 mb-2">
                            {item.title}
                        </h3>

                        {/* Description */}
                        <p className="relative z-10 text-sm text-gray-500 leading-relaxed">
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}