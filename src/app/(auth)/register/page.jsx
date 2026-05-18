"use client"
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, Separator, TextField } from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { use } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";



const SignUpPage = () => {

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        console.log("data form ", user);

        const { data, error } = await authClient.signUp.email({
            name: user.name,
            email: user.email,
            password: user.password,
            image: user.image
        })


        if (data) {
            redirect('/');
            toast.success('Sucessfuly signUp');
        }

        if (error) {
            toast.error("Somthing Wrong");
        }

    }

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    }

    return (
        <div className=" w-120 mx-auto border rounded-2xl shadow-2xl  mt-10">
            <div className="text-center">
                <h2 className="text-2xl font-bold my-3">Create Account</h2>
                <p>Start your adventure with Health-Care</p>
            </div>

            <Form onSubmit={onSubmit} className="flex justify-center w-96 flex-col gap-4 p-4" >
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
                    <Input placeholder=" John Doe" />
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
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    name="image"
                >
                    <Label>Image</Label>
                    <Input placeholder=" Image Url" />
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
                    <Input placeholder="Enter your password" />
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>
                <div className=" flex justify-center">
                    <Button className={'w-full bg-cyan-500'} type="submit">
                        <Check />
                        Create Account
                    </Button>
                </div>
            </Form>
            <div className="flex justify-center items-center gap-3">
                <Separator />
                <div className="whitespace-nowrap">Or</div>
                <Separator />
            </div>

            <div className=" p-3">
                <Button onClick={handleGoogleSignIn} className={'w-full flex justify-center items-center gap-3 bg-cyan-500'}>
                    <FcGoogle />
                    SignUp With Google
                </Button>
            </div>
            <div className="py-3 flex justify-center items-center gap-3">Already have an account? <Link className="text-red-500" href={'login'}>Login</Link></div>
        </div>
    );
};

export default SignUpPage;