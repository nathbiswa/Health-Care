"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, ToggleButton, Button, Input } from "@heroui/react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardClient() {

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [bookings, setBookings] = useState([]);
    const [activeTab, setActiveTab] = useState("booking");
    const [loading, setLoading] = useState(true);

    const [editBooking, setEditBooking] = useState(null);

    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    // ================= FETCH BOOKINGS =================
    useEffect(() => {
        if (isPending) return;
        if (!user?.email) return;

        setName(user?.name || "");
        setImage(user?.image || "");

        fetch(`https://appionment-server.vercel.app/booking?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setBookings(data);
                setLoading(false);
            });
    }, [user, isPending]);

    if (isPending) return <p>Loading...</p>;

    // ================= DELETE =================
    const handleDelete = async (id) => {
        const res = await fetch(
            `https://appionment-server.vercel.app/booking/${id}`,
            { method: "DELETE" }
        );

        if (res.ok) {
            setBookings(prev => prev.filter(b => b._id !== id));
            toast.success("Booking deleted");
        } else {
            toast.error("Delete failed");
        }
    };

    // ================= UPDATE BOOKING =================
    const handleUpdate = async () => {
        const res = await fetch(
            `https://appionment-server.vercel.app/booking/${editBooking._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editBooking),
            }
        );

        if (res.ok) {
            setBookings(prev =>
                prev.map(b =>
                    b._id === editBooking._id ? editBooking : b
                )
            );

            toast.success("Booking updated");
            setEditBooking(null);
        } else {
            toast.error("Update failed");
        }
    };

    // ================= PROFILE UPDATE =================
    const handleProfileUpdate = async () => {
        const res = await fetch(
            `https://appionment-server.vercel.app/users/${user.email}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, image }),
            }
        );

        if (res.ok) {
            toast.success("Profile updated");
            setEditProfileOpen(false);
        } else {
            toast.error("Profile update failed");
        }
    };

    return (
        <div className="container mx-auto p-5">

            <ToastContainer />

            <h1 className="text-2xl font-bold mb-5">
                Dashboard
            </h1>

            {/* ================= TOGGLE ================= */}
            <div className="flex gap-3 mb-6">

                <ToggleButton
                    isSelected={activeTab === "booking"}
                    onPress={() => setActiveTab("booking")}
                >
                    Booking
                </ToggleButton>

                <ToggleButton
                    isSelected={activeTab === "profile"}
                    onPress={() => setActiveTab("profile")}
                >
                    Profile
                </ToggleButton>

            </div>

            {/* ================= BOOKING ================= */}
            {activeTab === "booking" && (
                loading ? (
                    <p>Loading...</p>
                ) : bookings.length === 0 ? (
                    <p>No bookings</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {bookings.map(b => (
                            <Card key={b._id} className="p-4">

                                <h2 className="font-bold">{b.doctorName}</h2>
                                <p>Patient: {b.patientName}</p>
                                <p>Date: {b.date}</p>
                                <p>Time: {b.time}</p>
                                <p>Reason: {b.message}</p>

                                <div className="flex gap-2 mt-3">

                                    <Button
                                        size="sm"
                                        color="primary"
                                        onPress={() => setEditBooking(b)}
                                    >
                                        Update
                                    </Button>

                                    <Button
                                        size="sm"
                                        color="danger"
                                        onPress={() => handleDelete(b._id)}
                                    >
                                        Delete
                                    </Button>

                                </div>

                            </Card>
                        ))}

                    </div>
                )
            )}

            {/* ================= PROFILE ================= */}
            {activeTab === "profile" && (
                <Card className="max-w-sm p-5 text-center">

                    <Image
                        src={image || "/default-avatar.png"}
                        alt="profile"
                        width={100}
                        height={100}
                        className="rounded-full mx-auto mb-3"
                    />

                    <h2 className="font-bold">{name}</h2>
                    <p>{user?.email}</p>

                    <Button onPress={() => setEditProfileOpen(true)}>
                        Edit Profile
                    </Button>

                </Card>
            )}

            {/* ================= BOOKING MODAL ================= */}
            {editBooking && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

                    <div className="bg-white p-5 rounded-xl w-[320px]">

                        <h2 className="font-bold mb-3">
                            Update Booking
                        </h2>

                        <Input
                            label="Date"
                            value={editBooking.date}
                            onChange={(e) =>
                                setEditBooking({
                                    ...editBooking,
                                    date: e.target.value
                                })
                            }
                        />

                        <Input
                            label="Time"
                            className="mt-2"
                            value={editBooking.time}
                            onChange={(e) =>
                                setEditBooking({
                                    ...editBooking,
                                    time: e.target.value
                                })
                            }
                        />

                        <Input
                            label="Message"
                            className="mt-2"
                            value={editBooking.message}
                            onChange={(e) =>
                                setEditBooking({
                                    ...editBooking,
                                    message: e.target.value
                                })
                            }
                        />

                        <div className="flex gap-2 mt-4">

                            <Button onPress={handleUpdate}>
                                Save
                            </Button>

                            <Button
                                color="danger"
                                onPress={() => setEditBooking(null)}
                            >
                                Cancel
                            </Button>

                        </div>

                    </div>

                </div>
            )}

            {/* ================= PROFILE MODAL ================= */}
            {editProfileOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

                    <div className="bg-white p-5 rounded-xl w-[300px]">

                        <h2 className="font-bold mb-3">
                            Edit Profile
                        </h2>

                        <Input
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            label="Image URL"
                            className="mt-2"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />

                        <div className="flex gap-2 mt-4">

                            <Button onPress={handleProfileUpdate}>
                                Save
                            </Button>

                            <Button
                                color="danger"
                                onPress={() => setEditProfileOpen(false)}
                            >
                                Cancel
                            </Button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}