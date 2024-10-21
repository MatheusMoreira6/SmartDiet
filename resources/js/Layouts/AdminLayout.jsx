import NavbarAdmin from "./Admin/Navbar";

const AdminLayout = ({ user, currentRoute, children }) => {
    return (
        <>
            <header>
                <NavbarAdmin user={user} currentRoute={currentRoute} />
            </header>

            <main>{children}</main>
        </>
    );
};

export default AdminLayout;
