"use client";

import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import useToggle from "@hooks/useToggle";
import { CommentForm, schema } from "@models/Comment";
import { Button } from "@ui/Button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@ui/Form";
import { cn } from "@utils/utils";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
    serviceId: string;
}

const CreateComment = ({ serviceId }: Props) => {
    const [open, setOpen] = useToggle(false);
    const [rating, setRating] = useState(0);
    const form = useForm<CommentForm>({ resolver: zodResolver(schema), mode: "onBlur", defaultValues: { content: "", rating: 0 } });

    useEffect(() => {
        form.setValue("rating", rating);
    }, [form, rating]);

    const { mutate, isLoading } = api.service.createComment.useMutation({
        onSuccess: () => {
            toast.success("Comment created successfully");
        },
        onError: () => {
            toast.error("Failed to create comment");
        },
    });
    return (
        <section>
            <Button onClick={() => setOpen()} className="mb-4">
                {open ? "Close" : "Leave a comment"}
            </Button>
            {open && (
                <div className="mb-6 flex flex-col rounded-md bg-card px-8 py-5 text-card-foreground shadow-sm">
                    <div className="flex gap-1">
                        {new Array(5).fill(0).map((_, i) => (
                            <Star
                                // eslint-disable-next-line react/no-array-index-key
                                key={i}
                                size={24}
                                className={cn(
                                    "cursor-pointer fill-gray-300 text-gray-300 transition-colors",
                                    i < rating && "fill-yellow-300 text-yellow-300"
                                )}
                                onClick={() => setRating(i + 1)}
                            />
                        ))}
                    </div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit((data) => mutate({ serviceId, ...data }))}
                            className="w-full max-w-prose space-y-4 max-sm:space-y-2"
                        >
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormControl>
                                            <textarea
                                                {...field}
                                                className={cn(
                                                    "border-input placeholder:text-muted-foreground mt-4 flex h-32 w-full resize-none rounded-md border bg-background px-3 py-2 text-sm ring-foreground ring-offset-card transition file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
                                                    fieldState.error && "border-destructive ring-destructive"
                                                )}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="mt-4 sm:w-fit" loading={isLoading}>
                                Submit
                            </Button>
                        </form>
                    </Form>
                </div>
            )}
        </section>
    );
};
export default CreateComment;
