import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import FormModal from "@/Components/FormModal";
import SweetAlert from "@/Components/SweetAlert";
import { Button, Col, Form, InputGroup, Row, Table } from "react-bootstrap";

const Finalizadas = () => {
    const { consultas_finalizadas } = usePage().props;

    /**
     * Editar consulta
     */
    const { data, setData, post, processing, errors, reset } = useForm({
        id: "",
        peso: "",
        altura: "",
        imc: "",
        circunferencia_cintura: "",
        circunferencia_quadril: "",
        circunferencia_pescoco: "",
        percentual_gordura: "",
        massa_muscular: "",
    });

    const [showModal, setShowModal] = useState(false);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        setShowModal(data.id ? true : false);
    }, [data.id]);

    const handleClose = () => {
        setShowModal(false);
        setValidated(false);
        reset();
    };

    const handleEditar = (id_consulta) => {
        axios
            .get(route("admin.consultas.show", { id: id_consulta }))
            .then((response) => {
                const { consulta } = response.data;

                setData({
                    id: consulta.id,
                    peso: consulta.peso,
                    altura: consulta.altura,
                    imc: consulta.imc,
                    circunferencia_cintura: consulta.circunferencia_cintura,
                    circunferencia_quadril: consulta.circunferencia_quadril,
                    circunferencia_pescoco: consulta.circunferencia_pescoco,
                    percentual_gordura: consulta.percentual_gordura,
                    massa_muscular: consulta.massa_muscular,
                });
            })
            .catch((error) => {
                SweetAlert.error({
                    title: error.id ?? "Erro ao buscar a consulta!",
                });
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity()) {
            post(route("admin.consultas.update"), {
                onSuccess: (page) => {
                    SweetAlert.success({
                        title: page.props.title,
                    }).then(() => {
                        handleClose();
                    });
                },
                onError: (errors) => {
                    errors.error &&
                        SweetAlert.error({
                            title: errors.error,
                        });
                },
            });
        } else {
            e.stopPropagation();
        }

        setValidated(true);
    };

    /**
     * Excluir consulta
     */
    const {
        data: dataDelete,
        setData: setDataDelete,
        post: postDelete,
        reset: resetDelete,
    } = useForm({
        id: null,
    });

    useEffect(() => {
        if (dataDelete.id) {
            postDelete(route("admin.consultas.delete"), {
                onSuccess: (page) => {
                    SweetAlert.success({
                        title: page.props.title,
                    });
                },
                onError: (errorsDelete) => {
                    let mensagem = "Erro ao excluir a consulta!";

                    if (errorsDelete.error) {
                        mensagem = errorsDelete.error;
                    }

                    SweetAlert.error({
                        title: mensagem,
                    });
                },
                onFinish: () => {
                    resetDelete();
                },
            });
        }
    }, [dataDelete.id]);

    const handleDelete = (id_consulta) => {
        SweetAlert.confirm({
            title: "Deseja realmente excluir a consulta?",
            text: "Essa ação excluirá a consulta permanentemente!",
            confirmButton: "Sim, excluir",
            cancelButton: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                setDataDelete("id", id_consulta);
            } else {
                resetDelete();
            }
        });
    };

    return (
        <>
            <Row className="g-3">
                <Col xs={12} className="mt-4">
                    <Table hover striped bordered responsive className="mb-0">
                        <thead>
                            <tr>
                                <th>Paciente</th>
                                <th>Telefone</th>
                                <th>Data</th>
                                <th>Hora</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {consultas_finalizadas.length > 0 ? (
                                consultas_finalizadas.map((consulta, index) => (
                                    <tr key={index}>
                                        <td>{consulta.paciente}</td>

                                        <td className="text-center">
                                            {consulta.telefone}
                                        </td>

                                        <td className="text-center">
                                            {consulta.data}
                                        </td>

                                        <td className="text-center">
                                            {consulta.hora.slice(0, 5)}
                                        </td>

                                        <td className="text-center d-grid gap-2 d-md-block">
                                            <Button
                                                variant="primary"
                                                title="Editar consulta"
                                                onClick={() =>
                                                    handleEditar(consulta.id)
                                                }
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </Button>

                                            <Button
                                                variant="danger"
                                                title="Excluir consulta"
                                                onClick={() =>
                                                    handleDelete(consulta.id)
                                                }
                                            >
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        Nenhuma consulta finalizada.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <FormModal
                show={showModal}
                title={"Editar Consulta"}
                validated={validated}
                processing={processing}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
            >
                <Row className="g-3">
                    <Col xs={12}>
                        <Form.Label className="fw-semibold">
                            Resultado da Consulta
                        </Form.Label>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Peso</InputGroup.Text>

                            <Form.Control
                                type={"text"}
                                value={data.peso || ""}
                                isInvalid={validated && errors.peso}
                                onChange={(e) => {
                                    setData("peso", e.target.value);
                                }}
                            />

                            <InputGroup.Text>Kg</InputGroup.Text>

                            <Form.Control.Feedback type="invalid">
                                {errors.peso}
                            </Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Altura</InputGroup.Text>

                            <Form.Control
                                type={"text"}
                                value={data.altura || ""}
                                isInvalid={validated && errors.altura}
                                onChange={(e) => {
                                    setData("altura", e.target.value);
                                }}
                            />

                            <InputGroup.Text>cm</InputGroup.Text>

                            <Form.Control.Feedback type="invalid">
                                {errors.altura}
                            </Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>IMC</InputGroup.Text>

                            <Form.Control
                                type={"text"}
                                value={data.imc || ""}
                                isInvalid={validated && errors.imc}
                                onChange={(e) => {
                                    setData("imc", e.target.value);
                                }}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.imc}
                            </Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                Circunferência Cintura
                            </InputGroup.Text>

                            <Form.Control
                                type={"text"}
                                value={data.circunferencia_cintura || ""}
                                isInvalid={
                                    validated && errors.circunferencia_cintura
                                }
                                onChange={(e) => {
                                    setData(
                                        "circunferencia_cintura",
                                        e.target.value
                                    );
                                }}
                            />

                            <InputGroup.Text>cm</InputGroup.Text>

                            <Form.Control.Feedback type="invalid">
                                {errors.circunferencia_cintura}
                            </Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                Circunferência Quadril
                            </InputGroup.Text>

                            <Form.Control
                                type={"text"}
                                value={data.circunferencia_quadril || ""}
                                isInvalid={
                                    validated && errors.circunferencia_quadril
                                }
                                onChange={(e) => {
                                    setData(
                                        "circunferencia_quadril",
                                        e.target.value
                                    );
                                }}
                            />

                            <InputGroup.Text>cm</InputGroup.Text>

                            <Form.Control.Feedback type="invalid">
                                {errors.circunferencia_quadril}
                            </Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                Circunferência Pescoço
                            </InputGroup.Text>

                            <Form.Control
                                type={"text"}
                                value={data.circunferencia_pescoco || ""}
                                isInvalid={
                                    validated && errors.circunferencia_pescoco
                                }
                                onChange={(e) => {
                                    setData(
                                        "circunferencia_pescoco",
                                        e.target.value
                                    );
                                }}
                            />

                            <InputGroup.Text>cm</InputGroup.Text>

                            <Form.Control.Feedback type="invalid">
                                {errors.circunferencia_pescoco}
                            </Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                Percentual de Gordura
                            </InputGroup.Text>

                            <Form.Control
                                type={"text"}
                                value={data.percentual_gordura || ""}
                                isInvalid={
                                    validated && errors.percentual_gordura
                                }
                                onChange={(e) => {
                                    setData(
                                        "percentual_gordura",
                                        e.target.value
                                    );
                                }}
                            />

                            <InputGroup.Text>%</InputGroup.Text>

                            <Form.Control.Feedback type="invalid">
                                {errors.percentual_gordura}
                            </Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Massa Muscular</InputGroup.Text>

                            <Form.Control
                                type={"text"}
                                value={data.massa_muscular || ""}
                                isInvalid={validated && errors.massa_muscular}
                                onChange={(e) => {
                                    setData("massa_muscular", e.target.value);
                                }}
                            />

                            <InputGroup.Text>%</InputGroup.Text>

                            <Form.Control.Feedback type="invalid">
                                {errors.massa_muscular}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                </Row>
            </FormModal>
        </>
    );
};

export default Finalizadas;
