"use client";

import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [isOpen, setIsOpen] = useState(false);

    const handeleLogOut = async () => {
        await authClient.signOut();
    }

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

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6 font-medium text-gray-700">
                    <Link href="/" className={`px-3 py-1 rounded transition ${pathname === "/" ? "bg-blue-100 text-primary" : "hover:text-primary"
                        }`}>
                        Home
                    </Link>
                    <Link href="/appointments" className={`px-3 py-1 rounded transition ${pathname === "/appointments" ? "bg-blue-100 text-primary" : "hover:text-primary"
                        }`} >
                        All Appointment
                    </Link>
                    <Link href="/dashboard" className={`px-3 py-1 rounded transition ${pathname === "/dashboard" ? "bg-blue-100 text-primary" : "hover:text-primary"
                        }`}>
                        Dashboard
                    </Link>
                </div>

                {/* Right Side (Desktop) */}
                <div className="hidden md:flex items-center gap-3">
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
                            <Avatar>
                                <Avatar.Image alt="User" src={user?.image} />
                                <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                            </Avatar>
                            <button
                                onClick={handeleLogOut}
                                className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-6 pb-4 space-y-4 bg-white border-t animate-slideDown">

                    <Link href="/" className="block hover:text-primary">
                        Home
                    </Link>
                    <Link href="/appointments" className="block hover:text-primary">
                        All Appointment
                    </Link>
                    <Link href="/dashboard" className="block hover:text-primary">
                        Dashboard
                    </Link>

                    {!user ? (
                        <>
                            <Link
                                href="/login"
                                className="block px-4 py-2 border border-primary text-primary rounded text-center"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="block px-4 py-2 bg-secondary text-white rounded text-center"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <Avatar.Image alt="User" src={user?.image} />
                                    <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                                </Avatar>
                                <span>{user.name}</span>
                            </div>
                            <button
                                onClick={handeleLogOut}
                                className="px-3 py-2 bg-red-500 text-white rounded"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}