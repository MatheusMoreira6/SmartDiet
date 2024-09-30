import { Link } from "@inertiajs/react";

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link href={route("logout.user")}>Logout</Link>
        </div>
    );
};

export default Home;
