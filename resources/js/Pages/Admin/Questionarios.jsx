import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const Questionarios = ({ user, currentRoute }) => {
    return (
        <AdminLayout user={user} currentRoute={currentRoute}>
            <Head title="Questionários" />
        </AdminLayout>
    );
};

export default Questionarios;
