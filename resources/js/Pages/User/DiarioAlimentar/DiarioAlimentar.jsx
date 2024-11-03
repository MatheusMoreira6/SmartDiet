import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import { Container, Form, Button, Card, Alert, Col, Row } from "react-bootstrap";
import { useState } from "react";
import Api from "@/Api";
import WrapperContainer from "@/Components/WrapperContainer";

const DiarioAlimentar = ({ fotosDiario }) => {
    console.log(fotosDiario);
    const [imagem, setImagem] = useState(null);
    const [notas, setNotas] = useState("");
    const [feedback, setFeedback] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("imagem_refeicao", imagem);
        formData.append("notas", notas);

        const response = await Api.post(route("diario.postar"), formData);
        console.log(response);
    };

    return (
        <UserLayout>
            <Head title="Diário Alimentar" />

            <WrapperContainer>
                <h3 className="text-center mb-4">
                    Adicionar ao Diário Alimentar
                </h3>

                {feedback && (
                    <Alert
                        variant={feedback.type}
                        onClose={() => setFeedback(null)}
                        dismissible
                    >
                        {feedback.message}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Foto da Refeição</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => setImagem(e.target.files[0])}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formNotas" className="mb-3">
                        <Form.Label>Notas</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={notas}
                            onChange={(e) => setNotas(e.target.value)}
                            placeholder="Adicione comentários sobre a refeição..."
                        />
                    </Form.Group>

                    <Button variant="success" type="submit" className="w-100">
                        Enviar Refeição
                    </Button>
                </Form>
            </WrapperContainer>
            <Container>
                <h3 className="text-center mt-4 mb-4">Diário Alimentar</h3>
                <Row>
                    {fotosDiario.map((foto) => (
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
                                        {new Date(
                                            foto.created_at
                                        ).toLocaleDateString()}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </UserLayout>
    );
};

export default DiarioAlimentar;
