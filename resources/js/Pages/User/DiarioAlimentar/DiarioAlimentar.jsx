import { Head, useForm } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import {
    Container,
    Form,
    Button,
    Card,
    Alert,
    Col,
    Row,
} from "react-bootstrap";
import SweetAlert from "@/Components/SweetAlert";
import WrapperContainer from "@/Components/WrapperContainer";
import PageTopic from "@/Components/PageTopic";
import { useRef } from "react";
import { useState } from "react";

const DiarioAlimentar = ({ fotosDiario }) => {
    const [dynamicFotos, setDynamisFotos] = useState(fotosDiario);
    const fileInputRef = useRef(null);

    const { data, setData, post, reset, errors } = useForm({
        imagem_refeicao: null,
        notas: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("diario.postar"), {
            onSuccess: (response) => {
                SweetAlert.success({
                    title: "Enviado!",
                    text: "Foto enviada com sucesso",
                });
                if (response.props.fotosDiario) {
                    setDynamisFotos(response.props.fotosDiario);
                }

                reset();
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            },
            onError: (error) => {
                if (errors.imagem_refeicao) {
                    SweetAlert.error({
                        title: "Erro ao enviar arquivo",
                        text: errors.imagem_refeicao,
                    });
                } else {
                    SweetAlert.error({
                        title: "Erro ao enviar arquivo",
                        text: "Ocorreu um erro inesperado!",
                    });
                }
            },
        });
    };

    return (
        <UserLayout>
            <Head title="Diário Alimentar" />

            <WrapperContainer>
                <h3 className="text-center mb-4">
                    Adicionar ao Diário Alimentar
                </h3>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Foto da Refeição</Form.Label>
                        <Form.Control
                            type="file"
                            ref={fileInputRef} // Referência para o campo de arquivo
                            onChange={(e) =>
                                setData("imagem_refeicao", e.target.files[0])
                            }
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formNotas" className="mb-3">
                        <Form.Label>Notas</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={data.notas}
                            onChange={(e) => setData("notas", e.target.value)}
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
                    {dynamicFotos.map((foto) => (
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
