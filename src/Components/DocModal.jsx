"use client";

import { authClient } from "@/lib/auth-client";
import { Envelope } from "@gravity-ui/icons";
import { Button, DateField, Input, Label, Modal, Surface, TextField } from "@heroui/react";


export function DocModal({ doctor }) {

    const {
        data: session,
    } = authClient.useSession()

    const user = session?.user;
    console.log("From User", user);



    console.log('From MOdal', doctor);

    const { name, } = doctor;

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const doctorData = Object.fromEntries(formData.entries());
        console.log('From onsubmit data', doctorData);
    }

    return (

        <Modal>
            <Button className="px-8 py-3 bg-primary text-white rounded-lg 
          hover:bg-blue-700 transition-all duration-300 
          transform hover:scale-105"> Book Appointment</Button>
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
                                <form className="flex flex-col gap-4">
                                    <TextField defaultValue={user?.email} className="w-full" name="email" type="email">
                                        <Label>User Email</Label>
                                        <Input placeholder="Enter your email" />
                                    </TextField>

                                    <TextField defaultValue={name} className="w-full" name="name" type="text">
                                        <Label>Doctor Name</Label>
                                        <Input placeholder="Enter your name" />
                                    </TextField>
                                    <TextField className="w-full" name="name" type="text">
                                        <Label>Patient Name</Label>
                                        <Input placeholder="Enter your name" />
                                    </TextField>
                                    <div className="flex items-center gap-3">
                                        <TextField className="w-full" name="phone" type="tel">
                                            <Label>Phone</Label>
                                            <Input placeholder="Enter your phone number" />
                                        </TextField>

                                    </div>

                                    <TextField className="w-full" name="message">
                                        <Label>Message</Label>
                                        <Input placeholder="Enter your message" />
                                    </TextField>
                                    <Modal.Footer>
                                        <Button slot="close">Send Message</Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}