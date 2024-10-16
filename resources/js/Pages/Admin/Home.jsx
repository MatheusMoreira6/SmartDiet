import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const Home = ({ user, currentRoute }) => {
    return (
        <AdminLayout user={user} currentRoute={currentRoute}>
            <Head title="Tela Inicial" />
        </AdminLayout>
    );
};

export default Home;
