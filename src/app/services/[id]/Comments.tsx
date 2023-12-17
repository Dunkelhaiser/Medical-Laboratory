import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import Comment from "@components/Comment";
import CreateComment from "./CreateComment";

const Comments = async ({ id }: { id: string }) => {
    const session = await getServerAuthSession();
    const comments = await api.service.getComments.query({ id });
    return (
        <>
            {session && <CreateComment serviceId={id} />}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {comments.length > 0 ? (
                    comments.map((comment) => <Comment comment={comment} key={comment.id} />)
                ) : (
                    <p className="text-foreground/85 mt-8">There are no comments for this service</p>
                )}
            </section>
        </>
    );
};
export default Comments;
