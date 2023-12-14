const About = () => {
    return (
        <section className="flex grid-cols-2 flex-col gap-2 text-center sm:grid sm:gap-[10rem] sm:text-left">
            <div>
                <h3 className="font-bold uppercase text-primary">About Us</h3>
                <p className="text-3xl font-bold capitalize">We employ latest research technology & company</p>
                <p className="mb-6 mt-3 text-stone-600 dark:text-stone-300">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut itaque quia porro, sint quaerat nam deserunt eius magnam.
                    Laboriosam quod assumenda quam ut ratione perspiciatis natus nemo nesciunt omnis et?
                </p>
            </div>
            <div>
                <h3 className="font-bold uppercase text-primary">A Great Technology</h3>
                <p className="text-3xl font-bold capitalize">We are trusted experts latest laboratory technology</p>
                <p className="mb-6 mt-3 text-stone-600 dark:text-stone-300">
                    Proin sed metus quis neque tempus iaculis. Quisque ac tortor pharetra, pulvinar felis ac, pharetra mauris. Fusce
                    ultrices diam ac urna facilisis egestas.
                </p>
            </div>
        </section>
    );
};
export default About;
