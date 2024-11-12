import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import WrapperContainer from "@/Components/WrapperContainer";
import PageTopic from "@/Components/PageTopic";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import "../../../../css/dadosPaciente.css";
import DietContainer from "./Dietas/Dietas";
import RenderFotos from "./DiarioAlimentar/DiarioAlimentar";
import HistoricoConsultas from "./HistoricoConsultas/HistoricoConsultas";

const DadosPaciente = ({ dados, dietas, fotos, agenda_consultas }) => {
    return (
        <AdminLayout>
            <Head title="Paciente" />

            <WrapperContainer>
                <PageTopic>
                    <i className="bi bi-person-fill"></i>
                    Dados do Paciente
                </PageTopic>

                <Tabs id="configuracoes-tabs" defaultActiveKey="info">
                    <Tab eventKey="info" title="Informações">
                        <Row className="g-3">
                            <Col md={6} className="mt-4">
                                <h5>Nome:</h5>
                                <span>{`${dados.nome} ${dados.sobrenome}`}</span>
                            </Col>

                            <Col md={6} className="mt-4">
                                <h5>CPF:</h5>
                                <span>{dados.cpf}</span>
                            </Col>

                            <Col md={6}>
                                <h5>Data de Nascimento:</h5>
                                <span>{dados.data_nascimento}</span>
                            </Col>

                            <Col md={6}>
                                <h5>Gênero:</h5>
                                <span>{dados.genero}</span>
                            </Col>

                            <Col md={6}>
                                <h5>Telefone:</h5>
                                <span>{dados.telefone}</span>
                            </Col>

                            {dados.password_temp && (
                                <Col md={6}>
                                    <h5>Senha Temporária:</h5>
                                    <span>{dados.password_temp}</span>
                                </Col>
                            )}
                        </Row>
                    </Tab>

                    <Tab eventKey="history" title="Histórico do Paciente">
                        <Row>
                            <HistoricoConsultas
                                agenda_consultas={agenda_consultas}
                            />
                        </Row>
                    </Tab>

                    <Tab eventKey="diet" title="Dietas">
                        <DietContainer
                            dietas={dietas}
                            id_paciente={dados.id}
                            id_nutricionista={dados.nutricionista_id}
                        />
                    </Tab>

                    <Tab eventKey="day" title="Diário alimentar">
                        <RenderFotos fotos={fotos} />
                    </Tab>
                </Tabs>
            </WrapperContainer>
        </AdminLayout>
    );
};

export default DadosPaciente;
