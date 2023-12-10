"use client";

import { useForm } from "react-hook-form";
import { SignInForm, schema } from "@models/SignIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/Form";
import { Input } from "@ui/Input";
import Link from "@ui/Link";

const SignIn = () => {
    const form = useForm<SignInForm>({ resolver: zodResolver(schema), mode: "onBlur", defaultValues: { email: "", password: "" } });

    const onSubmit = async (values: SignInForm) => {
        try {
        } catch (err) {}
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-prose space-y-4 max-sm:space-y-2">
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

                <Button className="max-sm:w-full" loading={form.formState.isSubmitting}>
                    Sign In
                </Button>
            </form>
        </Form>
    );
};
export default SignIn;
