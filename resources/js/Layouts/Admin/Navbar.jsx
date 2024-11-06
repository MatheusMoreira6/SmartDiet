import { Link, usePage } from "@inertiajs/react";
import {
    Container,
    Nav,
    Navbar,
    NavDropdown,
    Offcanvas,
} from "react-bootstrap";

const NavbarAdmin = () => {
    const { user, currentRoute } = usePage().props;

    function classLink(route) {
        return currentRoute == route ? "nav-link active" : "nav-link";
    }

    return (
        <Navbar expand="md" style={{ background: "#47c98d" }}>
            <Container fluid>
                <Link className="navbar-brand" href={route("admin.home")}>
                    SmartDiet
                </Link>

                <Navbar.Toggle aria-controls="navbar-admin" />

                <Navbar.Offcanvas
                    id="navbar-admin"
                    placement="end"
                    aria-labelledby="offcanvas-title"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvas-title">
                            SmartDiet
                        </Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <Nav className="justify-content-around flex-grow-1">
                            <Link
                                className={classLink("admin.pacientes")}
                                href={route("admin.pacientes")}
                            >
                                Pacientes
                            </Link>

                            <Link
                                className={classLink("admin.consultas")}
                                href={route("admin.consultas")}
                            >
                                Consultas
                            </Link>

                            <Link
                                className={classLink("admin.exames")}
                                href={route("admin.exames")}
                            >
                                Exames
                            </Link>

                            <Link
                                className={classLink("admin.questionarios")}
                                href={route("admin.questionarios")}
                            >
                                Questionários
                            </Link>

                            <NavDropdown
                                id="offcanvas-dropdown"
                                title={
                                    <span>
                                        <i className="bi bi-person-circle me-2"></i>
                                        {user.nome}
                                    </span>
                                }
                            >
                                <Link
                                    className="dropdown-item"
                                    href={route("admin.perfil")}
                                >
                                    Perfil
                                </Link>

                                <Link
                                    className="dropdown-item"
                                    href={route("admin.configuracoes")}
                                >
                                    Configurações
                                </Link>

                                <NavDropdown.Divider />

                                <Link
                                    className="dropdown-item"
                                    href={route("logout.admin")}
                                >
                                    <i className="bi bi-box-arrow-right me-2"></i>
                                    Logout
                                </Link>
                            </NavDropdown>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};

export default NavbarAdmin;
