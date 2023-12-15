import { api } from "@/trpc/server";
import AddToCart from "./AddToCart";
import RemoveFromCart from "./RemoveFromCart";

interface Props {
    name: string;
    description: string;
    price: number;
    id: string;
}

const Service = async ({ name, description, price, id }: Props) => {
    const data = await api.cart.findInCart.query(id);

    return (
        <div className="flex flex-col justify-between rounded-md bg-card px-8 py-5 text-card-foreground shadow-sm">
            <div>
                <h4 className="text-2xl font-bold">{name}</h4>
                <p className="text-sm text-card-foreground/75">{description}</p>
            </div>
            <div className="mt-auto">
                <p className="mt-2 text-xl font-bold text-primary">₴{price}</p>
                {data ? <RemoveFromCart id={id} /> : <AddToCart id={id} />}
            </div>
        </div>
    );
};
export default Service;
