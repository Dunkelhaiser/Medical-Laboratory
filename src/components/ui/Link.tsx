import NextLink from "next/link";
import { cn } from "@utils/utils";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
}

const Link = ({ className, children, href, ...props }: Props) => {
    return (
        <NextLink
            className={cn(
                "font-medium text-primary decoration-2 underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600",
                className
            )}
            href={href}
            {...props}
        >
            {children}
        </NextLink>
    );
};
export default Link;
