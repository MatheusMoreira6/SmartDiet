import { useState } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import WrapperContainer from "@/Components/WrapperContainer";
import PageTopic from "@/Components/PageTopic";
import FormInput from "@/Components/FormInput";
import FormGroupButton from "@/Components/FormGroupButton";
import LinkWarning from "@/Components/LinkWarning";
import SweetAlert from "@/Components/SweetAlert";
import { Button, Col, Form, Row } from "react-bootstrap";

const Editar = ({ questionario }) => {
    const emptyPerguntas = [
        { id: -1, pergunta: "" },
        { id: -2, pergunta: "" },
        { id: -3, pergunta: "" },
    ];

    const [id_empty, setEmpty] = useState(-4);
    const [validated, setValidated] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        id: questionario.id,
        titulo: questionario.titulo ?? "",
        perguntas: questionario.perguntas ?? emptyPerguntas,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity()) {
            post(route("admin.questionarios.update"), {
                onSuccess: (page) => {
                    SweetAlert.success({
                        title: page.props.title,
                    }).then(() => {
                        router.visit(route("admin.questionarios"));
                        reset();
                    });
                },
                onError: () => {
                    (errors.perguntas || errors.error) &&
                        SweetAlert.error({
                            title: errors.perguntas ?? errors.error,
                        });
                },
            });
        } else {
            e.stopPropagation();
        }

        setValidated(true);
    };

    const addQuestion = () => {
        setData("perguntas", [
            ...data.perguntas,
            { id: id_empty, pergunta: "" },
        ]);

        setEmpty(id_empty - 1);
    };

    const removeQuestion = (index) => {
        const newQuestions = [...data.perguntas];

        newQuestions.splice(index, 1);

        setData("perguntas", newQuestions);
    };

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...data.perguntas];

        newQuestions[index].pergunta = value;

        setData("perguntas", newQuestions);
    };

    return (
        <AdminLayout>
            <Head title="Cadastrar Questionário" />

            <WrapperContainer>
                <PageTopic>
                    <i className="bi bi-file-earmark-text"></i>
                    Cadastrar Questionário
                </PageTopic>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="g-3 mb-3">
                        <Col xs={12}>
                            <FormInput
                                id={"titulo"}
                                label={"Título do Questionário"}
                                type={"text"}
                                bold={true}
                                value={data.titulo}
                                autoFocus={true}
                                placeHolder={"Digite o título do questionário"}
                                required={true}
                                isInvalid={errors.titulo}
                                onChange={(e) =>
                                    setData("titulo", e.target.value)
                                }
                                textError={
                                    errors.titulo ??
                                    "O campo título é obrigatório"
                                }
                            />
                        </Col>

                        <Col xs={12}>
                            <div className="d-grid gap-2 d-md-block">
                                <Button variant="primary" onClick={addQuestion}>
                                    <i className="bi bi-plus-lg"></i>
                                    Adicionar Pergunta
                                </Button>
                            </div>
                        </Col>

                        {data.perguntas.map((question, index) => {
                            const sequencia = index + 1;

                            const id = `pergunta_${question.id}`;
                            const label = `${sequencia}º Pergunta`;
                            const placeHolder = `Digite a ${sequencia}º pergunta`;

                            return (
                                <Col xs={12} key={index}>
                                    <FormGroupButton
                                        id={id}
                                        label={label}
                                        type={"text"}
                                        bold={true}
                                        value={question.pergunta}
                                        placeHolder={placeHolder}
                                        textButton={"Remover"}
                                        buttonVariant={"danger"}
                                        required={true}
                                        isInvalid={errors[id]}
                                        onChange={(e) =>
                                            handleQuestionChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        onButtonClick={() =>
                                            removeQuestion(index)
                                        }
                                        textError={
                                            errors[id] ?? "Campo obrigatório"
                                        }
                                    />
                                </Col>
                            );
                        })}
                    </Row>

                    <Row className="g-3">
                        <div className="d-grid gap-2 d-md-block">
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={processing}
                            >
                                <i className="bi bi-floppy"></i>
                                {processing ? "Salvando..." : "Salvar"}
                            </Button>

                            <LinkWarning href={route("admin.questionarios")}>
                                <i className="bi bi-arrow-return-left"></i>
                                Cancelar
                            </LinkWarning>
                        </div>
                    </Row>
                </Form>
            </WrapperContainer>
        </AdminLayout>
    );
};

export default Editar;
