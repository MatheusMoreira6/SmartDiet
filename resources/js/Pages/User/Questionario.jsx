import { useState, useEffect } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import WrapperContainer from "@/Components/WrapperContainer";
import PageTopic from "@/Components/PageTopic";
import TinyMCE from "@/Components/TinyMCE";
import SweetAlert from "@/Components/SweetAlert";
import { Button, Col, Form, Row } from "react-bootstrap";

const Questionario = ({ questionario }) => {
    const emptyRespostas = questionario.perguntas.map((question) => ({
        id: question.id,
        resposta: "",
    }));

    const { data, setData, post, processing, errors } = useForm({
        id: questionario.id,
        respostas: emptyRespostas,
    });

    useEffect(() => {
        if (errors.id || errors.respostas || errors.error) {
            SweetAlert.error({
                title: errors.id ?? errors.respostas ?? errors.error,
            });
        }
    }, [errors]);

    const [validated, setValidated] = useState(false);

    const handleTinyMCEChange = (id, content) => {
        const respostas = data.respostas.map((resposta) => {
            if (resposta.id === id) {
                return {
                    id: id,
                    resposta: content,
                };
            }

            return resposta;
        });

        setData({ ...data, respostas: respostas });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        let questionario_respondido = true;

        data.respostas.map((resposta) => {
            if (resposta.resposta.trim() === "") {
                questionario_respondido = false;
            }
        });

        if (form.checkValidity() && questionario_respondido) {
            post(route("user.questionario"), {
                onSuccess: (page) => {
                    SweetAlert.success({
                        title: page.props.title,
                    }).then(() => {
                        router.visit(route("user.home"));
                    });
                },
                onError: () => {
                    SweetAlert.error({
                        title: "Erro ao enviar respostas!",
                    });
                },
            });
        } else {
            SweetAlert.error({
                title: "Responda todas as perguntas!",
            });

            e.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <UserLayout>
            <Head title="Questionário" />

            <WrapperContainer>
                <PageTopic>
                    <i className="bi bi-file-earmark-text"></i>
                    {questionario.titulo}
                </PageTopic>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="g-3">
                        {questionario.perguntas.map((question) => (
                            <Col xs={12} key={question.id}>
                                <Form.Group
                                    controlId={`pergunta_${question.id}`}
                                >
                                    <Form.Label className="fw-semibold">
                                        {question.pergunta}
                                    </Form.Label>

                                    <TinyMCE
                                        onChange={(content) => {
                                            handleTinyMCEChange(
                                                question.id,
                                                content
                                            );
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        ))}

                        <Col xs={12}>
                            <div className="d-grid g-2 d-md-block">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={processing}
                                >
                                    <i className="bi bi-send"></i>
                                    {processing ? "Enviando..." : "Enviar"}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </WrapperContainer>
        </UserLayout>
    );
};

export default Questionario;
