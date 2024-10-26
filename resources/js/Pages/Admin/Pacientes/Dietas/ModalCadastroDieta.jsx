import SweetAlert from "@/Components/SweetAlert";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";

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
    });
    const [validate, setvalidate] = useState(false);

    const handleClose = () => {
        setShow(false);
        setvalidate(false);
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
                    console.log(response)
                    handleClose();
                    const novasDietas = response.props.dietas;
                    setvalidate(true);
                    setDietas(novasDietas);
                    reset();
                },
                onError: (error) => {
                    setvalidate(false);
                    errors.nome || error.descricao
                        ? reset()
                        : SweetAlert.error({ title: "Ocorreu um erro" });
                },
            });
        }
    };

    return (
        <Modal
            show={visible}
            onHide={() => {
                handleClose();
                reset();
            }}
            handleClose={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton handleClose={handleClose}>
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

                    <Button type="submit">Cadastrar</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
