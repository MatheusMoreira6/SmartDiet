import Api from "../../../Api";
import { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";

export const ModalCadastroDieta = ({ visible, handleClose, setDietas }) => {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [calorias, setCalorias] = useState("");
    const [errors, setErrors] = useState({});
    const [refeicoes, setRefeicoes] = useState([]);

    useEffect(() => {
        const fn = async () => {
            const result = await Api.get(route("admin.refeicoes"));
            console.log(result);
        };

        fn();
    }, []);

    return (
        <Modal
            show={visible}
            onHide={handleClose}
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
                <Form onSubmit={() => {}}>
                    <Form.Group className="mb-3" controlId="nomeDieta">
                        <Form.Label>Nome da Dieta</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome da dieta"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
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
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                        {errors.descricao && (
                            <Alert variant="danger">{errors.descricao}</Alert>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="caloriasDieta">
                        <Form.Label>Calorias</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Digite as calorias"
                            value={calorias}
                            onChange={(e) => setCalorias(e.target.value)}
                        />
                        {errors.calorias && (
                            <Alert variant="danger">{errors.calorias}</Alert>
                        )}
                    </Form.Group>

                    <Button type="submit">Cadastrar</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
