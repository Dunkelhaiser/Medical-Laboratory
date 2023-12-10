import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";
import SignIn from "./SignIn";

export const metadata: Metadata = {
    title: "Medix - Sign In",
    description: "Sign in to the Medix.",
};

const Page = async () => {
    const session = await getServerAuthSession();

    if (session?.user) {
        redirect("/");
    }

    return <SignIn />;
};
export default Page;
