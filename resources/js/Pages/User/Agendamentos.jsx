import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

const Agendamentos = ({ user, currentRoute }) => {
    return (
        <UserLayout user={user} currentRoute={currentRoute}>
            <Head title="Agendamentos" />
        </UserLayout>
    );
};

export default Agendamentos;
