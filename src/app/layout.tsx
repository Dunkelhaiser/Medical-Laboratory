import "@/app/globals.css";

import { Montserrat } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";

const montserrat = Montserrat({ subsets: ["latin", "cyrillic"] });

export const metadata = {
    title: "Medical Laboratory",
    description: "Medical Laboratory",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body
                className={`${montserrat.className} mx-auto max-w-[85rem] bg-background px-6 py-6 text-foreground max-sm:mb-16 sm:my-[-2rem] sm:p-8 sm:px-8 lg:px-10`}
            >
                <main>
                    <TRPCReactProvider cookies={cookies().toString()}>{children}</TRPCReactProvider>
                </main>
            </body>
        </html>
    );
}
