"use client";

import { api } from "@/trpc/react";
import { Button } from "@ui/Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
    id: string;
}

const RemoveFromCart = ({ id }: Props) => {
    const router = useRouter();
    const { mutate, isLoading } = api.cart.removeFromCart.useMutation({
        onSuccess: () => {
            toast.success("Removed from cart");
            router.refresh();
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
