import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/utils";

const Loader = ({ variant }: { variant?: "light" | "dark" }) => {
    return (
        <div
            className={cn(
                "absolute h-4 w-4 animate-spin rounded-full border-2 border-border border-b-transparent",
                variant === "light" ? "border-border" : "border-foreground"
            )}
        />
    );
};

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium shadow-sm ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90 ring-primary",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 ring-foreground",
                ghost: "hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent ring-border shadow-none",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 ring-destructive",
                link: "text-primary underline-offset-4 hover:underline ring-primary shadow-none",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    loading?: boolean;
    asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, loading = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} disabled={props.disabled || loading} {...props}>
                {!asChild ? (
                    <>
                        {loading && <Loader variant={variant === "default" || variant === "destructive" ? "light" : "dark"} />}
                        <span
                            className={cn("flex items-center justify-center gap-2 transition", {
                                "opacity-0": loading,
                                "opacity-100": !loading,
                            })}
                        >
                            {props.children}
                        </span>
                    </>
                ) : (
                    props.children
                )}
            </Comp>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
