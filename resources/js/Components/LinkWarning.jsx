import { Link } from "@inertiajs/react";

const LinkWarning = ({ href = "#", children }) => {
    return (
        <Link href={href} className="btn btn-warning">
            {children}
        </Link>
    );
};

export default LinkWarning;
