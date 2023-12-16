import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";
import SignUp from "./SignUp";

export const metadata: Metadata = {
    title: "Medix - Sign Up",
    description: "Sign up to the Medix.",
};

const Page = async () => {
    const session = await getServerAuthSession();

    if (session) {
        redirect("/");
    }

    return <SignUp />;
};
export default Page;
