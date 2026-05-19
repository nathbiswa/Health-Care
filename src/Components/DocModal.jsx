"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Select, Input, Label, ListBox, Modal, Surface, TextField, DateField, TimeField } from "@heroui/react";
import { toast } from "react-toastify";

export function DocModal({ doctor }) {

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const name = doctor?.name;

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const doctorData = Object.fromEntries(formData.entries());

        // extra safe fields (recommended)
        const bookingPayload = {
            ...doctorData,
            doctorId: doctor?._id,
            doctorSpeciality: doctor?.speciality,
            createdAt: new Date().toISOString(),
        };

        try {
            const res = await fetch("http://localhost:8000/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingPayload),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Appointment Booking successful");
            } else {
                toast.error("Booking failed");
            }

            console.log("Saved:", data);
        } catch (error) {
            console.error(error);
            toast.error("Server error");
        }
    };

    return (
        <Modal>
            <Button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                Book Appointment
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">

                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Heading>Booking Appointment</Modal.Heading>
                            <h1>{name}</h1>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default">

                                <form onSubmit={onSubmit} className="flex flex-col gap-4">

                                    {/* USER EMAIL */}
                                    <TextField defaultValue={user?.email || ""} name="email">
                                        <Label>User Email</Label>
                                        <Input placeholder="Enter your email" />
                                    </TextField>

                                    {/* DOCTOR NAME (NOT EDITABLE) */}
                                    <TextField defaultValue={name || ""} name="doctorName">
                                        <Label>Doctor Name</Label>
                                        <Input readOnly />
                                    </TextField>

                                    {/* PATIENT NAME */}
                                    <TextField name="patientName">
                                        <Label>Patient Name</Label>
                                        <Input placeholder="Enter patient name" />
                                    </TextField>

                                    {/* GENDER + PHONE */}
                                    <div className="flex items-center gap-3">

                                        <Select
                                            onSelectionChange={(val) => {
                                                document.getElementById("genderInput").value = val;
                                            }}
                                            className="w-full"
                                        >
                                            <Label>Gender</Label>

                                            <Select.Trigger className="rounded-2xl">
                                                <Select.Value />
                                                <Select.Indicator />
                                            </Select.Trigger>

                                            <Select.Popover>
                                                <ListBox>
                                                    <ListBox.Item textValue="Male">Male</ListBox.Item>
                                                    <ListBox.Item textValue="Female">Female</ListBox.Item>
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>

                                        <input type="hidden" name="gender" id="genderInput" />

                                        <TextField name="phone">
                                            <Label>Phone</Label>
                                            <Input placeholder="Enter phone number" />
                                        </TextField>

                                    </div>

                                    {/* DATE + TIME */}
                                    <div className="flex items-center gap-3">

                                        <DateField name="date" className="w-full">
                                            <Label>Date</Label>
                                            <DateField.Group>
                                                <DateField.Input>
                                                    {(segment) => <DateField.Segment segment={segment} />}
                                                </DateField.Input>
                                            </DateField.Group>
                                        </DateField>

                                        <TimeField name="time" className="w-full">
                                            <Label>Time</Label>
                                            <TimeField.Group>
                                                <TimeField.Input>
                                                    {(segment) => <TimeField.Segment segment={segment} />}
                                                </TimeField.Input>
                                            </TimeField.Group>
                                        </TimeField>

                                    </div>

                                    {/* REASON */}
                                    <TextField name="message">
                                        <Label>Reason</Label>
                                        <Input placeholder="Brief reason for visit" />
                                    </TextField>

                                    <Button type="submit" className="w-full">
                                        Confirm Booking
                                    </Button>

                                </form>

                            </Surface>
                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}