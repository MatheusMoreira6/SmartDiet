import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

const Home = ({ consultas }) => {
    return (
        <UserLayout>
            <Head title="Tela Inicial" />
        </UserLayout>
    );
};

export default Home;
