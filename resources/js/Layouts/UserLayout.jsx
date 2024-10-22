import NavbarUser from "./User/Navbar";

const UserLayout = ({ children }) => {
    return (
        <>
            <header>
                <NavbarUser />
            </header>

            <main>{children}</main>
        </>
    );
};

export default UserLayout;
