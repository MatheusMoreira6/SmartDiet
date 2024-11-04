import { Link } from "@inertiajs/react";

const LinkWarning = ({ href = "#", title = "", children }) => {
    return (
        <Link href={href} title={title} className="btn btn-warning">
            {children}
        </Link>
    );
};

export default LinkWarning;
