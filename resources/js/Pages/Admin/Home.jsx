import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const Home = ({ user }) => {
    return (
        <AdminLayout user={user}>
            <Head title="Tela Inicial" />
        </AdminLayout>
    );
};

export default Home;
