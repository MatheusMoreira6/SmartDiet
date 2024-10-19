import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

const Dietas = ({ user, currentRoute }) => {
    return (
        <UserLayout user={user} currentRoute={currentRoute}>
            <Head title="Dietas" />
        </UserLayout>
    );
};

export default Dietas;
