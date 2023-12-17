"use client";

import { api } from "@/trpc/react";
import { Button } from "@ui/Button";
import toast from "react-hot-toast";

interface Props {
    id: string;
}

const RemoveFromCart = ({ id }: Props) => {
    const utils = api.useUtils();
    const { mutate, isLoading } = api.cart.removeFromCart.useMutation({
        onSuccess: () => {
            toast.success("Removed from cart");
            utils.cart.invalidate();
        },
        onError: () => {
            toast.error("Failed to remove from cart");
        },
    });
    return (
        <Button
            className="mt-2 max-sm:w-full"
            variant="default"
            onClick={(e) => {
                e.preventDefault();
                mutate(id);
            }}
            loading={isLoading}
        >
            Remove from cart
        </Button>
    );
};
export default RemoveFromCart;
