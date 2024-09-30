import { Link } from "@inertiajs/react";

const Navbar = ({ children }) => {
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-md" style={{background: '#47c98d'}}>
                    <div className="container-fluid">
                        <Link
                            className="navbar-brand"
                            href={route("dashboard.home")}
                        >
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
                                            href={route("dashboard.home")}
                                        >
                                            Home
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            href={route("dashboard.home")}
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
                                            Dropdown
                                        </a>

                                        <ul className="dropdown-menu">
                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                >
                                                    Action
                                                </a>
                                            </li>

                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                >
                                                    Another action
                                                </a>
                                            </li>

                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>

                                            <li>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                >
                                                    Something else here
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <body>{children}</body>
        </>
    );
};

export default Navbar;
