"use client";

import Image from "next/image";
import { FaHospital } from "react-icons/fa";
import { FcRating } from "react-icons/fc";
import { MdLocationOn } from "react-icons/md";
import { RiTimerFlashFill } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";
import { DocModal } from "./DocModal";

const DoctorDetailsCard = ({ doctor }) => {
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
                        width={800}
                        height={250}
                        className="rounded-xl object-cover"
                    />
                </div>

                {/* Info */}
                <div className="md:col-span-2 space-y-3">

                    <h2 className="text-3xl font-bold text-primary">
                        {doctor.name}
                    </h2>

                    <p className="text-secondary font-medium flex gap-2 items-center">
                        <FcRating /> {doctor.rating}
                    </p>

                    <p className="text-secondary font-medium">
                        {doctor.specialty}
                    </p>

                    <p className="text-gray-600 flex gap-2 items-center">
                        <FaHospital /> {doctor.hospital}
                    </p>

                    <p className="text-gray-600 flex gap-2 items-center">
                        <MdLocationOn /> {doctor.location}
                    </p>

                    <p className="text-gray-600 flex gap-2 items-center">
                        <RiTimerFlashFill /> Experience: {doctor.experience}
                    </p>

                    <p className="text-gray-700 leading-relaxed">
                        {doctor.description}
                    </p>

                    <div className="flex items-center gap-4 mt-4">
                        <span className="flex gap-2 items-center text-lg font-semibold text-primary">
                            Fee: <TbCurrencyTaka /> {doctor.fee}
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
            <div className=" py-2 flex justify-center">
                <DocModal doctor={doctor} />
            </div>
        </div>
    );
};

export default DoctorDetailsCard;