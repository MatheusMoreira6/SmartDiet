import { Link } from "@inertiajs/react";

const LinkDanger = ({ href = "#", title = "", children }) => {
    return (
        <Link href={href} title={title} className="btn btn-danger">
            {children}
        </Link>
    );
};

export default LinkDanger;
