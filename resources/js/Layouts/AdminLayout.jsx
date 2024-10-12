import Navbar from "./Admin/Navbar";

const AdminLayout = ({ user, currentRoute, children }) => {
    return (
        <>
            <header>
                <Navbar user={user} currentRoute={currentRoute} />
            </header>

            <main>{children}</main>
        </>
    );
};

export default AdminLayout;
