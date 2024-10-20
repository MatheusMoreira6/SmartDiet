import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

const Home = ({ user, currentRoute }) => {
    return (
        <UserLayout user={user} currentRoute={currentRoute}>
            <Head title="Tela Inicial" />
        </UserLayout>
    );
};

export default Home;
