"use client";

import { api } from "@/trpc/react";
import { Button } from "@ui/Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Purchase = () => {
    const router = useRouter();
    const { mutate, isLoading } = api.cart.purchase.useMutation({
        onSuccess: () => {
            toast.success("Successfully purchased");
            router.refresh();
        },
        onError: () => {
            toast.error("Failed to purchase");
        },
    });
    return (
        <Button className="mt-2 max-sm:w-full" variant="default" onClick={() => mutate()} loading={isLoading} size="lg">
            Purchase
        </Button>
    );
};
export default Purchase;
