import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Card from "@/Components/Card";
import FormInput from "@/Components/FormInput";
import FormModal from "@/Components/FormModal";
import FormSelect from "@/Components/FormSelect";
import SweetAlert from "@/Components/SweetAlert";
import { Col, Container, Form, Row } from "react-bootstrap";

const Pacientes = ({ generos, pacientes }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        nome: "",
        sobrenome: "",
        data_nascimento: "",
        genero_id: "",
        cpf: "",
        telefone: "",
        email: "",
    });

    const [validated, setValidated] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity()) {
            post(route("admin.pacientes"), {
                onSuccess: (page) => {
                    const title = page.props.title;
                    const text = page.props.text;

                    SweetAlert.success({ title: title, text: text }).then(
                        () => {
                            setShowModal(false);
                        }
                    );

                    reset();
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

    const renderPacientes = (pacientes) => {
        return pacientes.map((paciente) => (
            <Col key={paciente.id}>
                <Card footer={`${paciente.nome} ${paciente.sobrenome}`}>
                    <img src="..." className="card-img-top" alt="..." />
                </Card>
            </Col>
        ));
    };

    return (
        <AdminLayout>
            <Head title="Pacientes" />

            <Container fluid className="py-4">
                <Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-3">
                    <Col>
                        <Card onClick={handleShow}>
                            <i
                                className="bi bi-person-fill-add m-auto"
                                style={{ fontSize: "120px" }}
                            ></i>
                        </Card>
                    </Col>

                    {pacientes.length > 0 && renderPacientes(pacientes)}
                </Row>
            </Container>

            <FormModal
                show={showModal}
                title={"Cadastrar Paciente"}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                processing={processing}
            >
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="g-3">
                        <Col xs={12} lg={4}>
                            <FormInput
                                id={"nome"}
                                label={"Nome"}
                                type={"text"}
                                value={data.nome}
                                autoFocus={true}
                                placeHolder={"Digite seu nome"}
                                required={true}
                                isInvalid={errors.nome}
                                onChange={(e) =>
                                    setData("nome", e.target.value)
                                }
                                textError={errors.nome ?? "Informe seu nome"}
                            />
                        </Col>

                        <Col xs={12} lg={4}>
                            <FormInput
                                id={"sobrenome"}
                                label={"Sobrenome"}
                                type={"text"}
                                value={data.sobrenome}
                                placeHolder={"Digite seu sobrenome"}
                                required={true}
                                isInvalid={errors.sobrenome}
                                onChange={(e) =>
                                    setData("sobrenome", e.target.value)
                                }
                                textError={
                                    errors.sobrenome ?? "Informe seu sobrenome"
                                }
                            />
                        </Col>

                        <Col xs={12} lg={4}>
                            <FormInput
                                id={"data_nascimento"}
                                label={"Data de Nascimento"}
                                type={"text"}
                                mask={"99/99/9999"}
                                value={data.data_nascimento}
                                placeHolder={"__/__/____"}
                                required={true}
                                isInvalid={errors.data_nascimento}
                                onChange={(e) =>
                                    setData("data_nascimento", e.target.value)
                                }
                                textError={
                                    errors.data_nascimento ??
                                    "Informe sua data de nascimento"
                                }
                            />
                        </Col>

                        <Col xs={12} lg={4}>
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
                                    errors.genero_id ?? "Informe seu sexo"
                                }
                            />
                        </Col>

                        <Col xs={12} lg={4}>
                            <FormInput
                                id={"cpf"}
                                label={"CPF"}
                                type={"text"}
                                mask={"999.999.999-99"}
                                value={data.cpf}
                                placeHolder={"Digite seu CPF"}
                                required={true}
                                isInvalid={errors.cpf}
                                onChange={(e) => setData("cpf", e.target.value)}
                                textError={errors.cpf ?? "Informe seu CPF"}
                            />
                        </Col>

                        <Col xs={12} lg={4}>
                            <FormInput
                                id={"telefone"}
                                label={"Telefone"}
                                type={"text"}
                                mask={"(99) 99999-9999"}
                                value={data.telefone}
                                placeHolder={"Digite seu telefone"}
                                required={true}
                                isInvalid={errors.telefone}
                                onChange={(e) =>
                                    setData("telefone", e.target.value)
                                }
                                textError={
                                    errors.telefone ?? "Informe seu telefone"
                                }
                            />
                        </Col>

                        <Col xs={12}>
                            <FormInput
                                id={"email"}
                                label={"E-mail"}
                                type={"email"}
                                value={data.email}
                                placeHolder={"Digite seu e-mail"}
                                required={true}
                                isInvalid={errors.email}
                                onChange={(e) =>
                                    setData(
                                        "email",
                                        e.target.value.toLowerCase()
                                    )
                                }
                                textError={
                                    errors.email ?? "Insira um e-mail válido"
                                }
                            />
                        </Col>
                    </Row>
                </Form>
            </FormModal>
        </AdminLayout>
    );
};

export default Pacientes;
