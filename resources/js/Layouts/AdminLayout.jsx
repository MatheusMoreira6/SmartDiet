import Navbar from "./Navbar";

const AdminLayout = ({ children }) => {
    return (
        <>
            <header>
                <Navbar />
            </header>

            <main>{children}</main>
        </>
    );
};

export default AdminLayout;
