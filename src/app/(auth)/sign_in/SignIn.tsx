"use client";

import { useForm } from "react-hook-form";
import { SignInForm, schema } from "@models/SignIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/Form";
import { Input } from "@ui/Input";
import Link from "@ui/Link";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn as signInNext } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";

const SignIn = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const form = useForm<SignInForm>({ resolver: zodResolver(schema), mode: "onBlur", defaultValues: { email: "", password: "" } });
    const callbackUrl = searchParams.get("callbackUrl") ?? "/";

    const signIn = async (data: SignInForm, callback: string) => {
        const res = await signInNext("credentials", { ...data, callback, redirect: false });
        return res;
    };

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: SignInForm) => signIn(data, callbackUrl),
        onSuccess(data) {
            if (data?.error) {
                toast.error(data.error);
            } else {
                toast.success("Signed in successfully");
                router.refresh();
            }
        },
        onError() {
            toast.error("Failed to sign in");
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutate(data))} className="w-full max-w-prose space-y-4 max-sm:space-y-2">
                <h1 className="text-3xl font-bold">Sign In</h1>
                <p className="mt-2 text-sm text-foreground/80 dark:text-gray-400">
                    Don&apos;t have an account yet? <Link href="/sign_up">Sign up here</Link>
                </p>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                        <FormItem>
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

                <Button className="max-sm:w-full" loading={isLoading}>
                    Sign In
                </Button>
            </form>
        </Form>
    );
};
export default SignIn;
