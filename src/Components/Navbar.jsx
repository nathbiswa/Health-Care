"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
    const [user, setUser] = useState(null); // later replace with auth

    const handleLogout = () => {
        // TODO: logout logic
        setUser(null);
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

                {/* Logo + Name */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo-care.png"
                        alt="DocAppoint"
                        width={38}
                        height={38}
                    />
                    <span className="text-xl font-bold">
                        <span className="text-blue-600">Healt</span>
                        <span className="text-secondary">Care</span>
                    </span>
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-6 font-medium text-gray-700">
                    <Link href="/" className="hover:text-primary transition">
                        Home
                    </Link>
                    <Link href="/appointments" className="hover:text-primary transition">
                        All Appointment
                    </Link>
                    <Link href="/dashboard" className="hover:text-primary transition">
                        Dashboard
                    </Link>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-3">
                    {!user ? (
                        <>
                            <Link
                                href="/login"
                                className="px-4 py-1.5 border border-primary text-primary rounded hover:bg-primary hover:text-white transition"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="px-4 py-1.5 bg-secondary text-white rounded hover:bg-green-600 transition"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Image
                                src={user?.photo || "/user.png"}
                                alt="profile"
                                width={36}
                                height={36}
                                className="rounded-full border"
                            />
                            <button
                                onClick={handleLogout}
                                className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}