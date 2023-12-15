import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { db } from "@/server/db";

export const GET = async (_req: NextRequest, { params }: { params: { token: string } }) => {
    const { token } = params;

    const user = await db.user.findFirst({
        where: {
            tokens: {
                some: {
                    token,
                },
            },
        },
    });

    if (!user) {
        throw new Error("Invalid token");
    }

    await db.user.update({
        where: { id: user.id },
        data: {
            emailVerified: new Date(),
        },
    });

    await db.verificationToken.delete({
        where: {
            token,
        },
    });

    redirect("/sign_in");
};
