import { Col, Row, Card, Badge } from "react-bootstrap";
import { FaQuestionCircle, FaRegCommentDots } from "react-icons/fa";

const Questionarios = ({ respostas }) => {
    if (respostas.length === 0) {
        return (
            <Row className="g-3">
                <Col xs={12}>
                    <p className="bg-warning-subtle text-center py-3 mb-0">
                        Nenhuma resposta encontrada.
                    </p>
                </Col>
            </Row>
        );
    }

    return (
        <Row className="g-4">
            {respostas.map((item, index) => (
                <Col xs={12} key={item.id}>
                    <Card
                        className="shadow-sm border-light rounded-3"
                        style={{
                            background:
                                "linear-gradient(to bottom, #ffffff, #f9f9f9)",
                        }}
                    >
                        <Card.Body>
                            <div className="d-flex align-items-center mb-3">
                                <FaQuestionCircle
                                    className="me-2 text-primary"
                                    size={20}
                                />
                                <h5 className="text-dark fw-bold mb-0">
                                    Pergunta #{index + 1}
                                </h5>
                            </div>
                            <p className="text-dark fw-bold mb-0">
                                {item.pergunta.pergunta}
                            </p>
                            <hr />
                            <div className="d-flex align-items-center mb-3">
                                <FaRegCommentDots
                                    className="me-2 text-success"
                                    size={20}
                                />
                                <h6 className="text-success fw-bold mb-0">
                                    Resposta
                                </h6>
                            </div>
                            <div
                                className="text-secondary"
                                style={{
                                    background: "#f1f3f5",
                                    padding: "1rem",
                                    borderRadius: "8px",
                                    boxShadow:
                                        "inset 0 1px 3px rgba(0,0,0,0.1)",
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: item.resposta,
                                }}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default Questionarios;
