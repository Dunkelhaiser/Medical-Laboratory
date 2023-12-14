"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpForm, schema } from "@models/SignUp";
import { Button } from "@ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormRow } from "@ui/Form";
import { Input } from "@ui/Input";
import Link from "@ui/Link";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignUp = () => {
    const router = useRouter();
    const form = useForm<SignUpForm>({
        resolver: zodResolver(schema),
        mode: "onBlur",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },
    });

    const { mutate, isLoading } = api.auth.signUp.useMutation({
        onSuccess: () => {
            toast.success("Account created successfully");
            router.push("/sign_in");
        },
        onError: (err) => {
            if (err.shape?.data.code === "CONFLICT") {
                toast.error(err.message);
            } else {
                toast.error("Failed to create account");
            }
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutate(data))} className="w-full max-w-prose space-y-4 max-sm:space-y-2">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <p className="mt-2 text-sm text-foreground/80 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                        className="font-medium text-primary decoration-2 hover:underline dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        href="/sign_in"
                    >
                        Sign in here
                    </Link>
                </p>
                <FormRow>
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field, fieldState }) => (
                            <FormItem className="w-full">
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input {...field} className={fieldState.error && "border-destructive ring-destructive"} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field, fieldState }) => (
                            <FormItem className="w-full">
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input {...field} className={fieldState.error && "border-destructive ring-destructive"} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </FormRow>
                <FormRow>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field, fieldState }) => (
                            <FormItem className="w-full">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} className={fieldState.error && "border-destructive ring-destructive"} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field, fieldState }) => (
                            <FormItem className="w-full">
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input {...field} className={fieldState.error && "border-destructive ring-destructive"} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </FormRow>
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} className={fieldState.error && "border-destructive ring-destructive"} type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input {...field} className={fieldState.error && "border-destructive ring-destructive"} type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="max-sm:w-full" loading={isLoading}>
                    Sign Up
                </Button>
            </form>
        </Form>
    );
};
export default SignUp;
