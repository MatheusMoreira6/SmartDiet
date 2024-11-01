import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import WrapperContainer from "@/Components/WrapperContainer";
import PageTopic from "@/Components/PageTopic";
import FormModal from "@/Components/FormModal";
import FormInput from "@/Components/FormInput";
import FormSelect from "@/Components/FormSelect";
import { Button, Col, Form, Row, Table } from "react-bootstrap";

const Exames = ({ exames, pacientes, pacientes_exame }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        paciente_id: "",
        data_pedido: new Date().toLocaleDateString("pt-BR"),
    });

    const [showModal, setShowModal] = useState(false);
    const [validated, setValidated] = useState(false);
    const [errorExames, setErrorExame] = useState(false);

    const [selectedExames, setSelectedExames] = useState([]);

    const handleShow = () => setShowModal(true);

    const handleClose = () => {
        setShowModal(false);
        setValidated(false);
        setErrorExame(false);
        reset();
    };

    const handleCheckboxChange = (event, exameId) => {
        if (event.target.checked) {
            setSelectedExames([...selectedExames, exameId]);
        } else {
            setSelectedExames(selectedExames.filter((id) => id !== exameId));
        }

        if (selectedExames.length > 0) {
            setErrorExame(false);
        } else {
            setErrorExame(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity() && selectedExames.length > 0) {
            setErrorExame(false);

            post(route("admin.exames"), {
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
            setErrorExame(true);
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
                                {pacientes_exame &&
                                pacientes_exame.length > 0 ? (
                                    pacientes_exame.map((paciente) => (
                                        <tr key={paciente.id}>
                                            <td>{paciente.nome}</td>

                                            <td className="text-center d-grid gap-2 d-md-block">
                                                <Button
                                                    variant="danger"
                                                    onClick={() =>
                                                        console.log(
                                                            "Excluir exame"
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </Button>
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
                        <Col xs={12} lg={6}>
                            <FormSelect
                                id={"paciente_id"}
                                label={"Paciente"}
                                bold={true}
                                options={pacientes}
                                value={data.paciente_id}
                                required={true}
                                isInvalid={errors.paciente_id}
                                onChange={(e) =>
                                    setData("paciente_id", e.target.value)
                                }
                                textError={
                                    errors.paciente_id ?? "Selecione o paciente"
                                }
                            />
                        </Col>

                        <Col xs={12} lg={6}>
                            <FormInput
                                id={"data_pedido"}
                                label={"Data do Pedido"}
                                type={"text"}
                                mask={"99/99/9999"}
                                bold={true}
                                value={data.data_pedido}
                                placeHolder={"__/__/____"}
                                required={true}
                                isInvalid={errors.data_pedido}
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
                            <Form.Label className="fw-semibold">
                                Exames
                            </Form.Label>

                            {exames.map((exame) => (
                                <Form.Check
                                    id={exame.id}
                                    key={exame.id}
                                    type={"checkbox"}
                                    isInvalid={errorExames}
                                    label={exame.nome}
                                    onChange={(event) =>
                                        handleCheckboxChange(event, exame.id)
                                    }
                                />
                            ))}

                            {errorExames && (
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="d-block"
                                >
                                    Selecione pelo menos um exame antes de
                                    enviar o pedido.
                                </Form.Control.Feedback>
                            )}
                        </Col>
                    </Row>
                </FormModal>
            </WrapperContainer>
        </AdminLayout>
    );
};

export default Exames;
