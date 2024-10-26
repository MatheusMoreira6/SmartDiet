import { useForm } from "@inertiajs/react";
import { Alert, Button, Form, Modal } from "react-bootstrap";

export const ModalCadastroDieta = ({
    visible,
    handleClose,
    setDietas,
    id_paciente,
    id_nutricionista,
}) => {
    const { data, setData, post, reset, errors } = useForm({
        nome: "",
        descricao: "",
    });

    const handleSubmit = (e) => {
        data.id_paciente = id_paciente;
        data.id_nutricionista = id_nutricionista;
        e.preventDefault();

        post(route("dietas.salvar"), {
            onSuccess: (response) => {
                const novasDietas = response.props.dietas;
                reset();
                setDietas(novasDietas);
                handleClose();
            },
            onError: (error) => {
                SweetAlert.error({ title: "Ocorreu um erro" });
            },
        });
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
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="nomeDieta">
                        <Form.Label>Nome da Dieta</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome da dieta"
                            value={data.nome}
                            onChange={(e) => setData("nome", e.target.value)}
                        />
                        {errors.nome && (
                            <Alert variant="danger">{errors.nome}</Alert>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="descricaoDieta">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite uma descrição"
                            value={data.descricao}
                            onChange={(e) =>
                                setData("descricao", e.target.value)
                            }
                        />
                        {errors.descricao && (
                            <Alert variant="danger">{errors.descricao}</Alert>
                        )}
                    </Form.Group>

                    <Button type="submit">Cadastrar</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
