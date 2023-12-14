import About from "@components/sections/About";
import Hero from "@components/sections/Hero";
import MainService from "@components/sections/MainService";

export default async function Home() {
    return (
        <div className="flex flex-col gap-16">
            <Hero />
            <About />
            <MainService />
        </div>
    );
}
