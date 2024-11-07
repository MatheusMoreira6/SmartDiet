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
    Tabs,
    Tab,
} from "react-bootstrap";
import "../../../../css/dadosPaciente.css";
import DietContainer from "./Dietas/Dietas";
import RenderFotos from "./DiarioAlimentar/DiarioAlimentar";

export default function DadosPaciente({ dados, dietas, fotos, agenda_consultas }) {
    const [activeTab, setActiveTab] = useState("info");
    const [visibleModal, setVisibleModal] = useState(false);
  
    return (
        <AdminLayout>
            <WrapperContainer>
                <Row>
                    <Tabs id="configuracoes-tabs" defaultActiveKey="info">
                        <Tab eventKey="info" title="Informações">
                            <PageTopic>
                                <i className="bi bi-list"></i>
                                Informações do Paciente
                            </PageTopic>
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
                        </Tab>

                        <Tab eventKey="history" title="Histórico do Paciente">
                            <PageTopic>
                                <i className="bi bi-list"></i>
                                Histórico do Paciente
                            </PageTopic>
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
                        </Tab>

                        <Tab eventKey="diet" title="Dietas">
                            <PageTopic>
                                <i className="bi bi-list"></i>
                                Dietas do Paciente
                            </PageTopic>
                            <DietContainer
                                dietas={dietas}
                                id_paciente={dados.id}
                                id_nutricionista={dados.nutricionista_id}
                            />
                        </Tab>
                        <Tab eventKey="day" title="Diário alimentar">
                            <PageTopic>
                                <i className="bi bi-list"></i>
                                Diário alimentar
                            </PageTopic>
                            <RenderFotos fotos={fotos} />
                        </Tab>
                    </Tabs>
                </Row>
            </WrapperContainer>
        </AdminLayout>
    );
}
