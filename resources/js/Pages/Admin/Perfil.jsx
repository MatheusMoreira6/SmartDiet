import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Container from "@/Components/Container";
import FormInput from "@/Components/FormInput";
import FormSelect from "@/Components/FormSelect";
import LinkWarning from "@/Components/LinkWarning";
import PageTopic from "@/Components/PageTopic";
import SweetAlert from "@/Components/SweetAlert";
import { Button, Col, Form, Row } from "react-bootstrap";

const Perfil = ({ user, generos, dados }) => {
    const { data, setData, put, processing, errors } = useForm({
        nome: dados.nome,
        sobrenome: dados.sobrenome,
        data_nascimento: dados.data_nascimento,
        genero_id: dados.genero_id,
        cpf: dados.cpf,
        crn: dados.crn,
        telefone: dados.telefone,
        telefone_fixo: dados.telefone_fixo ?? "",
    });

    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity()) {
            put(route("admin.perfil"), {
                onSuccess: (page) => {
                    SweetAlert.success({
                        title: page.props.title,
                        text: page.props.text,
                    });
                },
                onError: () => {
                    errors.error && SweetAlert.error({ title: errors.error });
                },
            });
        } else {
            e.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <AdminLayout user={user}>
            <Head title="Perfil" />

            <Container>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <PageTopic>
                        <i className="bi bi-person-lines-fill"></i>
                        Perfil
                    </PageTopic>

                    <Row className="g-3">
                        <Col xs={12} md={4} xl={3}>
                            <FormInput
                                id={"nome"}
                                label={"Nome"}
                                type={"text"}
                                value={data.nome}
                                placeHolder={dados.nome}
                                required={true}
                                isInvalid={errors.nome}
                                onChange={(e) =>
                                    setData("nome", e.target.value)
                                }
                                textError={
                                    errors.nome ?? "O campo nome é obrigatório"
                                }
                            />
                        </Col>

                        <Col xs={12} md={4} xl={3}>
                            <FormInput
                                id={"sobrenome"}
                                label={"Sobrenome"}
                                type={"text"}
                                value={data.sobrenome}
                                placeHolder={dados.sobrenome}
                                required={true}
                                isInvalid={errors.sobrenome}
                                onChange={(e) =>
                                    setData("sobrenome", e.target.value)
                                }
                                textError={
                                    errors.sobrenome ??
                                    "O campo sobrenome é obrigatório"
                                }
                            />
                        </Col>

                        <Col xs={12} md={4} xl={3}>
                            <FormInput
                                id={"data_nascimento"}
                                label={"Data de Nascimento"}
                                type={"text"}
                                mask={"99/99/9999"}
                                value={data.data_nascimento}
                                placeHolder={dados.data_nascimento}
                                required={true}
                                isInvalid={errors.data_nascimento}
                                onChange={(e) =>
                                    setData("data_nascimento", e.target.value)
                                }
                                textError={
                                    errors.data_nascimento ??
                                    "O campo data de nascimento é obrigatório"
                                }
                            />
                        </Col>

                        <Col xs={12} md={4} xl={3}>
                            <FormSelect
                                id={"sexo"}
                                label={"Sexo"}
                                options={generos}
                                value={data.genero_id}
                                required={true}
                                isInvalid={errors.genero_id}
                                onChange={(e) =>
                                    setData("genero_id", e.target.value)
                                }
                                textError={
                                    errors.genero_id ??
                                    "O campo sexo é obrigatório"
                                }
                            />
                        </Col>

                        <Col xs={12} md={4} xl={3}>
                            <FormInput
                                id={"cpf"}
                                label={"CPF"}
                                type={"text"}
                                mask={"999.999.999-99"}
                                value={data.cpf}
                                placeHolder={dados.cpf}
                                required={true}
                                isInvalid={errors.cpf}
                                onChange={(e) => setData("cpf", e.target.value)}
                                textError={
                                    errors.cpf ?? "O campo cpf é obrigatório"
                                }
                            />
                        </Col>

                        <Col xs={12} md={4} xl={3}>
                            <FormInput
                                id={"crn"}
                                label={"CRN"}
                                type={"text"}
                                mask={"9/99999/a"}
                                value={data.crn}
                                placeHolder={dados.crn}
                                required={true}
                                isInvalid={errors.crn}
                                onChange={(e) =>
                                    setData("crn", e.target.value.toUpperCase())
                                }
                                textError={
                                    errors.crn ?? "O campo CRN é obrigatório"
                                }
                            />
                        </Col>

                        <Col xs={12} md={4} xl={3}>
                            <FormInput
                                id={"telefone"}
                                label={"Telefone"}
                                type={"text"}
                                mask={"(99) 99999-9999"}
                                value={data.telefone}
                                placeHolder={dados.telefone}
                                required={true}
                                isInvalid={errors.telefone}
                                onChange={(e) =>
                                    setData("telefone", e.target.value)
                                }
                                textError={
                                    errors.telefone ??
                                    "O campo telefone é obrigatório"
                                }
                            />
                        </Col>

                        <Col xs={12} md={4} xl={3}>
                            <FormInput
                                id={"telefone_fixo"}
                                label={"Telefone Fixo"}
                                type={"text"}
                                mask={"9999-9999"}
                                value={data.telefone_fixo}
                                placeHolder={dados.telefone_fixo}
                                required={false}
                                isInvalid={errors.telefone_fixo}
                                onChange={(e) =>
                                    setData("telefone_fixo", e.target.value)
                                }
                                textError={errors.telefone_fixo}
                            />
                        </Col>

                        <Col xs={12}>
                            <div className="d-grid gap-2 d-md-block">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={processing}
                                >
                                    <i className="bi bi-floppy"></i>
                                    {processing ? "Salvando..." : "Salvar"}
                                </Button>

                                <LinkWarning href={route("admin.home")}>
                                    <i className="bi bi-arrow-return-left"></i>
                                    Cancelar
                                </LinkWarning>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </AdminLayout>
    );
};

export default Perfil;
