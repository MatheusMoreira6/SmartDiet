import { Link } from "@inertiajs/react";

const Navbar = ({ user, currentRoute }) => {
    function classLink(route) {
        return currentRoute == route ? "nav-link active" : "nav-link";
    }

    return (
        <nav
            className="navbar navbar-expand-md"
            style={{ background: "#47c98d" }}
        >
            <div className="container-fluid">
                <Link className="navbar-brand" href={route("admin.home")}>
                    SmartDiet
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
                                    className={classLink("admin.pacientes")}
                                    href={route("admin.pacientes")}
                                >
                                    Pacientes
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className={classLink("admin.agendamentos")}
                                    href={route("admin.agendamentos")}
                                >
                                    Agendamentos
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className={classLink("admin.exames")}
                                    href={route("admin.exames")}
                                >
                                    Exames
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className={classLink("admin.questionarios")}
                                    href={route("admin.questionarios")}
                                >
                                    Questionários
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
                                    <i className="bi bi-person-circle me-2"></i>
                                    {user.nome}
                                </a>

                                <ul className="dropdown-menu">
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            href={route("admin.profile")}
                                        >
                                            Perfil
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            href={route("admin.settings")}
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
                                            href={route("logout.admin")}
                                        >
                                            <i className="bi bi-box-arrow-right me-2"></i>
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
