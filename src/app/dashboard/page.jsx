"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, ToggleButton, Button, Input } from "@heroui/react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    // console.log("User:", user, session);

    const [bookings, setBookings] = useState([]);
    console.log("Bookings:", bookings);
    const [activeTab, setActiveTab] = useState("booking");
    const [loading, setLoading] = useState(true);

    // profile state
    const [editOpen, setEditOpen] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        if (isPending) return; // wait for session to load
        if (!user?.email) return;

        setName(user?.name || "");
        setImage(user?.image || "");

        fetch(`https://appionment-server.vercel.app/booking?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setBookings(data);
                setLoading(false);
            });
    }, [user, isPending]);

    // ================= CLOUDINARY UPLOAD =================
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "my_upload");

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await res.json();
        return data.secure_url;
    };

    // ================= DELETE BOOKING =================
    const handleDelete = async (id) => {

        const res = await fetch(`https://appionment-server.vercel.app/booking/${id}`, {
            method: "DELETE",
        });

        if (res) {
            // setBookings(bookings.filter((b) => b._id !== id));
            toast.success("Booking deleted");
            window.location.reload();
        } else {
            toast.error("Delete failed ");
        }

    };

    // ================= UPDATE BOOKING =================
    const handleUpdate = async (id) => {
        const date = prompt("Enter new date:");
        const time = prompt("Enter new time:");

        if (!date || !time) return;

        const res = await fetch(`https://appionment-server.vercel.app/booking/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ date, time }),
        });

        if (res.ok) {
            setBookings((prev) =>
                prev.map((b) =>
                    b._id === id ? { ...b, date, time } : b
                )
            );
            toast.success("Booking updated");
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
            toast.success("Profile updated successfully");
            setEditOpen(false);
        } else {
            toast.error("Profile update failed");
        }
    };

    if (isPending) {
        return <p>Loading session...</p>;
    }
    return (
        <div className="container mx-auto p-5">

            <ToastContainer />

            <h1 className="text-2xl font-bold mb-5">Dashboard</h1>

            {/* TOGGLE */}
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
                <div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : bookings.length === 0 ? (
                        <p>No bookings found</p>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {bookings.map((b) => (
                                <Card key={b._id} className="p-4">
                                    <h2 className="font-bold">{b.doctorName}</h2>
                                    <p>Patient: {b.patientName}</p>
                                    <p>Email: {b.email}</p>
                                    <p>Phone: {b.phone}</p>
                                    <p>Date: {b.date}</p>
                                    <p>Time: {b.time}</p>

                                    <div className="flex gap-2 mt-3">

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
                    )}
                </div>
            )}

            {/* ================= PROFILE ================= */}
            {activeTab === "profile" && (
                <Card className="max-w-sm p-5">
                    <div className="text-center">
                        <Image
                            src={image || "/default-avatar.png"}
                            alt="profile"
                            width={100}
                            height={100}
                            className="rounded-full mx-auto mb-3"
                        />

                        <h2 className="font-bold">{name}</h2>
                        <p className="text-gray-500">{user?.email}</p>

                        <Button
                            size="sm"
                            className="mt-3"
                            onPress={() => setEditOpen(true)}
                        >
                            Edit Profile
                        </Button>
                    </div>
                </Card>
            )}

            {/* ================= EDIT PROFILE MODAL ================= */}
            {editOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-5 rounded-xl w-[300px]">

                        <h2 className="font-bold mb-3">Edit Profile</h2>

                        <Input
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            label="Image URL"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="mt-2"
                        />

                        {/* IMAGE UPLOAD */}
                        <input
                            type="file"
                            className="mt-2"
                            onChange={async (e) => {
                                const file = e.target.files[0];
                                const url = await handleImageUpload(file);
                                setImage(url);
                            }}
                        />

                        <div className="flex gap-2 mt-4">
                            <Button size="sm" onPress={handleProfileUpdate}>
                                Save
                            </Button>

                            <Button
                                size="sm"
                                color="danger"
                                onPress={() => setEditOpen(false)}
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