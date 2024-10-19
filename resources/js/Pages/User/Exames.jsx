import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

const Exames = ({ user, currentRoute }) => {
    return (
        <UserLayout user={user} currentRoute={currentRoute}>
            <Head title="Exames" />
        </UserLayout>
    );
};

export default Exames;
