import NavbarUser from "./User/Navbar";

const UserLayout = ({ user, currentRoute, children }) => {
    return (
        <>
            <header>
                <NavbarUser user={user} currentRoute={currentRoute} />
            </header>

            <main>{children}</main>
        </>
    );
};

export default UserLayout;
