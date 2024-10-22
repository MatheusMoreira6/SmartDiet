import NavbarAdmin from "./Admin/Navbar";

const AdminLayout = ({ children }) => {
    return (
        <>
            <header>
                <NavbarAdmin />
            </header>

            <main>{children}</main>
        </>
    );
};

export default AdminLayout;
