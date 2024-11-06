import { Link, usePage } from "@inertiajs/react";
import {
    Container,
    Nav,
    Navbar,
    NavDropdown,
    Offcanvas,
} from "react-bootstrap";

const NavbarUser = () => {
    const { user, currentRoute, lockRoute } = usePage().props;

    function classLink(route) {
        if (lockRoute) {
            return "nav-link disabled";
        }

        return currentRoute == route ? "nav-link active" : "nav-link";
    }

    return (
        <Navbar expand="md" style={{ background: "#47c98d" }}>
            <Container fluid>
                <Link className="navbar-brand" href={route("user.home")}>
                    SmartDiet
                </Link>

                <Navbar.Toggle aria-controls="navbar-user" />

                <Navbar.Offcanvas
                    id="navbar-user"
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
                                className={classLink("user.dietas")}
                                href={route("user.dietas")}
                            >
                                Dietas
                            </Link>

                            <Link
                                className={classLink("diario.buscar")}
                                href={route("diario.buscar")}
                            >
                                Diário Alimentar
                            </Link>

                            <Link
                                className={classLink("user.consultas")}
                                href={route("user.consultas")}
                            >
                                Consultas
                            </Link>

                            <Link
                                className={classLink("user.exames")}
                                href={route("user.exames")}
                            >
                                Exames
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
                                    href={route("user.perfil")}
                                >
                                    Perfil
                                </Link>

                                <Link
                                    className="dropdown-item"
                                    href={route("user.configuracoes")}
                                >
                                    Configurações
                                </Link>

                                <NavDropdown.Divider />

                                <Link
                                    className="dropdown-item"
                                    href={route("logout.user")}
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

export default NavbarUser;
