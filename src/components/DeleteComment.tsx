"use client";

import { api } from "@/trpc/react";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
    id: string;
}

const DeleteComment = ({ id }: Props) => {
    const { mutate } = api.service.deleteComment.useMutation({
        onSuccess: () => {
            toast.success("Comment deleted successfully");
        },
        onError: () => {
            toast.error("Failed to delete comment");
        },
    });
    return (
        <Trash
            onClick={() => mutate({ id })}
            size={24}
            className="ml-auto cursor-pointer text-destructive transition-colors hover:text-destructive/75"
        />
    );
};
export default DeleteComment;
