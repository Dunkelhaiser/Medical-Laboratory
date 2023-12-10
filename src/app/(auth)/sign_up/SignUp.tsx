"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpForm, schema } from "@models/SignUp";
import { Button } from "@ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/Form";
import { Input } from "@ui/Input";
import Link from "@ui/Link";

const SignUp = () => {
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

    const onSubmit = async (values: SignUpForm) => {
        try {
        } catch (err) {}
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-prose space-y-4 max-sm:space-y-2">
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
                <div className="flex w-full justify-between gap-4">
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
                </div>
                <div className="flex w-full justify-between gap-4">
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
                </div>
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} className={fieldState.error && "border-destructive ring-destructive"} />
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
                                <Input {...field} className={fieldState.error && "border-destructive ring-destructive"} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="max-sm:w-full" loading={form.formState.isSubmitting}>
                    Sign Up
                </Button>
            </form>
        </Form>
    );
};
export default SignUp;
