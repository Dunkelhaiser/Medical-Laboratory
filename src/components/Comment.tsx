import { Prisma } from "@prisma/client";
import Rating from "@ui/Rating";

type CommentType = Prisma.CommentsGetPayload<{
    select: {
        content: true;
        rating: true;
        updatedAt: true;
    };
    include: {
        user: {
            select: {
                firstName: true;
                lastName: true;
            };
        };
    };
}>;

interface Props {
    comment: CommentType;
}

const Comment = ({ comment: { user, content, rating, createdAt } }: Props) => {
    return (
        <div className="flex flex-col justify-between rounded-md bg-card px-8 py-5 text-card-foreground shadow-sm">
            <div>
                <div className="flex items-center gap-2">
                    <h4 className="text-2xl font-bold">{`${user.firstName} ${user.lastName[0]}.`}</h4>
                    <Rating rating={rating} />
                </div>
                <p className="text-sm text-card-foreground/50">{createdAt.toLocaleDateString()}</p>
            </div>
            <p className="mt-2 text-card-foreground/75">{content}</p>
        </div>
    );
};
export default Comment;
