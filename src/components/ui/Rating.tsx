import { cn } from "@utils/utils";
import { Star } from "lucide-react";

interface Props {
    rating: number;
}

const Rating = ({ rating }: Props) => {
    return (
        <div className="flex gap-1">
            {new Array(5).fill(0).map((_, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Star key={i} size={18} className={cn("fill-gray-300 text-gray-300", i < rating && "fill-yellow-300 text-yellow-300")} />
            ))}
        </div>
    );
};
export default Rating;
