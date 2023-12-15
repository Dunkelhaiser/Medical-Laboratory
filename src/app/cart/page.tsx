import { api } from "@/trpc/server";
import RemoveFromCart from "@components/RemoveFromCart";
import { Button } from "@ui/Button";

const Page = async () => {
    const data = await api.cart.getCart.query();
    return (
        <section>
            <h1 className="mb-4 text-3xl font-bold">Cart</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-md bg-card p-8 text-card-foreground shadow-sm sm:col-span-2">
                    {data.services.length > 0 ? (
                        data.services.map((item) => (
                            <div className="flex flex-col justify-between px-8 py-5 text-card-foreground">
                                <div>
                                    <h4 className="text-2xl font-bold">{item.name}</h4>
                                    <p className="text-sm text-card-foreground/75">{item.description}</p>
                                </div>
                                <div className="mt-auto">
                                    <p className="mt-2 text-xl font-bold text-primary">₴{item.price}</p>
                                    <RemoveFromCart id={item.id} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-card-foreground/75">You don&apos;t have any analyses selected</p>
                    )}
                </div>
                <div className="rounded-md bg-card p-8 text-card-foreground shadow-sm">
                    <p className="mb-4 text-lg">
                        Total price: <span className="font-bold">₴{data.services.reduce((acc, item) => acc + item.price, 0)}</span>
                    </p>
                    {data.services.length > 0 && <Button size="lg">Purchase</Button>}
                </div>
            </div>
        </section>
    );
};
export default Page;
