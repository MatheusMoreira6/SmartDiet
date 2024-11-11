import axios from "axios";
import { useEffect, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import WrapperContainer from "@/Components/WrapperContainer";
import PageTopic from "@/Components/PageTopic";
import SweetAlert from "@/Components/SweetAlert";
import FormModal from "@/Components/FormModal";
import FormSelect from "@/Components/FormSelect";
import { Button, Col, Row, Table } from "react-bootstrap";

const Consultas = ({ consultas, dias_semana }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        dia_semana_id: "",
        data: "",
        hora: "",
    });

    const [datasAtendimento, setDatasAtendimento] = useState([]);
    const [horariosAtendimento, setHorariosAtendimento] = useState([]);

    useEffect(() => {
        setDatasAtendimento([]);
        setHorariosAtendimento([]);

        if (data.dia_semana_id) {
            setData({
                dia_semana_id: data.dia_semana_id,
                data: "",
                hora: "",
            });

            axios
                .get(
                    route("user.consultas.data-atendimento", {
                        id: data.dia_semana_id,
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
    }, [data.dia_semana_id]);

    useEffect(() => {
        setHorariosAtendimento([]);

        if (data.data) {
            setData({
                dia_semana_id: data.dia_semana_id,
                data: data.data,
                hora: "",
            });

            axios
                .get(
                    route("user.consultas.horario-atendimento", {
                        date: data.data,
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
    }, [data.data]);

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
            post(route("user.consultas.store"), {
                onSuccess: (page) => {
                    SweetAlert.success({
                        title: page.props.title,
                    }).then(() => {
                        handleClose();
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
            postDelete(route("user.consultas.delete"), {
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
        <UserLayout>
            <Head title="Consultas" />

            <WrapperContainer>
                <PageTopic>
                    <i className="bi bi-calendar3"></i>
                    Consultas
                </PageTopic>

                <Row className="g-3">
                    <Col xs={12}>
                        <div className="d-grid gap-2 d-md-block">
                            <Button
                                variant="primary"
                                onClick={() => handleShow()}
                            >
                                <i className="bi bi-plus-lg"></i>
                                Agendar Consulta
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
                                    <th>Nutricionista</th>
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
                                            <td>{consulta.nutricionista}</td>

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
                                                    variant="danger"
                                                    title="Excluir consulta"
                                                    onClick={() =>
                                                        handleDelete(
                                                            consulta.id
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
                                        <td colSpan="5" className="text-center">
                                            Nenhuma consulta agendada!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <FormModal
                    show={showModal}
                    title={"Cadastrar Consulta"}
                    validated={validated}
                    processing={processing}
                    handleClose={handleClose}
                    handleSubmit={handleSubmit}
                >
                    <Row className="g-3">
                        <Col xs={12}>
                            <FormSelect
                                id="dia_semana_id"
                                label={"Dia da Semana"}
                                bold={true}
                                options={dias_semana}
                                value={data.dia_semana_id}
                                required={true}
                                isInvalid={validated && errors.dia_semana_id}
                                onChange={(e) =>
                                    setData("dia_semana_id", e.target.value)
                                }
                                textError={
                                    errors.dia_semana_id ??
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
                                value={data.data}
                                required={true}
                                isInvalid={validated && errors.data}
                                onChange={(e) =>
                                    setData("data", e.target.value)
                                }
                                textError={errors.data ?? "Informe a data"}
                            />
                        </Col>

                        <Col xs={12} lg={6}>
                            <FormSelect
                                id={"hora"}
                                label={"Hora da Consulta"}
                                bold={true}
                                options={horariosAtendimento}
                                value={data.hora}
                                required={true}
                                isInvalid={validated && errors.hora}
                                onChange={(e) =>
                                    setData("hora", e.target.value)
                                }
                                textError={errors.hora ?? "Informe a hora"}
                            />
                        </Col>
                    </Row>
                </FormModal>
            </WrapperContainer>
        </UserLayout>
    );
};

export default Consultas;
