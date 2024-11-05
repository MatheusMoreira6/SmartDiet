import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import FormModal from "@/Components/FormModal";
import FormSelect from "@/Components/FormSelect";
import FormHours from "@/Components/FormHours";
import SweetAlert from "@/Components/SweetAlert";
import { Accordion, Button, Col, Row, Table } from "react-bootstrap";

const tableHorarios = (horarios, handleShow, handleDelete) => {
    return (
        <Table hover striped bordered responsive className="mb-0">
            <thead>
                <tr>
                    <th>Hora de Início</th>
                    <th>Hora de Fim</th>
                    <th>Ações</th>
                </tr>
            </thead>

            <tbody>
                {horarios.map((horario, index) => (
                    <tr key={index}>
                        <td className="text-center">
                            {horario.hora_inicio.slice(0, 5)}
                        </td>

                        <td className="text-center">
                            {horario.hora_fim.slice(0, 5)}
                        </td>

                        <td className="text-center d-grid gap-2 d-md-block">
                            <Button
                                variant="primary"
                                onClick={() => {
                                    handleShow(horario.id);
                                }}
                            >
                                <i className="bi bi-pencil"></i>
                            </Button>

                            <Button
                                variant="danger"
                                onClick={() => {
                                    handleDelete(horario.id);
                                }}
                            >
                                <i className="bi bi-trash"></i>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

const Horarios = () => {
    const { dias_semana, horarios_nutricionista } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        id: "",
        dia_semana_id: "",
        hora_inicio: "",
        hora_fim: "",
    });

    const {
        data: dataDelete,
        setData: setDataDelete,
        post: postDelete,
        reset: resetDelete,
    } = useForm({
        id: null,
    });

    const [title, setTitle] = useState("Adicionar Horário");
    const [showModal, setShowModal] = useState(false);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (data.id) {
            setTitle("Editar Horário");
            setShowModal(true);
        } else {
            setTitle("Adicionar Horário");
            setShowModal(false);
        }

        if (dataDelete.id) {
            postDelete(route("admin.configuracoes.horario.delete"), {
                onSuccess: (page) => {
                    SweetAlert.success({
                        title: page.props.title,
                    });
                },
                onError: (errorsDelete) => {
                    SweetAlert.error({
                        title: errorsDelete.error ?? "Erro ao excluir horário",
                    });
                },
                onFinish: () => {
                    resetDelete();
                },
            });
        }
    }, [data.id, dataDelete.id]);

    const handleShow = (id_horario = null) => {
        if (id_horario) {
            axios
                .get(
                    route("admin.configuracoes.horario.show", {
                        id: id_horario,
                    })
                )
                .then((response) => {
                    const { horario } = response.data;

                    setData({
                        id: horario.id,
                        dia_semana_id: horario.dia_semana_id,
                        hora_inicio: horario.hora_inicio.slice(0, 5),
                        hora_fim: horario.hora_fim.slice(0, 5),
                    });
                })
                .catch((error) => {
                    SweetAlert.error({
                        title: error.id ?? "Erro ao buscar horário",
                    });
                });
        } else {
            reset();
            setTitle("Adicionar Horário");
            setShowModal(true);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setValidated(false);
        setTitle("Adicionar Horário");
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity()) {
            post(route("admin.configuracoes.horario.update"), {
                onSuccess: (page) => {
                    SweetAlert.success({
                        title: page.props.title,
                    }).then(() => {
                        handleClose();
                    });
                },
                onError: (errors) => {
                    errors.error && SweetAlert.error({ title: errors.error });
                },
            });
        } else {
            e.stopPropagation();
        }

        setValidated(true);
    };

    const handleDelete = (id_horario) => {
        SweetAlert.confirm({
            title: "Deseja realmente excluir o horário?",
            text: "Essa ação excluirá os agendamentos vinculados!",
            confirmButton: "Sim, excluir",
            cancelButton: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                setDataDelete("id", id_horario);
            } else {
                resetDelete();
            }
        });
    };

    return dias_semana && dias_semana.length > 0 ? (
        <>
            <Row className="g-3">
                <Col xs={12} className="mt-4">
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleShow();
                        }}
                    >
                        <i className="bi bi-plus-lg"></i>
                        Adicionar horário
                    </Button>
                </Col>

                <Col xs={12}>
                    <Accordion>
                        {dias_semana.map((dia, index) => (
                            <Accordion.Item eventKey={dia.id} key={index}>
                                <Accordion.Header>
                                    {dia.descricao}
                                </Accordion.Header>

                                <Accordion.Body>
                                    {horarios_nutricionista[dia.id] ? (
                                        tableHorarios(
                                            horarios_nutricionista[dia.id],
                                            handleShow,
                                            handleDelete
                                        )
                                    ) : (
                                        <p className="bg-warning-subtle text-center py-3 mb-0">
                                            Nenhum horário cadastrado.
                                        </p>
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </Col>
            </Row>

            <FormModal
                show={showModal}
                title={title}
                validated={validated}
                processing={processing}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
            >
                <Row className="g-3">
                    <Col xs={12}>
                        <FormSelect
                            id={"dia_semana_id"}
                            label={"Dia da Semana"}
                            bold={true}
                            options={dias_semana}
                            value={data.dia_semana_id ?? ""}
                            required={true}
                            isInvalid={validated && errors.dia_semana_id}
                            onChange={(e) =>
                                setData("dia_semana_id", e.target.value)
                            }
                            textError={
                                errors.dia_semana_id ??
                                "Informe o dia da semana"
                            }
                        />
                    </Col>

                    <Col xs={12} lg={6}>
                        <FormHours
                            id={"hora_inicio"}
                            label={"Hora de Início"}
                            bold={true}
                            value={data.hora_inicio ?? ""}
                            required={true}
                            isInvalid={validated && errors.hora_inicio}
                            onChange={(e) =>
                                setData("hora_inicio", e.target.value)
                            }
                            textError={
                                errors.hora_inicio ?? "Informe a hora de início"
                            }
                        />
                    </Col>

                    <Col xs={12} lg={6}>
                        <FormHours
                            id={"hora_fim"}
                            label={"Hora de Fim"}
                            bold={true}
                            value={data.hora_fim ?? ""}
                            required={true}
                            isInvalid={validated && errors.hora_fim}
                            onChange={(e) =>
                                setData("hora_fim", e.target.value)
                            }
                            textError={
                                errors.hora_fim ?? "Informe a hora de fim"
                            }
                        />
                    </Col>
                </Row>
            </FormModal>
        </>
    ) : (
        <Row>
            <Col xs={12}>
                <p className="bg-warning-subtle text-center py-3 mb-0">
                    Nenhum dia da semana cadastrado.
                </p>
            </Col>
        </Row>
    );
};

export default Horarios;
