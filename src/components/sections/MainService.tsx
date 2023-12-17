import { api } from "@/trpc/server";
import Service from "@components/Service";
import Link from "@ui/Link";

const MainService = async () => {
    const services = await api.service.getServices.query({ limit: 3 });

    return (
        <section className="flex flex-col">
            <div className="mb-6 text-center">
                <p className="text-3xl font-bold capitalize">Explore our main services</p>
                <p className="mx-auto mt-3 max-w-md text-sm text-stone-600 dark:text-stone-300">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut itaque quia porro.
                </p>
                <Link href="/services" className="text-sm">
                    All Services
                </Link>
            </div>
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
export default MainService;
