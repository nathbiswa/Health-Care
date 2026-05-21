"use client";

import { motion } from "framer-motion";

const steps = [
    {
        title: "Find a Doctor",
        desc: "Search and choose the right specialist based on your needs.",
        icon: "🔍",
    },
    {
        title: "Book Appointment",
        desc: "Select your preferred time and confirm instantly.",
        icon: "📅",
    },
    {
        title: "Get Consultation",
        desc: "Meet your doctor online or offline for proper treatment.",
        icon: "🩺",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-white">

            {/* Header */}
            <div className="text-center mb-14 px-4">
                <h2 className="text-xl md:text-4xl font-bold text-gray-900">
                    How It Works
                </h2>
                <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                    A simple 3-step process to get the right healthcare support instantly
                </p>
            </div>

            {/* Steps */}
            <div className="container mx-auto grid md:grid-cols-3 gap-8 px-4 relative">

                {/* line connector (desktop only) */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200"></div>

                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.15 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        className="relative bg-white border shadow-md rounded-3xl p-8 text-center hover:shadow-2xl transition"
                    >

                        {/* Step number circle */}
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                            {i + 1}
                        </div>

                        {/* Icon */}
                        <div className="text-4xl mt-6 mb-4">{step.icon}</div>

                        {/* Title */}
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {step.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-500 text-sm leading-relaxed">
                            {step.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}