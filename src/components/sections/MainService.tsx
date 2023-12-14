import Service from "@components/Service";

const MainService = () => {
    return (
        <section className="flex flex-col">
            <div className="text-center">
                <p className="text-3xl font-bold capitalize">Explore our main services</p>
                <p className="mx-auto mb-6 mt-3 max-w-md text-sm text-stone-600 dark:text-stone-300">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut itaque quia porro.
                </p>
            </div>
            <div className="grid grid-cols-3 gap-8">
                <Service />
                <Service />
                <Service />
            </div>
        </section>
    );
};
export default MainService;
