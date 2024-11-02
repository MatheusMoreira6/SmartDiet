import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import Api from "@/Api";
import SweetAlert from "@/Components/SweetAlert";

const ModalEditDia = ({ grupo_dia, show, handleClose, setUpdate }) => {
    const { data, setData, post, reset, errors } = useForm({
        nome: "",
    });
    const [error, setError] = useState("");
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        setData("nome", grupo_dia.nome_grupo);
    }, [grupo_dia]);
    const handleSave = async (e) => {
        e.preventDefault();

        if (data.nome === "") {
            setError("Por favor, insira um nome válido para o grupo ou dia.");
            return;
        }
        setError("");
        setValidated(true);

        const response = await Api.post(
            route("grupo_dia.editar", {
                grupo_dia: grupo_dia.id,
                newNome: data.nome,
            })
        );

        if (response.data.message == "Nome do grupo atualizado com sucesso!") {
            setUpdate((prevState) => !prevState);
            handleClose();
        } else {
            SweetAlert.error({
                title: "Ocorreu um erro ao editar grupo",
            });
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar dia</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSave}>
                    <Form.Group controlId="novoGrupoOuDia">
                        <Form.Label>Novo grupo ou dia</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o novo grupo ou dia"
                            value={data.nome}
                            onChange={(e) => setData("nome", e.target.value)}
                            isInvalid={!!error} // Define isInvalid se houver erro
                        />
                        <Form.Control.Feedback type="invalid">
                            {error} {/* Exibe a mensagem de erro */}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit" onClick={handleSave}>
                    <i className="bi bi-save"></i> Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEditDia;
