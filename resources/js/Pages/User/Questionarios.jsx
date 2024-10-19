import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

const Questionarios = ({ user, currentRoute }) => {
    return (
        <UserLayout user={user} currentRoute={currentRoute}>
            <Head title="Questionários" />
        </UserLayout>
    );
};

export default Questionarios;
