"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Dashboard() {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:8000/booking?email=${user.email}`)
            .then(res => res.json())
            .then(data => setBookings(data));
    }, [user?.email]);

    return (
        <div className="p-5">
            <h1 className="text-xl font-bold mb-4">
                My Appointments
            </h1>

            {bookings.length === 0 ? (
                <p>No bookings found</p>
            ) : (
                bookings.map((b) => (
                    <div key={b._id} className="border p-4 rounded mb-3">
                        <h2 className="font-semibold">
                            Doctor: {b.doctorName}
                        </h2>

                        <p>Patient: {b.patientName}</p>
                        <p>Gender: {b.gender}</p>
                        <p>Phone: {b.phone}</p>
                        <p>Date: {b.date}</p>
                        <p>Time: {b.time}</p>
                        <p>Reason: {b.message}</p>
                    </div>
                ))
            )}
        </div>
    );
}