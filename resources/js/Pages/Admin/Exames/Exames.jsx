import { useEffect, useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import WrapperContainer from "@/Components/WrapperContainer";
import PageTopic from "@/Components/PageTopic";
import FormModal from "@/Components/FormModal";
import FormInput from "@/Components/FormInput";
import FormSelect from "@/Components/FormSelect";
import SweetAlert from "@/Components/SweetAlert";
import LinkPrimary from "@/Components/LinkPrimary";
import { Button, Col, Form, Row, Table } from "react-bootstrap";

const Exames = ({ exames, pacientes, pacientes_exames, errors = {} }) => {
    useEffect(() => {
        if (errors && (errors.id || errors.error)) {
            SweetAlert.error({
                title: errors.id ?? errors.error,
            });
        }
    }, [errors]);

    const { data, setData, post, processing, reset, clearErrors } = useForm({
        paciente_id: "",
        titulo_pedido: "",
        data_pedido: new Date().toLocaleDateString("pt-BR"),
        itens_pedido_exame: [],
    });

    const [showModal, setShowModal] = useState(false);
    const [validated, setValidated] = useState(false);
    const [errorExames, setErrorExame] = useState(false);

    const handleShow = () => setShowModal(true);

    const handleClose = () => {
        setShowModal(false);
        setValidated(false);
        setErrorExame(false);
        reset();
        clearErrors();
    };

    useEffect(() => {
        setErrorExame(data.itens_pedido_exame.length == 0);
    }, [data.itens_pedido_exame]);

    const handleCheckboxChange = (event, id_pedido_exame) => {
        if (event.target.checked) {
            setData("itens_pedido_exame", [
                ...data.itens_pedido_exame,
                id_pedido_exame,
            ]);
        } else {
            setData(
                "itens_pedido_exame",
                data.itens_pedido_exame.filter(
                    (exame) => exame !== id_pedido_exame
                )
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity() && errorExames == false) {
            post(route("admin.exames.store"), {
                onSuccess: (page) => {
                    SweetAlert.success({
                        title: page.props.title,
                        text: page.props.text,
                    }).then(() => handleClose());
                },
            });
        } else {
            e.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <AdminLayout>
            <Head title="Exames" />

            <WrapperContainer>
                <PageTopic>
                    <i className="bi bi-clipboard2-pulse"></i>
                    Exames
                </PageTopic>

                <Row className="g-3">
                    <Col xs={12}>
                        <div className="d-grid gap-2 d-md-block">
                            <Button variant="primary" onClick={handleShow}>
                                <i className="bi bi-plus-lg"></i>
                                Novo Exame
                            </Button>
                        </div>
                    </Col>

                    <Col xs={12}>
                        <Table
                            hover
                            striped
                            bordered
                            responsive
                            className="mb-0"
                        >
                            <thead>
                                <tr>
                                    <th>Paciente</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {pacientes_exames &&
                                pacientes_exames.length > 0 ? (
                                    pacientes_exames.map((paciente) => (
                                        <tr key={paciente.id}>
                                            <td>{paciente.nome}</td>

                                            <td className="text-center d-grid gap-2 d-md-block">
                                                <LinkPrimary
                                                    href={route(
                                                        "admin.exames.edit",
                                                        { id: paciente.id }
                                                    )}
                                                    title="Visualizar Exames"
                                                >
                                                    <i className="bi bi-eye"></i>
                                                </LinkPrimary>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="text-center">
                                            Nenhum paciente com exame
                                            cadastrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <FormModal
                    show={showModal}
                    title={"Cadastrar Pedido de Exame"}
                    validated={validated}
                    processing={processing}
                    handleClose={handleClose}
                    handleSubmit={handleSubmit}
                >
                    <Row className="g-3">
                        <Col xs={12}>
                            <FormSelect
                                id={"paciente_id"}
                                label={"Paciente"}
                                bold={true}
                                options={pacientes}
                                value={data.paciente_id}
                                required={true}
                                isInvalid={validated && errors.paciente_id}
                                onChange={(e) =>
                                    setData("paciente_id", e.target.value)
                                }
                                textError={
                                    errors.paciente_id ?? "Selecione o paciente"
                                }
                            />
                        </Col>

                        <Col xs={12} lg={8}>
                            <FormInput
                                id={"titulo_pedido"}
                                label={"Título do Pedido"}
                                type={"text"}
                                bold={true}
                                value={data.titulo_pedido}
                                required={true}
                                isInvalid={validated && errors.titulo_pedido}
                                onChange={(e) =>
                                    setData("titulo_pedido", e.target.value)
                                }
                                textError={
                                    errors.titulo_pedido ??
                                    "Informe o título do pedido"
                                }
                            />
                        </Col>

                        <Col xs={12} lg={4}>
                            <FormInput
                                id={"data_pedido"}
                                label={"Data do Pedido"}
                                type={"text"}
                                mask={"99/99/9999"}
                                bold={true}
                                value={data.data_pedido}
                                placeHolder={"__/__/____"}
                                required={true}
                                isInvalid={validated && errors.data_pedido}
                                onChange={(e) =>
                                    setData("data_pedido", e.target.value)
                                }
                                textError={
                                    errors.data_pedido ??
                                    "Informe a data do pedido"
                                }
                            />
                        </Col>

                        <Col xs={12}>
                            <Form.Group controlId="itens_pedido_exame">
                                <Form.Label className="fw-semibold">
                                    Itens do Pedido
                                </Form.Label>

                                {exames.map((exame) => (
                                    <Form.Check
                                        id={exame.id}
                                        key={exame.id}
                                        type={"checkbox"}
                                        label={exame.nome}
                                        isInvalid={validated && errorExames}
                                        onChange={(event) =>
                                            handleCheckboxChange(
                                                event,
                                                exame.id
                                            )
                                        }
                                    />
                                ))}

                                {validated && errorExames && (
                                    <Form.Control.Feedback
                                        type="invalid"
                                        className="d-block"
                                    >
                                        Selecione pelo menos um exame antes de
                                        enviar o pedido.
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>
                </FormModal>
            </WrapperContainer>
        </AdminLayout>
    );
};

export default Exames;
