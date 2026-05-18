"use client";

import Image from "next/image";

const DoctorDetailsCard = ({ doctor, onBook }) => {
    if (!doctor) return null;

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border animate-fadeIn">

            {/* Top Section */}
            <div className="grid md:grid-cols-3 gap-6 p-6">

                {/* Image */}
                <div className="flex justify-center">
                    <Image
                        src={doctor.image}
                        alt={doctor.name}
                        width={250}
                        height={250}
                        className="rounded-xl object-cover"
                    />
                </div>

                {/* Info */}
                <div className="md:col-span-2 space-y-3">

                    <h2 className="text-3xl font-bold text-primary">
                        {doctor.name}
                    </h2>

                    <p className="text-secondary font-medium">
                        {doctor.specialty}
                    </p>

                    <p className="text-gray-600">
                        🏥 {doctor.hospital}
                    </p>

                    <p className="text-gray-600">
                        📍 {doctor.location}
                    </p>

                    <p className="text-gray-600">
                        ⏱ Experience: {doctor.experience}
                    </p>

                    <p className="text-gray-700 leading-relaxed">
                        {doctor.description}
                    </p>

                    <div className="flex items-center gap-4 mt-4">
                        <span className="text-lg font-semibold text-primary">
                            Fee: ৳{doctor.fee}
                        </span>
                    </div>

                    {/* Availability */}
                    <div className="mt-3">
                        <h4 className="font-semibold mb-2">Available Time:</h4>
                        <div className="flex flex-wrap gap-2">
                            {doctor.availability?.map((time, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 text-sm bg-secondary text-white rounded-full"
                                >
                                    {time}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom CTA */}
            <div className="border-t p-6 flex justify-center">
                <button
                    onClick={onBook}
                    className="px-8 py-3 bg-primary text-white rounded-lg 
          hover:bg-blue-700 transition-all duration-300 
          transform hover:scale-105"
                >
                    Book Appointment
                </button>
            </div>
        </div>
    );
};

export default DoctorDetailsCard;