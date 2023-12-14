import { Button } from "@ui/Button";

const Service = () => {
    return (
        <div className="rounded-md bg-card px-8 py-5 text-card-foreground shadow-sm">
            <h4 className="text-2xl font-bold">Title</h4>
            <p className="text-sm text-card-foreground/75">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. A debitis placeat quod aliquid repellendus ad veritatis,
                excepturi.
            </p>
            <p className="mt-2 text-xl font-bold text-primary">$337</p>
            <Button className="mt-2" variant="default">
                Add to cart
            </Button>
        </div>
    );
};
export default Service;
