import { Link } from "@inertiajs/react";
import Navbar from "@/Layouts/Navbar";

const Home = () => {
    return (
        <Navbar>
            <h1>Home</h1>
            <Link href={route("logout.user")}>Logout</Link>
        </Navbar>
    );
};

export default Home;
