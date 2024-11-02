import SweetAlert from "@/Components/SweetAlert";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { Alert, Button, Col, Form, Modal } from "react-bootstrap";

export const ModalCadastroDieta = ({
    visible,
    setShow,
    setDietas,
    id_paciente,
    id_nutricionista,
}) => {
    const { data, setData, post, reset, errors } = useForm({
        nome: "",
        descricao: "",
        horarios: [{ horario: "" }],
        grupos_dias: [{ grupo_dia: "" }],
    });
    const [validate, setvalidate] = useState(false);

    const handleClose = () => {
        setShow(false);
        setvalidate(false);
        setData("horarios", [{ horario: "" }]);
        setData("grupos_dias", [{ grupo_dia: "" }]);
        reset();
    };

    const handleSubmit = (e) => {
        data.id_paciente = id_paciente;
        data.id_nutricionista = id_nutricionista;
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity()) {
            post(route("dietas.salvar"), {
                onSuccess: (response) => {
                    handleClose();
                    const novasDietas = response.props.dietas;
                    setvalidate(true);
                    setDietas(novasDietas);
                    reset();
                },
                onError: (error) => {
                    setvalidate(false);

                    errors
                        ? {}
                        : SweetAlert.error({
                              title: "Ocorreu um erro, verifique se adicionou os itens corretamente",
                          });
                },
            });
        }
    };

    const addHorario = () => {
        setData("horarios", [...data.horarios, { horario: "" }]);
    };

    const removeHorario = (index) => {
        const newHorarios = [...data.horarios];

        newHorarios.splice(index, 1);

        setData("horarios", newHorarios);
    };

    const addGrupoDia = () => {
        setData("grupos_dias", [...data.grupos_dias, { grupo_dia: "" }]);
    };

    const removeGrupoDia = (index) => {
        const newGrupos = [...data.grupos_dias];

        newGrupos.splice(index, 1);

        setData("grupos_dias", newGrupos);
    };

    return (
        <Modal
            show={visible}
            onHide={() => {
                handleClose();

                reset();
            }}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Cadastrar Dieta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} validated={validate}>
                    <Form.Group className="mb-3" controlId="nomeDieta">
                        <Form.Label>Nome da Dieta</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome da dieta"
                            value={data.nome}
                            isInvalid={errors.nome}
                            onChange={(e) => setData("nome", e.target.value)}
                        />
                        {errors.nome && (
                            <Form.Control.Feedback type="invalid">
                                <p>Informe um nome válido</p>
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="descricaoDieta">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite uma descrição"
                            value={data.descricao}
                            isInvalid={errors.descricao}
                            onChange={(e) =>
                                setData("descricao", e.target.value)
                            }
                        />
                        {errors.descricao && (
                            <Form.Control.Feedback type="invalid">
                                <p>Informe uma descrição válida</p>
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Horários</Form.Label>
                        {data.horarios.map((item, index) => (
                            <div
                                key={`horario-${index}`}
                                className="d-flex align-items-center mb-2"
                            >
                                <Form.Control
                                    type="time"
                                    value={item.horario}
                                    onChange={(e) => {
                                        const newHorarios = [...data.horarios];
                                        newHorarios[index].horario =
                                            e.target.value;
                                        setData("horarios", newHorarios);
                                    }}
                                    isInvalid={
                                        errors[`horarios.${index}.horario`]
                                    }
                                />
                                <Button
                                    variant="danger"
                                    onClick={() => removeHorario(index)}
                                    className="ms-2"
                                >
                                    Remover
                                </Button>
                                {errors[`horarios.${index}.horario`] && (
                                    <Col>
                                        <Form.Control.Feedback type="invalid">
                                            <p>Informe um horário</p>
                                        </Form.Control.Feedback>
                                    </Col>
                                )}
                            </div>
                        ))}
                        <Button variant="secondary" onClick={addHorario}>
                            <i className="bi bi-plus-lg"></i> Adicionar Horário
                        </Button>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Grupos de Dias</Form.Label>
                        {data.grupos_dias.map((item, index) => (
                            <div
                                key={`grupo-dia-${index}`}
                                className="d-flex align-items-center mb-2"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Digite o grupo de dias (Ex: Seg/Qua)"
                                    value={item.grupo_dia}
                                    onChange={(e) => {
                                        const newGruposDias = [
                                            ...data.grupos_dias,
                                        ];
                                        newGruposDias[index].grupo_dia =
                                            e.target.value;
                                        setData("grupos_dias", newGruposDias);
                                    }}
                                    isInvalid={
                                        errors[`grupos_dias.${index}.grupo_dia`]
                                    }
                                />
                                <Button
                                    variant="danger"
                                    onClick={() => removeGrupoDia(index)}
                                    className="ms-2"
                                >
                                    Remover
                                </Button>
                                {errors[`grupos_dias.${index}.grupo_dia`] && (
                                    <Form.Control.Feedback type="invalid">
                                        <p>Informe um grupo</p>
                                    </Form.Control.Feedback>
                                )}
                            </div>
                        ))}
                        <Button variant="secondary" onClick={addGrupoDia}>
                            <i className="bi bi-plus-lg"></i> Adicionar Grupo de
                            Dias
                        </Button>
                    </Form.Group>

                    <Button type="submit">Cadastrar</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
