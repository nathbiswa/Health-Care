"use client";

import { motion } from "framer-motion";

export default function CTA() {
    return (
        <section className="py-28 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white relative overflow-hidden">

            {/* Background glow circles */}
            <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl top-10 left-10"></div>
            <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl bottom-10 right-10"></div>

            <div className="relative z-10 text-center px-4">

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-md md:text-4xl font-bold mb-4"
                >
                    Book Your Doctor Appointment Today
                </motion.h2>

                {/* Subtitle */}
                <p className="text-sm md:text-lg text-white/80 max-w-xl mx-auto mb-8">
                    Get fast, secure, and reliable healthcare support from top-rated doctors. Your health is one click away.
                </p>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-4 justify-center">

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-white/30 transition"
                    >
                        Book Appointment
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="border border-white/60 px-6 py-3 rounded-2xl hover:bg-white/10 transition"
                    >
                        Learn More
                    </motion.button>

                </div>

                {/* small trust line */}
                <p className="text-white/60 text-sm mt-6">
                    ✔ No waiting time &nbsp; ✔ Verified Doctors &nbsp; ✔ Secure Platform
                </p>
            </div>
        </section>
    );
}