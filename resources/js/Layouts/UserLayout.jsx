import Navbar from "./User/Navbar";

const UserLayout = ({ user, currentRoute, children }) => {
    return (
        <>
            <header>
                <Navbar user={user} currentRoute={currentRoute} />
            </header>

            <main>{children}</main>
        </>
    );
};

export default UserLayout;
