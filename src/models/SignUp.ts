import { z as zod } from "zod";

export const schema = zod
    .object({
        email: zod.string().min(1, { message: "Enter your email" }).email({ message: "Enter a valid email" }),
        phone: zod.string().min(1, { message: "Enter your phone number" }),
        password: zod.string().min(1, { message: "Enter your password" }),
        confirmPassword: zod.string().min(1, { message: "Confirm your password" }),
    })
    .refine((schemaData) => schemaData.password === schemaData.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });

export type SignUpForm = zod.infer<typeof schema>;
