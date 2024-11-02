import PageTopic from "@/Components/PageTopic";
import WrapperContainer from "@/Components/WrapperContainer";
import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";
import {
    Card,
    Row,
    Col,
    Navbar,
    Nav,
    Container,
    Button,
} from "react-bootstrap";
import "../../../../css/dadosPaciente.css";
import DietContainer from "./Dietas/Dietas";

export default function DadosPaciente({ dados, dietas }) {
    const [activeTab, setActiveTab] = useState("info");
    const [visibleModal, setVisibleModal] = useState(false);
    const handleSelect = (selectedKey) => {
        setActiveTab(selectedKey);
    };

    return (
        <AdminLayout>
            <WrapperContainer>
                <Navbar expand="lg" className="custom-navbar">
                    <Container className="rounded">
                        <Row>
                            <Nav
                                activeKey={activeTab}
                                onSelect={handleSelect}
                                className="me-auto custom-nav"
                            >
                                <Nav.Link
                                    eventKey="info"
                                    className="custom-nav-link"
                                >
                                    Informações
                                </Nav.Link>
                                <Nav.Link
                                    eventKey="history"
                                    className="custom-nav-link"
                                >
                                    Histórico
                                </Nav.Link>
                                <Nav.Link
                                    eventKey="diet"
                                    className="custom-nav-link"
                                >
                                    Dietas
                                </Nav.Link>
                            </Nav>
                        </Row>
                    </Container>
                </Navbar>
                <PageTopic>
                    <i className="bi bi-list"></i>
                    {activeTab === "info" && "Informações do Paciente"}
                    {activeTab === "history" && "Histórico do Paciente"}
                    {activeTab === "diet" && "Dietas do Paciente"}
                </PageTopic>

                {activeTab === "info" && (
                    <>
                        <Row>
                            <Col md={6}>
                                <h5>Nome:</h5>
                                <p>{`${dados.nome} ${dados.sobrenome}`}</p>
                            </Col>
                            <Col md={6}>
                                <h5>CPF:</h5>
                                <p>{dados.cpf}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <h5>Data de Nascimento:</h5>
                                <p>{dados.data_nascimento}</p>
                            </Col>
                            <Col md={6}>
                                <h5>Gênero:</h5>
                                <p>{dados.genero.descricao}</p>
                            </Col>
                        </Row>
                        <Row className="g-3 mb-3">
                            <Col md={6}>
                                <h5>Telefone:</h5>
                                <p>{dados.telefone}</p>
                            </Col>
                            <Col md={6}>
                                <h5>ID do Paciente:</h5>
                                <p>{dados.id}</p>
                            </Col>
                        </Row>

                        <Row className="g-3 mb-3">
                            <Col md={6}>
                                <h5>Senha:</h5>
                                <p>{dados.senha_temp}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button>
                                    <i className="bi bi-pencil"></i>Editar
                                </Button>
                            </Col>
                        </Row>
                    </>
                )}

                {activeTab === "history" && (
                    <>
                        <Row>
                            <Col md={6}>
                                <h5>Consulta</h5>
                                <p>{`${dados.nome} ${dados.sobrenome}`}</p>
                            </Col>
                            <Col md={6}>
                                <h5>Consulta</h5>
                                <p>{dados.cpf}</p>
                            </Col>
                        </Row>
                    </>
                )}
                {activeTab === "diet" && (
                    <DietContainer
                        dietas={dietas}
                        id_paciente={dados.id}
                        id_nutricionista={dados.nutricionista_id}
                    />
                )}
            </WrapperContainer>
        </AdminLayout>
    );
}
