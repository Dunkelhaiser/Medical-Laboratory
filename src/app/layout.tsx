import "@/app/globals.css";

import { Montserrat } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";

import { TRPCReactProvider } from "@/trpc/react";
import Header from "@components/Header";

const montserrat = Montserrat({ subsets: ["latin", "cyrillic"] });

export const metadata = {
    title: "Medix",
    description: "Medical Laboratory",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${montserrat.className} bg-background text-foreground`}>
                <Header />
                <Toaster containerStyle={{ top: "80px" }} />
                <main className="mx-auto max-w-[85rem] px-6 py-6 max-sm:mt-[60.08px] sm:mt-[72px] sm:p-8 sm:px-8 lg:px-10">
                    <TRPCReactProvider cookies={cookies().toString()}>{children}</TRPCReactProvider>
                </main>
            </body>
        </html>
    );
}
