import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { Button } from "@ui/Button";
import AddToCart from "./AddToCart";
import RemoveFromCart from "./RemoveFromCart";

interface Props {
    name: string;
    description: string;
    price: number;
    duration: number;
    id: string;
}

const Service = async ({ name, description, price, duration, id }: Props) => {
    let data;
    const session = await getServerAuthSession();

    if (session) {
        data = await api.cart.findInCart.query(id);
    }

    return (
        <div className="flex flex-col justify-between rounded-md bg-card px-8 py-5 text-card-foreground shadow-sm">
            <div>
                <h4 className="text-2xl font-bold">{name}</h4>
                <p className="text-sm text-card-foreground/75">{description}</p>
            </div>
            <div className="mt-auto">
                <div className="flex items-end gap-2">
                    <p className="mt-2 text-xl font-bold text-primary">₴{price}</p>
                    <p className="text-sm text-card-foreground/50">{`${duration} ${duration === 1 ? "day" : "days"}`}</p>
                </div>
                {session ? (
                    data ? (
                        <RemoveFromCart id={id} />
                    ) : (
                        <AddToCart id={id} />
                    )
                ) : (
                    <Button className="mt-2 max-sm:w-full" variant="default" asChild>
                        <Link href="/sign_in">Add to cart</Link>
                    </Button>
                )}
            </div>
        </div>
    );
};
export default Service;
