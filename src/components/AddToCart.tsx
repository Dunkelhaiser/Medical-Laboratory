"use client";

import { api } from "@/trpc/react";
import { Button } from "@ui/Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
    id: string;
}

const AddToCart = ({ id }: Props) => {
    const router = useRouter();
    const { mutate, isLoading } = api.cart.addToCart.useMutation({
        onSuccess: () => {
            toast.success("Added to cart");
            router.refresh();
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
