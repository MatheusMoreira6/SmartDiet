import { useState } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import ActionCard from "@/Components/ActionCard";
import FormInput from "@/Components/FormInput";
import FormModal from "@/Components/FormModal";
import FormSelect from "@/Components/FormSelect";
import SweetAlert from "@/Components/SweetAlert";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

const Pacientes = ({ generos, questionarios, pacientes }) => {
    /**
     * Cadastrar pacientes
     */
    const { data, setData, post, processing, errors, reset } = useForm({
        nome: "",
        sobrenome: "",
        data_nascimento: "",
        genero_id: "",
        cpf: "",
        telefone: "",
        questionario_id: "",
        email: "",
    });

    const [showModal, setShowModal] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleShow = () => setShowModal(true);

    const handleClose = () => {
        setShowModal(false);
        setValidated(false);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity()) {
            post(route("admin.pacientes.store"), {
                onSuccess: (page) => {
                    const title = page.props.title;
                    const text = page.props.text;

                    SweetAlert.success({ title: title, text: text }).then(() =>
                        handleClose()
                    );
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

    /**
     * Buscar pacientes
     */
    const handleSearch = () => {
        const nome_paciente = document.getElementById("nome_paciente").value;

        router.visit(
            route("admin.pacientes.search", {
                nome: nome_paciente,
            }),
            {
                only: ["pacientes"],
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    /**
     * Renderizar pacientes
     */
    const renderPacientes = (pacientes) => {
        return pacientes.map((paciente) => (
            <Col key={paciente.id} className="mb-4">
                <ActionCard
                    footer={`${paciente.nome} ${paciente.sobrenome}`}
                    onClick={() => {
                        router.visit(
                            route("admin.pacientes.id", { id: paciente.id })
                        );
                    }}
                >
                    <img src="..." className="card-img-top" alt="..." />
                </ActionCard>
            </Col>
        ));
    };

    return (
        <AdminLayout>
            <Head title="Pacientes" />

            <Container fluid className="py-4">
                <Row className="mb-4 justify-content-center">
                    <Col xs={12} md={6} xxl={4} className="p-2 rounded shadow">
                        <InputGroup>
                            <Form.Control
                                id="nome_paciente"
                                type="text"
                                placeholder="Nome do Paciente"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                            />

                            <Button
                                variant="primary"
                                onClick={() => handleSearch()}
                            >
                                <i className="bi bi-search"></i>
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>

                <Row xs={1} md={2} lg={3} xl={4} xxl={5}>
                    <Col className="mb-4">
                        <ActionCard onClick={handleShow}>
                            <i
                                className="bi bi-person-fill-add m-auto"
                                style={{ fontSize: "120px" }}
                            ></i>
                        </ActionCard>
                    </Col>

                    {pacientes.length > 0 && renderPacientes(pacientes)}
                </Row>
            </Container>

            <FormModal
                show={showModal}
                title={"Cadastrar Paciente"}
                validated={validated}
                processing={processing}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
            >
                <Row className="g-3">
                    <Col xs={12} lg={4}>
                        <FormInput
                            id={"nome"}
                            label={"Nome"}
                            type={"text"}
                            value={data.nome}
                            autoFocus={true}
                            placeHolder={"Nome do paciente"}
                            required={true}
                            isInvalid={errors.nome}
                            onChange={(e) => setData("nome", e.target.value)}
                            textError={
                                errors.nome ?? "Informe o nome do paciente"
                            }
                        />
                    </Col>

                    <Col xs={12} lg={4}>
                        <FormInput
                            id={"sobrenome"}
                            label={"Sobrenome"}
                            type={"text"}
                            value={data.sobrenome}
                            placeHolder={"Sobrenome do paciente"}
                            required={true}
                            isInvalid={errors.sobrenome}
                            onChange={(e) =>
                                setData("sobrenome", e.target.value)
                            }
                            textError={
                                errors.sobrenome ??
                                "Informe o sobrenome do paciente"
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
                                "Informe a data de nascimento do paciente"
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
                            textError={errors.genero_id ?? "Sexo do paciente"}
                        />
                    </Col>

                    <Col xs={12} lg={4}>
                        <FormInput
                            id={"cpf"}
                            label={"CPF"}
                            type={"text"}
                            mask={"999.999.999-99"}
                            value={data.cpf}
                            placeHolder={"999.999.999-99"}
                            required={true}
                            isInvalid={errors.cpf}
                            onChange={(e) => setData("cpf", e.target.value)}
                            textError={
                                errors.cpf ?? "Informe o CPF do paciente"
                            }
                        />
                    </Col>

                    <Col xs={12} lg={4}>
                        <FormInput
                            id={"telefone"}
                            label={"Telefone"}
                            type={"text"}
                            mask={"(99) 99999-9999"}
                            value={data.telefone}
                            placeHolder={"(99) 99999-9999"}
                            required={true}
                            isInvalid={errors.telefone}
                            onChange={(e) =>
                                setData("telefone", e.target.value)
                            }
                            textError={
                                errors.telefone ??
                                "Informe o telefone do paciente"
                            }
                        />
                    </Col>

                    <Col xs={12}>
                        <FormSelect
                            id={"questionario"}
                            label={"Questionário"}
                            options={questionarios}
                            value={data.questionario_id}
                            required={false}
                            isInvalid={errors.questionario_id}
                            onChange={(e) =>
                                setData("questionario_id", e.target.value)
                            }
                            textError={errors.questionario_id ?? ""}
                        />
                    </Col>

                    <Col xs={12}>
                        <FormInput
                            id={"email"}
                            label={"E-mail"}
                            type={"email"}
                            value={data.email}
                            placeHolder={"E-mail do paciente"}
                            required={true}
                            isInvalid={errors.email}
                            onChange={(e) =>
                                setData("email", e.target.value.toLowerCase())
                            }
                            textError={
                                errors.email ??
                                (data.email
                                    ? "Insira um e-mail válido"
                                    : "Informe o e-mail do paciente")
                            }
                        />
                    </Col>
                </Row>
            </FormModal>
        </AdminLayout>
    );
};

export default Pacientes;
