import Api from "@/Api";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, ListGroup, Spinner } from "react-bootstrap";
import RenderAlimentos from "./RenderAlimentos";

const ModalCadastroRefeicao = ({
    show,
    setShow,
    selectedDia,
    selectedHorario,
    onUpdateRefeicao,
    dieta_id,
}) => {
    const [alimentos, setAlimentos] = useState([]);
    const [selectedAlimentos, setSelectedAlimentos] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false);

    useEffect(() => {
        if (show) {
            const fetchAlimentos = async () => {
                setLoading(true);
                try {
                    const response = await Api.get(route("busca.alimentos"));
                    setAlimentos(response.data.alimentos);
                } catch (error) {
                    console.error("Erro ao buscar alimentos:", error);
                }
                setLoading(false);
            };

            fetchAlimentos();
        }
    }, [show]);

    const handleSelectAlimento = (alimentoId) => {
        setSelectedAlimentos((prevSelected) => {
            const alreadySelected = prevSelected.some(
                (item) => item.id === alimentoId
            );

            if (alreadySelected) {
                return prevSelected.filter((item) => item.id !== alimentoId);
            } else {
                const alimento = Object.values(alimentos)
                    .flat()
                    .find((item) => item.id === alimentoId);

                return alimento ? [...prevSelected, alimento] : prevSelected;
            }
        });
    };

    const handleSave = async () => {
        try {
            await Api.post(route("salvar.refeicao"), {
                alimentos: selectedAlimentos.map((alimento) => alimento.id),
                dia: selectedDia,
                horario: selectedHorario,
                dieta_id: dieta_id,
            });
            onUpdateRefeicao();
            handleClose();
        } catch (error) {
            console.error("Erro ao salvar alimentos na refeição:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Adicionar Alimentos à Refeição</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <Spinner animation="border" role="status" />
                ) : (
                    <RenderAlimentos
                        alimentos={alimentos}
                        handleSelectAlimento={handleSelectAlimento}
                        selectedAlimentos={selectedAlimentos}
                    />
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCadastroRefeicao;
