import { cn } from "@utils/utils";

interface Props {
    expanded?: boolean;
    className?: string;
    onClick?: () => void;
}

const Hamburger = ({ className, expanded, onClick }: Props) => {
    return (
        <button
            type="button"
            className={cn(
                "flex h-9 w-9 items-center justify-center rounded-md border border-accent text-sm font-semibold text-accent-foreground transition hover:bg-accent/25 disabled:pointer-events-none disabled:opacity-50",
                className
            )}
            aria-label="Toggle navigation"
            onClick={onClick}
        >
            <svg className={`h-4 w-4 ${expanded ? "hidden" : "block"}`} width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
            </svg>
            <svg
                className={`h-4 w-4 flex-shrink-0 ${expanded ? "block" : "hidden"}`}
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
            >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
        </button>
    );
};
export default Hamburger;
