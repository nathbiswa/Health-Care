"use client";

import { useEffect, useState } from "react";
import GlobalCard from "@/Components/GlobalCard";

export default function SearchableDoctors({ initialDoctors }) {
    const [query, setQuery] = useState("");
    const [doctors, setDoctors] = useState(initialDoctors || []);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (query.trim()) {
                fetchDoctors(query);
            } else {
                setDoctors(initialDoctors || []);
            }
        }, 500);

        return () => clearTimeout(delay);
    }, [query, initialDoctors]);

    const fetchDoctors = async (searchText) => {
        try {
            setLoading(true);

            const res = await fetch(
                `https://appionment-server.vercel.app/search?q=${searchText}`
            );

            const data = await res.json();
            setDoctors(data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div >

            {/* INPUT FIXED */}
            <input
                type="text"
                placeholder="Search your doctor..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-3 border rounded-lg outline-none"
            />

            {loading && (
                <p className="mt-2 text-blue-500">Searching...</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
                {!loading && doctors.length === 0 && query && (
                    <p className="text-red-500">No doctor found</p>
                )}

                {doctors.map((doc) => (
                    <GlobalCard key={doc._id} doc={doc} />
                ))}
            </div>
        </div>
    );
}