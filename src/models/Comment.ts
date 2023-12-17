import { z as zod } from "zod";

export const schema = zod.object({
    content: zod.string().min(1, { message: "Enter comment" }),
    rating: zod.number().min(1, { message: "Minimum rate is one" }).max(5, { message: "Maximum rate is five" }),
});

export type CommentForm = zod.infer<typeof schema>;
