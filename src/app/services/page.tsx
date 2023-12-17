import { api } from "@/trpc/server";
import Service from "@components/Service";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Medix - Services",
    description: "Services that Medix provides.",
};

const Page = async () => {
    const services = await api.service.getServices.query({});
    return (
        <section>
            <h1 className="mb-4 text-3xl font-bold">Services</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8">
                {services.map((service) => (
                    <Service
                        key={service.id}
                        duration={service.duration}
                        name={service.name}
                        description={service.description}
                        price={service.price}
                        id={service.id}
                    />
                ))}
            </div>
        </section>
    );
};
export default Page;
