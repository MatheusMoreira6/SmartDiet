import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const Agendamentos = ({ user, currentRoute }) => {
    return (
        <AdminLayout user={user} currentRoute={currentRoute}>
            <Head title="Agendamentos" />
        </AdminLayout>
    );
};

export default Agendamentos;
