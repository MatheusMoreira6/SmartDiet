import { Link } from "@inertiajs/react";

const LinkPrimary = ({ href = "#", children }) => {
    return (
        <Link href={href} className="btn btn-primary">
            {children}
        </Link>
    );
};

export default LinkPrimary;
