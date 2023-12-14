import { Button } from "@ui/Button";

interface Props {
    name: string;
    description: string;
    price: number;
    id: string;
}

const Service = ({ name, description, price, id }: Props) => {
    return (
        <div className="flex flex-col justify-between rounded-md bg-card px-8 py-5 text-card-foreground shadow-sm">
            <div>
                <h4 className="text-2xl font-bold">{name}</h4>
                <p className="text-sm text-card-foreground/75">{description}</p>
            </div>
            <div className="mt-auto">
                <p className="mt-2 text-xl font-bold text-primary">₴{price}</p>
                <Button className="mt-2 max-sm:w-full" variant="default">
                    Add to cart
                </Button>
            </div>
        </div>
    );
};
export default Service;
