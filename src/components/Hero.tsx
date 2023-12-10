import { Button } from "@ui/Button";
import Image from "next/image";

const Hero = () => {
    return (
        <section className="grid gap-4 md:grid-cols-2 md:items-center md:gap-8 xl:gap-20">
            <div>
                <h1 className="block text-3xl font-bold text-stone-800 dark:text-stone-200 sm:text-4xl lg:text-6xl lg:leading-tight">
                    We are ready to{" "}
                    <span className="bg-gradient-to-b from-primary/25 to-primary bg-clip-text text-transparent">solve your health</span>{" "}
                    problems
                </h1>
                <p className="mb-6 mt-3 text-lg text-stone-600 dark:text-stone-300">
                    At Labix, we harness the power of equipment and the expertise of our skilled professionals to deliver accurate and
                    timely results. Your health is our priority, and we are committed to providing a seamless and reliable experience for
                    all your diagnostic needs.
                </p>
                <Button size="lg">Free Consulting</Button>
            </div>
            <Image className="rounded-xl" src="/hero.jpg" width={2400} height={2400} alt="Medical lab" priority />
        </section>
    );
};
export default Hero;
