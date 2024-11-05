import axios from "axios";
import { useEffect, useState } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import WrapperContainer from "@/Components/WrapperContainer";
import PageTopic from "@/Components/PageTopic";
import FormModal from "@/Components/FormModal";
import FormInput from "@/Components/FormInput";
import SweetAlert from "@/Components/SweetAlert";
import LinkPrimary from "@/Components/LinkPrimary";
import {
    Button,
    Col,
    Collapse,
    Form,
    InputGroup,
    Row,
    Table,
} from "react-bootstrap";

const YearCollapse = ({ ano_exames, isOpen, toggleCollapse, handleUpdate }) => {
    const { data, setData, post, reset } = useForm({
        id: "",
    });

    useEffect(() => {
        if (data.id) {
            post(route("admin.exames.delete"), {
                onSuccess: (page) => {
                    SweetAlert.success({
                        title: page.props.title,
                        text: page.props.text,
                    }).then(() => {
                        if (page.props.nenhum_exame) {
                            router.visit(route("admin.exames"));
                        }
                    });
                },
                onFinish: () => {
                    reset();
                },
            });
        }
    }, [data.id]);

    const handleDelete = (exame_id) => {
        SweetAlert.confirm({
            title: "Excluir Pedido de Exame",
            text: "Deseja realmente excluir este pedido de exame?",
            confirmButton: "Sim, excluir",
            cancelButton: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                setData("id", exame_id);
            } else {
                reset();
            }
        });
    };

    return (
        <Col xs={12}>
            <Button
                variant="primary"
                aria-expanded={isOpen}
                aria-controls={`table-${ano_exames.ano}`}
                className="w-100 d-flex align-items-center"
                onClick={() => toggleCollapse(ano_exames.ano)}
            >
                <span className="mx-auto">{ano_exames.ano}</span>

                <span>
                    {isOpen ? (
                        <i className="bi bi-arrow-up-square-fill"></i>
                    ) : (
                        <i className="bi bi-arrow-down-square-fill"></i>
                    )}
                </span>
            </Button>

            <Collapse in={isOpen}>
                <div id={`table-${ano_exames.ano}`}>
                    <Table
                        hover
                        striped
                        bordered
                        responsive
                        className="mt-3 mb-0"
                    >
                        <thead>
                            <tr>
                                <th>Nome do Pedido</th>
                                <th>Data do Pedido</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {ano_exames.exames.map((exame) => (
                                <tr key={exame.id}>
                                    <td>{exame.titulo_pedido}</td>

                                    <td className="text-center">
                                        {exame.data_pedido}
                                    </td>

                                    <td className="text-center d-grid gap-2 d-md-block">
                                        <Button
                                            variant="primary"
                                            title="Editar Pedido de Exame"
                                            onClick={() =>
                                                handleUpdate(exame.id)
                                            }
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>

                                        <Button
                                            variant="danger"
                                            title="Excluir Pedido de Exame"
                                            onClick={() =>
                                                handleDelete(exame.id)
                                            }
                                        >
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Collapse>
        </Col>
    );
};

const Editar = ({ paciente, anos_exames, error_visualizacao = "" }) => {
    if (error_visualizacao) {
        SweetAlert.error({
            title: error_visualizacao,
        }).then(() => {
            router.visit(route("admin.exames"));
        });
    }

    const { data, setData, post, processing, reset, errors } = useForm({
        id: "",
        titulo_pedido: "",
        data_pedido: "",
        data_resultado: "",
        itens_pedido_exame: [],
    });

    const [showModal, setShowModal] = useState(false);
    const [validated, setValidated] = useState(false);
    const [requiredData, setRequiredData] = useState(false);

    const handleClose = () => {
        setShowModal(false);
        setValidated(false);
        reset();
    };

    useEffect(() => {
        setShowModal(data.id ? true : false);
    }, [data.id]);

    useEffect(() => {
        setRequiredData(false);

        data.itens_pedido_exame.map((item) => {
            if (item.resultado) {
                setRequiredData(true);
            }
        });
    }, [data.itens_pedido_exame]);

    const handleUpdate = (exame_id) => {
        axios
            .get(route("admin.exames.show", { id: exame_id }))
            .then((response) => {
                const { exame } = response.data;

                setData({
                    id: exame.id,
                    titulo_pedido: exame.titulo_pedido,
                    data_pedido: exame.data_pedido,
                    data_resultado: exame.data_resultado,
                    itens_pedido_exame: exame.itens_pedido_exame,
                });
            })
            .catch((error) => {
                SweetAlert.error({
                    title: error.id ?? "Erro ao carregar pedido de exame",
                });
            });
    };

    const handleChange = (id_item, value) => {
        setData({
            ...data,
            itens_pedido_exame: data.itens_pedido_exame.map((item) =>
                item.id === id_item ? { ...item, resultado: value } : item
            ),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity()) {
            post(route("admin.exames.update"), {
                onSuccess: (page) => {
                    SweetAlert.success({
                        title: page.props.title,
                        text: page.props.text,
                    }).then(() => handleClose());
                },
                onError: (errors) => {
                    if (
                        errors.id ||
                        errors.itens_pedido_exame ||
                        errors.error
                    ) {
                        let errorMessages = "";

                        if (errors.id) {
                            errorMessages = errors.id;
                        } else if (errors.itens_pedido_exame) {
                            errorMessages = errors.itens_pedido_exame;
                        } else {
                            errorMessages = errors.error;
                        }

                        SweetAlert.error({
                            title: errorMessages,
                        });
                    }
                },
            });
        } else {
            e.stopPropagation();
        }

        setValidated(true);
    };

    const [open, setOpen] = useState({});

    const toggleCollapse = (ano) => {
        setOpen((prevState) => ({
            ...prevState,
            [ano]: !prevState[ano],
        }));
    };

    return (
        <AdminLayout>
            <Head title="Exames Paciente" />

            <WrapperContainer>
                <PageTopic>
                    <i className="bi bi-activity"></i>
                    {paciente.nome && paciente.sobrenome
                        ? `${paciente.nome} ${paciente.sobrenome}`
                        : "Paciente não encontrado"}
                </PageTopic>

                <Row className="g-3">
                    {anos_exames && anos_exames.length > 0 ? (
                        anos_exames.map((ano_exames) => (
                            <YearCollapse
                                key={ano_exames.ano}
                                ano_exames={ano_exames}
                                isOpen={open[ano_exames.ano] || false}
                                toggleCollapse={toggleCollapse}
                                handleUpdate={handleUpdate}
                            />
                        ))
                    ) : (
                        <Col xs={12}>
                            <p className="bg-warning-subtle text-center py-3 mb-0">
                                Nenhum exame encontrado.
                            </p>
                        </Col>
                    )}
                </Row>

                <hr />

                <Row>
                    <Col xs={12}>
                        <LinkPrimary href={route("admin.exames")}>
                            <i className="bi bi-arrow-return-left"></i>
                            Voltar
                        </LinkPrimary>
                    </Col>
                </Row>
            </WrapperContainer>

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
                            id={"titulo_pedido"}
                            label={"Título do Pedido"}
                            type={"text"}
                            bold={true}
                            value={data.titulo_pedido ?? ""}
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

                    <Col xs={12} lg={6}>
                        <FormInput
                            id={"data_pedido"}
                            label={"Data do Pedido"}
                            type={"text"}
                            mask={"99/99/9999"}
                            bold={true}
                            value={data.data_pedido ?? ""}
                            placeHolder={"__/__/____"}
                            required={true}
                            isInvalid={validated && errors.data_pedido}
                            onChange={(e) =>
                                setData("data_pedido", e.target.value)
                            }
                            textError={
                                errors.data_pedido ?? "Informe a data do pedido"
                            }
                        />
                    </Col>

                    <Col xs={12} lg={6}>
                        <FormInput
                            id={"data_resultado"}
                            label={"Data do Resultado"}
                            type={"text"}
                            mask={"99/99/9999"}
                            bold={true}
                            value={data.data_resultado ?? ""}
                            placeHolder={"__/__/____"}
                            required={requiredData}
                            isInvalid={validated && errors.data_resultado}
                            onChange={(e) =>
                                setData("data_resultado", e.target.value)
                            }
                            textError={
                                errors.data_resultado ??
                                "Informe a data do resultado"
                            }
                        />
                    </Col>

                    <Col xs={12}>
                        <Form.Label className="fw-semibold">
                            Resultado dos Exames
                        </Form.Label>

                        {data.itens_pedido_exame.length > 0 ? (
                            data.itens_pedido_exame.map((item) => (
                                <InputGroup className="mb-3" key={item.id}>
                                    <InputGroup.Text>
                                        {item.nome ?? ""}
                                    </InputGroup.Text>

                                    <Form.Control
                                        type={"text"}
                                        value={item.resultado ?? ""}
                                        onChange={(e) => {
                                            handleChange(
                                                item.id,
                                                e.target.value
                                            );
                                        }}
                                    />

                                    <InputGroup.Text>
                                        {item.unidade_medida ?? ""}
                                    </InputGroup.Text>

                                    {item.valor_referencia && (
                                        <InputGroup.Text>
                                            {`Valor de Referência: ${item.valor_referencia}`}
                                        </InputGroup.Text>
                                    )}
                                </InputGroup>
                            ))
                        ) : showModal ? (
                            <p className="bg-warning-subtle text-center py-3 mb-0">
                                Nenhum exame encontrado.
                            </p>
                        ) : (
                            <InputGroup className="mb-3">
                                <InputGroup.Text></InputGroup.Text>
                                <Form.Control type={"text"} disabled />
                                <InputGroup.Text></InputGroup.Text>
                            </InputGroup>
                        )}
                    </Col>
                </Row>
            </FormModal>
        </AdminLayout>
    );
};

export default Editar;
