import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import WrapperContainer from "@/Components/WrapperContainer";
import PageTopic from "@/Components/PageTopic";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import "../../../../css/dadosPaciente.css";
import RenderFotos from "./DiarioAlimentar/DiarioAlimentar";
import HistoricoConsultas from "./HistoricoConsultas/HistoricoConsultas";
import GraficoConsultas from "./HistoricoConsultas/GraficoConsultasa";
import Exames from "./Exames/Exames";
import Dietas from "./Dietas/Dietas";
import Questionarios from "./Questionarios/Questionarios";

const DadosPaciente = ({
    dados,
    dietas,
    fotos,
    agenda_consultas,
    datas_consultas,
    dados_consultas,
    exames_finalizados,
    exames_pendentes,
    respostas,
}) => {
    console.log(respostas);
    return (
        <AdminLayout>
            <Head title="Paciente" />

            <WrapperContainer>
                <PageTopic>
                    <i className="bi bi-person-fill"></i>
                    Dados do Paciente
                </PageTopic>

                <Tabs id="paciente-tabs" defaultActiveKey="info">
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
                        <Row className="g-3">
                            <Col md={12}>
                                <HistoricoConsultas
                                    agenda_consultas={agenda_consultas}
                                />
                            </Col>
                            <Col md={12}>
                                <GraficoConsultas
                                    datas_consultas={datas_consultas}
                                    dados_consultas={dados_consultas}
                                />
                            </Col>
                        </Row>
                    </Tab>

                    <Tab eventKey="exames" title="Exames">
                        <Exames
                            exames_finalizados={exames_finalizados}
                            pendentes={exames_pendentes}
                        />
                    </Tab>

                    <Tab eventKey="diet" title="Dietas">
                        <Dietas
                            dietas={dietas}
                            id_paciente={dados.id}
                            id_nutricionista={dados.nutricionista_id}
                        />
                    </Tab>

                    <Tab eventKey="quest" title="Resposta questionário">
                        <Questionarios respostas={respostas} />
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
