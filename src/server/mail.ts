import { Resend } from "resend";
import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);

export const sendVerification = async (email: string, token: string) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: `Labix - Confirm your email`,
        html: `Click <a href="${env.NEXTAUTH_URL}/activate/${token}">here</a> to verify your account`,
    });
};

export const sendNotice = async (email: string) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: `Labix - Order`,
        text: "Your order has been placed! We will contact you shortly.",
    });
};
