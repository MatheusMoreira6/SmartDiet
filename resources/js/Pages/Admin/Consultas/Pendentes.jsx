import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import FormModal from "@/Components/FormModal";
import FormSelect from "@/Components/FormSelect";
import SweetAlert from "@/Components/SweetAlert";
import { Button, Col, Form, InputGroup, Row, Table } from "react-bootstrap";

const Pendentes = () => {
    const { consultas, pacientes, dias_semana } = usePage().props;

    /**
     * Modal de cadastro de consulta
     */
    const {
        data: dataCadastro,
        setData: setDataCadastro,
        post: postCadastro,
        processing: processingCadastro,
        errors: errorsCadastro,
        reset: resetCadastro,
    } = useForm({
        paciente_id: "",
        dia_semana_id: "",
        data: "",
        hora: "",
    });

    const [datasAtendimento, setDatasAtendimento] = useState([]);
    const [horariosAtendimento, setHorariosAtendimento] = useState([]);

    useEffect(() => {
        setDatasAtendimento([]);
        setHorariosAtendimento([]);

        if (dataCadastro.dia_semana_id) {
            setDataCadastro({
                paciente_id: dataCadastro.paciente_id,
                dia_semana_id: dataCadastro.dia_semana_id,
                data: "",
                hora: "",
            });

            axios
                .get(
                    route("admin.consultas.data-atendimento", {
                        id: dataCadastro.dia_semana_id,
                    })
                )
                .then((response) => {
                    const { datas_atendimento } = response.data;

                    setDatasAtendimento(datas_atendimento);
                })
                .catch((error) => {
                    let mensagem = "Erro ao buscar as datas de atendimento!";

                    if (error.id) {
                        mensagem = error.id;
                    }

                    SweetAlert.error({
                        title: mensagem,
                    });
                });
        }
    }, [dataCadastro.dia_semana_id]);

    useEffect(() => {
        setHorariosAtendimento([]);

        if (dataCadastro.data) {
            setDataCadastro({
                paciente_id: dataCadastro.paciente_id,
                dia_semana_id: dataCadastro.dia_semana_id,
                data: dataCadastro.data,
                hora: "",
            });

            axios
                .get(
                    route("admin.consultas.horario-atendimento", {
                        date: dataCadastro.data,
                    })
                )
                .then((response) => {
                    const { horarios_atendimento } = response.data;

                    setHorariosAtendimento(horarios_atendimento);
                })
                .catch((error) => {
                    let mensagem = "Erro ao buscar os horários de atendimento!";

                    if (error.id) {
                        mensagem = error.id;
                    }

                    SweetAlert.error({
                        title: mensagem,
                    });
                });
        }
    }, [dataCadastro.data]);

    const [showModalCadastro, setShowModalCadastro] = useState(false);
    const [validatedCadastro, setValidatedCadastro] = useState(false);

    const handleShowCadastro = () => setShowModalCadastro(true);

    const handleCloseCadastro = () => {
        setShowModalCadastro(false);
        setValidatedCadastro(false);
        resetCadastro();
    };

    const handleSubmitCadastro = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity()) {
            postCadastro(route("admin.consultas.store"), {
                onSuccess: (page) => {
                    SweetAlert.success({
                        title: page.props.title,
                    }).then(() => {
                        handleCloseCadastro();
                    });
                },
                onError: (errors) => {
                    SweetAlert.error({
                        title: errors.error,
                    });
                },
            });
        } else {
            e.stopPropagation();
        }

        setValidatedCadastro(true);
    };

    /**
     * Modal de finalização de consulta
     */
    const {
        data: dataFinalizar,
        setData: setDataFinalizar,
        post: postFinalizar,
        processing: processingFinalizar,
        errors: errorsFinalizar,
        reset: resetFinalizar,
    } = useForm({
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

    const [showModalFinalizar, setShowModalFinalizar] = useState(false);
    const [validatedFinalizar, setValidatedFinalizar] = useState(false);

    useEffect(() => {
        setShowModalFinalizar(dataFinalizar.id ? true : false);
    }, [dataFinalizar.id]);

    const handleCloseFinalizar = () => {
        setShowModalFinalizar(false);
        setValidatedFinalizar(false);
        resetFinalizar();
    };

    const handleFinalizar = (id_consulta) => {
        axios
            .get(route("admin.consultas.show", { id: id_consulta }))
            .then((response) => {
                const { consulta } = response.data;

                setDataFinalizar({
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

    const handleSubmitFinalizar = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity()) {
            postFinalizar(route("admin.consultas.update"), {
                onSuccess: (page) => {
                    SweetAlert.success({
                        title: page.props.title,
                    }).then(() => {
                        handleCloseFinalizar();
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

        setValidatedFinalizar(true);
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
                    <div className="d-grid gap-2 d-md-block">
                        <Button
                            variant="primary"
                            onClick={() => handleShowCadastro()}
                        >
                            <i className="bi bi-plus-lg"></i>
                            Agendar Consulta
                        </Button>
                    </div>
                </Col>

                <Col xs={12}>
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
                            {consultas.length > 0 ? (
                                consultas.map((consulta) => (
                                    <tr key={consulta.id}>
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
                                                title="Finalizar consulta"
                                                onClick={() =>
                                                    handleFinalizar(consulta.id)
                                                }
                                            >
                                                <i className="bi bi-clipboard2-check"></i>
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
                                        Nenhuma consulta encontrada!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <FormModal
                show={showModalCadastro}
                title={"Cadastrar Consulta"}
                validated={validatedCadastro}
                processing={processingCadastro}
                handleClose={handleCloseCadastro}
                handleSubmit={handleSubmitCadastro}
            >
                <Row className="g-3">
                    <Col xs={12}>
                        <FormSelect
                            id="paciente_id"
                            label={"Paciente"}
                            bold={true}
                            options={pacientes}
                            value={dataCadastro.paciente_id}
                            required={true}
                            isInvalid={
                                validatedCadastro && errorsCadastro.paciente_id
                            }
                            onChange={(e) =>
                                setDataCadastro("paciente_id", e.target.value)
                            }
                            textError={
                                errorsCadastro.paciente_id ??
                                "Selecione um paciente"
                            }
                        />
                    </Col>

                    <Col xs={12}>
                        <FormSelect
                            id="dia_semana_id"
                            label={"Dia da Semana"}
                            bold={true}
                            options={dias_semana}
                            value={dataCadastro.dia_semana_id}
                            required={true}
                            isInvalid={
                                validatedCadastro &&
                                errorsCadastro.dia_semana_id
                            }
                            onChange={(e) =>
                                setDataCadastro("dia_semana_id", e.target.value)
                            }
                            textError={
                                errorsCadastro.dia_semana_id ??
                                "Selecione um dia da semana"
                            }
                        />
                    </Col>

                    <Col xs={12} lg={6}>
                        <FormSelect
                            id={"data"}
                            label={"Data da Consulta"}
                            bold={true}
                            options={datasAtendimento}
                            value={dataCadastro.data}
                            required={true}
                            isInvalid={validatedCadastro && errorsCadastro.data}
                            onChange={(e) =>
                                setDataCadastro("data", e.target.value)
                            }
                            textError={errorsCadastro.data ?? "Informe a data"}
                        />
                    </Col>

                    <Col xs={12} lg={6}>
                        <FormSelect
                            id={"hora"}
                            label={"Hora da Consulta"}
                            bold={true}
                            options={horariosAtendimento}
                            value={dataCadastro.hora}
                            required={true}
                            isInvalid={validatedCadastro && errorsCadastro.hora}
                            onChange={(e) =>
                                setDataCadastro("hora", e.target.value)
                            }
                            textError={errorsCadastro.hora ?? "Informe a hora"}
                        />
                    </Col>
                </Row>
            </FormModal>

            <FormModal
                show={showModalFinalizar}
                title={"Finalizar Consulta"}
                validated={validatedFinalizar}
                processing={processingFinalizar}
                handleClose={handleCloseFinalizar}
                handleSubmit={handleSubmitFinalizar}
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
                                value={dataFinalizar.peso || ""}
                                isInvalid={
                                    validatedFinalizar && errorsFinalizar.peso
                                }
                                onChange={(e) => {
                                    setDataFinalizar("peso", e.target.value);
                                }}
                            />

                            <InputGroup.Text>Kg</InputGroup.Text>

                            <Form.Control.Feedback type="invalid">
                                {errorsFinalizar.peso}
                            </Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Altura</InputGroup.Text>

                            <Form.Control
                                type={"text"}
                                value={dataFinalizar.altura || ""}
                                isInvalid={
                                    validatedFinalizar && errorsFinalizar.altura
                                }
                                onChange={(e) => {
                                    setDataFinalizar("altura", e.target.value);
                                }}
                            />

                            <InputGroup.Text>cm</InputGroup.Text>

                            <Form.Control.Feedback type="invalid">
                                {errorsFinalizar.altura}
                            </Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>IMC</InputGroup.Text>

                            <Form.Control
                                type={"text"}
                                value={dataFinalizar.imc || ""}
                                isInvalid={
                                    validatedFinalizar && errorsFinalizar.imc
                                }
                                onChange={(e) => {
                                    setDataFinalizar("imc", e.target.value);
                                }}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errorsFinalizar.imc}
                            </Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                Circunferência Cintura
                            </InputGroup.Text>

                            <Form.Control
                                type={"text"}
                                value={
                                    dataFinalizar.circunferencia_cintura || ""
                                }
                                isInvalid={
                                    validatedFinalizar &&
                                    errorsFinalizar.circunferencia_cintura
                                }
                                onChange={(e) => {
                                    setDataFinalizar(
                                        "circunferencia_cintura",
                                        e.target.value
                                    );
                                }}
                            />

                            <InputGroup.Text>cm</InputGroup.Text>

                            <Form.Control.Feedback type="invalid">
                                {errorsFinalizar.circunferencia_cintura}
                            </Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                Circunferência Quadril
                            </InputGroup.Text>

                            <Form.Control
                                type={"text"}
                                value={
                                    dataFinalizar.circunferencia_quadril || ""
                                }
                                isInvalid={
                                    validatedFinalizar &&
                                    errorsFinalizar.circunferencia_quadril
                                }
                                onChange={(e) => {
                                    setDataFinalizar(
                                        "circunferencia_quadril",
                                        e.target.value
                                    );
                                }}
                            />

                            <InputGroup.Text>cm</InputGroup.Text>

                            <Form.Control.Feedback type="invalid">
                                {errorsFinalizar.circunferencia_quadril}
                            </Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                Circunferência Pescoço
                            </InputGroup.Text>

                            <Form.Control
                                type={"text"}
                                value={
                                    dataFinalizar.circunferencia_pescoco || ""
                                }
                                isInvalid={
                                    validatedFinalizar &&
                                    errorsFinalizar.circunferencia_pescoco
                                }
                                onChange={(e) => {
                                    setDataFinalizar(
                                        "circunferencia_pescoco",
                                        e.target.value
                                    );
                                }}
                            />

                            <InputGroup.Text>cm</InputGroup.Text>

                            <Form.Control.Feedback type="invalid">
                                {errorsFinalizar.circunferencia_pescoco}
                            </Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                Percentual de Gordura
                            </InputGroup.Text>

                            <Form.Control
                                type={"text"}
                                value={dataFinalizar.percentual_gordura || ""}
                                isInvalid={
                                    validatedFinalizar &&
                                    errorsFinalizar.percentual_gordura
                                }
                                onChange={(e) => {
                                    setDataFinalizar(
                                        "percentual_gordura",
                                        e.target.value
                                    );
                                }}
                            />

                            <InputGroup.Text>%</InputGroup.Text>

                            <Form.Control.Feedback type="invalid">
                                {errorsFinalizar.percentual_gordura}
                            </Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Massa Muscular</InputGroup.Text>

                            <Form.Control
                                type={"text"}
                                value={dataFinalizar.massa_muscular || ""}
                                isInvalid={
                                    validatedFinalizar &&
                                    errorsFinalizar.massa_muscular
                                }
                                onChange={(e) => {
                                    setDataFinalizar(
                                        "massa_muscular",
                                        e.target.value
                                    );
                                }}
                            />

                            <InputGroup.Text>%</InputGroup.Text>

                            <Form.Control.Feedback type="invalid">
                                {errorsFinalizar.massa_muscular}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                </Row>
            </FormModal>
        </>
    );
};

export default Pendentes;
