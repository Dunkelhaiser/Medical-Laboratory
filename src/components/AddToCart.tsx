"use client";

import { api } from "@/trpc/react";
import { Button } from "@ui/Button";
import toast from "react-hot-toast";

interface Props {
    id: string;
}

const AddToCart = ({ id }: Props) => {
    const utils = api.useUtils();
    const { mutate, isLoading } = api.cart.addToCart.useMutation({
        onSuccess: () => {
            toast.success("Added to cart");
            utils.cart.invalidate();
        },
        onError: () => {
            toast.error("Failed to add to cart");
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
            Add to cart
        </Button>
    );
};
export default AddToCart;
