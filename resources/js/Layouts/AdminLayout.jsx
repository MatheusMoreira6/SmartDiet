import Navbar from "./Admin/Navbar";

const AdminLayout = ({ user, children }) => {
    return (
        <>
            <header>
                <Navbar user={user} />
            </header>

            <main>{children}</main>
        </>
    );
};

export default AdminLayout;
