import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const Pacientes = ({ user, currentRoute }) => {
    return (
        <AdminLayout user={user} currentRoute={currentRoute}>
            <Head title="Pacientes" />
        </AdminLayout>
    );
};

export default Pacientes;
