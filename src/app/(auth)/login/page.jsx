"use client"
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Card, Description, FieldError, Form, Input, Label, Separator, TextField } from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const SignInPage = () => {

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password
        })

        if (data) {
            toast.success('Successfully Sign In');
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
        <Card className="w-100 mx-auto mt-20 overflow-hidden 
        shadow-xl border border-gray-200 
        transition-all duration-500 hover:shadow-2xl animate-fadeIn">

            <div className="text-center p-4">
                <h2 className="text-3xl font-bold my-3 text-primary">
                    Welcome Back
                </h2>
                <p className="text-grayText">
                    Resume your journey with <span className="text-secondary font-semibold">Health Care</span>
                </p>
            </div>

            <Form
                onSubmit={onSubmit}
                className="flex justify-center w-96 flex-col gap-4 p-4 mx-auto animate-slideUp"
            >

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
                        className="w-full bg-primary hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105"
                        type="submit"
                    >
                        <Check />
                        Login
                    </Button>
                </div>
            </Form>

            <div className="p-3">
                <Button
                    onClick={handleGoogleSignIn}
                    className="w-full flex justify-center items-center gap-3 
                    bg-secondary hover:bg-green-600 text-white 
                    transition-all duration-300 transform hover:scale-105"
                >
                    <FcGoogle />
                    Sign In With Google
                </Button>
            </div>

            <div className="py-3 flex justify-center items-center gap-2 text-sm">
                <span className="text-grayText">Don't have an account?</span>
                <Link className="text-primary hover:underline font-medium" href={'/register'}>
                    Create an Account
                </Link>
            </div>
        </Card>
    );
};

export default SignInPage;