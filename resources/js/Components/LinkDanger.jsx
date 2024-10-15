import { Link } from "@inertiajs/react";

const LinkDanger = ({ href = "#", children }) => {
    return (
        <Link href={href} className="btn btn-danger">
            {children}
        </Link>
    );
};

export default LinkDanger;
