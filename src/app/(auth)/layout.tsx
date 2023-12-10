export default function FormLayout({ children }: { children: React.ReactNode }) {
    return <div className="mx-auto max-w-lg rounded-md bg-card px-8 py-10 shadow-sm">{children}</div>;
}
