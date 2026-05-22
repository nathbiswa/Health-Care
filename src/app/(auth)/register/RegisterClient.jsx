"use client"
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, Separator, TextField } from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

export default function RegisterClient() {

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            name: user.name,
            email: user.email,
            password: user.password,
            image: user.image
        })

        if (data) {
            toast.success('Successfully Sign Up');
            redirect('/');
        }

        if (error) {
            toast.error("Something went wrong");
        }
    }

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    }

    return (
        <div className="w-full md:w-100 mx-auto mt-10 border rounded-2xl 
        shadow-xl hover:shadow-2xl transition-all duration-500 
        animate-fadeIn overflow-hidden bg-white mb-10">

            <div className="text-center p-4">
                <h2 className="text-2xl md:text-3xl font-bold my-3 text-primary">
                    Register
                </h2>
                <p className="text-md md:text-lg text-grayText">
                    Start your journey with <span className="text-secondary font-semibold">Health Care</span>
                </p>
            </div>

            <Form
                onSubmit={onSubmit}
                className="flex justify-center w-96 flex-col gap-4 p-4 mx-auto animate-slideUp"
            >

                <TextField
                    isRequired
                    name="name"
                    validate={(value) => {
                        if (value.length < 3) {
                            return "Name must be at least 3 characters";
                        }
                        return null;
                    }}
                >
                    <Label>Name</Label>
                    <Input className="focus:ring-2 focus:ring-primary" placeholder="John Doe" />
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input className="focus:ring-2 focus:ring-primary" placeholder="john@example.com" />
                    <FieldError />
                </TextField>

                <TextField isRequired name="image">
                    <Label>Image</Label>
                    <Input className="focus:ring-2 focus:ring-primary" placeholder="Image URL" />
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input className="focus:ring-2 focus:ring-primary" placeholder="Enter your password" />
                    <Description>
                        Must be at least 8 characters with 1 uppercase and 1 number
                    </Description>
                    <FieldError />
                </TextField>

                <div className="flex justify-center">
                    <Button
                        className=" w-full bg-primary hover:bg-blue-700 text-white 
                        transition-all duration-300 transform hover:scale-105"
                        type="submit"
                    >
                        <Check />
                        Create Account
                    </Button>
                </div>
            </Form>

            <div className="flex justify-center items-center gap-3 px-4">
                <Separator />
                <div className="whitespace-nowrap text-grayText">Or</div>
                <Separator />
            </div>

            <div className="p-3">
                <Button
                    onClick={handleGoogleSignIn}
                    className="w-90 mx-auto flex justify-center items-center gap-3 
                    bg-secondary hover:bg-green-600 text-white 
                    transition-all duration-300 transform hover:scale-105"
                >
                    <FcGoogle />
                    Sign Up With Google
                </Button>
            </div>

            <div className="py-3 flex justify-center items-center gap-2 text-sm">
                <span className="text-grayText">Already have an account?</span>
                <Link className="text-primary hover:underline font-medium" href={'/login'}>
                    Login
                </Link>
            </div>
        </div>
    );
};

