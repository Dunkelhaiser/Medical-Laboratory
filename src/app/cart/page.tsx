import type { Metadata } from "next";
import { api } from "@/trpc/server";
import Purchase from "@components/Purchase";
import RemoveFromCart from "@components/RemoveFromCart";
import { Label } from "@ui/Label";

export const metadata: Metadata = {
    title: "Medix - Cart",
    description: "Your cart at Medix.",
};

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
                                    <div className="flex items-end gap-2">
                                        <p className="mt-2 text-xl font-bold text-primary">₴{item.price}</p>
                                        <p className="text-sm text-card-foreground/50">{`${item.duration} ${
                                            item.duration === 1 ? "day" : "days"
                                        }`}</p>
                                    </div>
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
                    <Label>Appointment Date</Label>
                    <input
                        type="date"
                        className="border-input placeholder:text-muted-foreground flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-foreground ring-offset-card transition file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {data.services.length > 0 && <Purchase />}
                </div>
            </div>
        </section>
    );
};
export default Page;
