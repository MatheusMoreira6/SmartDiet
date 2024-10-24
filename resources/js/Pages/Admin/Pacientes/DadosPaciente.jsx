import PageTopic from "@/Components/PageTopic";
import WrapperContainer from "@/Components/WrapperContainer";
import AdminLayout from "@/Layouts/AdminLayout";
import { Card, Row, Col } from "react-bootstrap";

export default function DadosPaciente({ dados }) {
    return (
        <AdminLayout>
            <WrapperContainer>
                <Card className="my-4" style={{ padding: 10 }}>
                    <PageTopic>
                        <i className="bi bi-list"></i>
                        Informações do Paciente
                    </PageTopic>
                    <Card.Body>
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
                        <Row>
                            <Col md={6}>
                                <h5>Telefone:</h5>
                                <p>{dados.telefone}</p>
                            </Col>
                            <Col md={6}>
                                <h5>ID do Paciente:</h5>
                                <p>{dados.id}</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </WrapperContainer>
        </AdminLayout>
    );
}
