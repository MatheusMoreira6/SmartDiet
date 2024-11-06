import axios from "axios";
import { useEffect, useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import FormModal from "@/Components/FormModal";
import FormInput from "@/Components/FormInput";
import LinkPrimary from "@/Components/LinkPrimary";
import SweetAlert from "@/Components/SweetAlert";
import { Button, Col, Form, Row, Table } from "react-bootstrap";

const Exames = () => {
    const { exames } = usePage().props;

    const [showModal, setShowModal] = useState(false);
    const [validated, setValidated] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        id: "",
        nome: "",
        unidade_medida: "",
        valor_referencia: "",
    });

    const {
        data: dataDelete,
        setData: setDataDelete,
        post: postDelete,
        reset: resetDelete,
    } = useForm({
        id: null,
    });

    useEffect(() => {
        setShowModal(data.id ? true : false);

        if (dataDelete.id) {
            postDelete(route("admin.configuracoes.exames.delete"), {
                onSuccess: (page) => {
                    SweetAlert.success({
                        title: page.props.title,
                    });
                },
                onError: (errorsDelete) => {
                    SweetAlert.error({
                        title: errorsDelete.error ?? "Erro ao excluir o exame",
                    });
                },
                onFinish: () => {
                    resetDelete();
                },
            });
        }
    }, [data.id, dataDelete.id]);

    const handleShow = (exame_id = null) => {
        if (exame_id) {
            axios
                .get(route("admin.configuracoes.exames.show", { id: exame_id }))
                .then((response) => {
                    const { exame } = response.data;

                    setData({
                        id: exame.id,
                        nome: exame.nome,
                        unidade_medida: exame.unidade_medida,
                        valor_referencia: exame.valor_referencia,
                    });
                })
                .catch((error) => {
                    SweetAlert.error({
                        title: error.id ?? "Erro ao buscar o exame",
                    });
                });
        } else {
            reset();
            setShowModal(true);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setValidated(false);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity()) {
            post(route("admin.configuracoes.exames.update"), {
                preserveScroll: true,
                onSuccess: (page) => {
                    SweetAlert.success({
                        title: page.props.title,
                    }).then(() => {
                        handleClose();
                    });
                },
                onError: (errors) => {
                    let mensagem = "Erro ao salvar o exame";

                    if (errors.id) {
                        mensagem = errors.id;
                    } else if (errors.error) {
                        mensagem = errors.error;
                    }

                    SweetAlert.error({
                        title: mensagem,
                    });
                },
            });
        } else {
            e.stopPropagation();
        }

        setValidated(true);
    };

    const handleDelete = (exame_id) => {
        SweetAlert.confirm({
            title: "Deseja realmente excluir o exame?",
            text: "Essa ação excluirá os itens dos pedidos de exame!",
            confirmButton: "Sim, excluir",
            cancelButton: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                setDataDelete("id", exame_id);
            } else {
                resetDelete();
            }
        });
    };

    const handleImport = () => {
        SweetAlert.confirm({
            title: "Deseja realmente importar os exames padrão?",
            text: "Essa ação importará os exames padrão do sistema!",
            confirmButton: "Sim, importar",
            cancelButton: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post(route("admin.configuracoes.exames.import"))
                    .then((response) => {
                        SweetAlert.success({
                            title: response.data.title,
                        }).then(() => {
                            router.reload();
                        });
                    })
                    .catch((error) => {
                        SweetAlert.error({
                            title: error.id ?? "Erro ao importar os exames",
                        });
                    });
            }
        });
    };

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="g-3">
                    <Col xs={12} className="mt-4">
                        <div className="d-grid gap-2 d-md-block">
                            <Button
                                variant="primary"
                                onClick={() => {
                                    handleShow();
                                }}
                            >
                                <i className="bi bi-plus-lg"></i>
                                Adicionar Exame
                            </Button>

                            <Button
                                variant="primary"
                                onClick={() => {
                                    handleImport();
                                }}
                            >
                                <i className="bi bi-cloud-arrow-down-fill"></i>
                                Importar Exames Padrão
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
                                    <th>Nome do Exame</th>
                                    <th>Unidade de Medida</th>
                                    <th>Valores de Referência</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {exames && exames.length > 0 ? (
                                    exames.map((exame) => (
                                        <tr key={exame.id}>
                                            <td>{exame.nome}</td>
                                            <td>{exame.unidade_medida}</td>
                                            <td>{exame.valor_referencia}</td>

                                            <td className="text-center d-grid gap-2 d-md-block">
                                                <Button
                                                    variant="primary"
                                                    onClick={() =>
                                                        handleShow(exame.id)
                                                    }
                                                >
                                                    <i className="bi bi-pencil-square"></i>
                                                </Button>

                                                <Button
                                                    variant="danger"
                                                    onClick={() =>
                                                        handleDelete(exame.id)
                                                    }
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            Nenhum exame cadastrado
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>

                    <Col xs={12}>
                        <div className="d-grid gap-2 d-md-block">
                            <LinkPrimary href={route("admin.home")}>
                                <i className="bi bi-arrow-return-left"></i>
                                Voltar
                            </LinkPrimary>
                        </div>
                    </Col>
                </Row>
            </Form>

            <FormModal
                show={showModal}
                title={"Editar Pedido de Exame"}
                validated={validated}
                processing={processing}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
            >
                <Row className="g-3">
                    <Col xs={12}>
                        <FormInput
                            id={"nome"}
                            label={"Nome do Exame"}
                            type={"text"}
                            bold={true}
                            value={data.nome ?? ""}
                            required={true}
                            isInvalid={validated && errors.nome}
                            onChange={(e) => setData("nome", e.target.value)}
                            textError={errors.nome ?? "Informe o nome do exame"}
                        />
                    </Col>

                    <Col xs={12} lg={6}>
                        <FormInput
                            id={"unidade_medida"}
                            label={"Unidade de Medida"}
                            type={"text"}
                            bold={true}
                            value={data.unidade_medida ?? ""}
                            required={true}
                            isInvalid={validated && errors.unidade_medida}
                            onChange={(e) =>
                                setData("unidade_medida", e.target.value)
                            }
                            textError={
                                errors.unidade_medida ??
                                "Informe a unidade de medida"
                            }
                        />
                    </Col>

                    <Col xs={12} lg={6}>
                        <FormInput
                            id={"valor_referencia"}
                            label={"Valores de Referência"}
                            type={"text"}
                            bold={true}
                            value={data.valor_referencia ?? ""}
                            required={false}
                            isInvalid={validated && errors.valor_referencia}
                            onChange={(e) =>
                                setData("valor_referencia", e.target.value)
                            }
                            textError={
                                errors.valor_referencia ??
                                "Informe os valores de referência"
                            }
                        />
                    </Col>
                </Row>
            </FormModal>
        </>
    );
};

export default Exames;
