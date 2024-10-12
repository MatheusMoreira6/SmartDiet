import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const Exames = ({ user, currentRoute }) => {
    return (
        <AdminLayout user={user} currentRoute={currentRoute}>
            <Head title="Exames" />
        </AdminLayout>
    );
};

export default Exames;
