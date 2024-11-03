import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
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

        const response = await Api.post(route('diario.postar'), formData);
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
        </UserLayout>
    );
};

export default DiarioAlimentar;
