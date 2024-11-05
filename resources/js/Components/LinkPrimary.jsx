import { Link } from "@inertiajs/react";

const LinkPrimary = ({ href = "#", title = "", children }) => {
    return (
        <Link href={href} title={title} className="btn btn-primary">
            {children}
        </Link>
    );
};

export default LinkPrimary;
