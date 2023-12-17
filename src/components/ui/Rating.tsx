"use client";

import { cn } from "@utils/utils";
import { Star } from "lucide-react";

interface Props {
    rating: number;
    size?: number;
}

const Rating = ({ rating, size = 18 }: Props) => {
    return (
        <div className="flex gap-1">
            {new Array(5).fill(0).map((_, i) => (
                <Star
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    size={size}
                    className={cn("fill-gray-300 text-gray-300", i < rating && "fill-yellow-300 text-yellow-300")}
                />
            ))}
        </div>
    );
};
export default Rating;
