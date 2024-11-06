import { Card, Col, Row } from "react-bootstrap";

export default function RenderFotos({ fotos = [] }) {
    return (
        <Row>
            {fotos.map((foto) => (
                <Col md={4} key={foto.id} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Img
                            variant="top"
                            src={foto.foto_url}
                            alt="Foto de Alimentação"
                        />
                        <Card.Body>
                            <Card.Text>
                                Data:{" "}
                                {new Date(foto.created_at).toLocaleDateString()}
                            </Card.Text>
                            <p>{foto.notas}</p>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}
