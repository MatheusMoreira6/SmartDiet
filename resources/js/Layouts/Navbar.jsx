import { Link } from "@inertiajs/react";

const Navbar = ({ children }) => {
    return (
        <nav
            className="navbar navbar-expand-md"
            style={{ background: "#47c98d" }}
        >
            <div className="container-fluid">
                <Link className="navbar-brand" href={route("admin.home")}>
                    Offcanvas navbar
                </Link>

                <button
                    type="button"
                    className="navbar-toggler"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    tabIndex="-1"
                    id="offcanvasNavbar"
                    className="offcanvas offcanvas-end"
                    aria-labelledby="offcanvasNavbarLabel"
                >
                    <div className="offcanvas-header">
                        <h5
                            id="offcanvasNavbarLabel"
                            className="offcanvas-title"
                        >
                            SmartDiet
                        </h5>

                        <button
                            type="button"
                            aria-label="Close"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                        ></button>
                    </div>

                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-around flex-grow-1">
                            <li className="nav-item">
                                <Link
                                    className="nav-link active"
                                    href={route("admin.home")}
                                >
                                    Home
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    href={route("admin.home")}
                                >
                                    Link
                                </Link>
                            </li>

                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i class="bi bi-person-circle"></i>
                                </a>

                                <ul className="dropdown-menu">
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            href={route("dashboard.profile")}
                                        >
                                            Perfil
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            href={route("dashboard.settings")}
                                        >
                                            Configurações
                                        </Link>
                                    </li>

                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>

                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            href={route("logout.user")}
                                        >
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
