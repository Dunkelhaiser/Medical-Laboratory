"use client";

import { api } from "@/trpc/react";
import { Button } from "@ui/Button";
import toast from "react-hot-toast";

const Purchase = () => {
    const utils = api.useUtils();
    const { mutate, isLoading } = api.cart.purchase.useMutation({
        onSuccess: () => {
            toast.success("Successfully purchased");
            utils.cart.invalidate();
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
