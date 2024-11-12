import Api from "@/Api";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, ListGroup, Spinner } from "react-bootstrap";
import RenderAlimentos from "./RenderAlimentos";
import SweetAlert from "@/Components/SweetAlert";

const ModalCadastroRefeicao = ({
    show,
    setShow,
    selectedDia,
    selectedHorario,
    onUpdateRefeicao,
    dieta_id,
    arraySelectedAlimentos,
    setArraySelectedAlimentos,
    refAlt,
    setRefAlt,
    refeicaoSelected,
    setRefeicaoSelected,
}) => {
    const [alimentos, setAlimentos] = useState([]);
    const [selectedAlimentos, setSelectedAlimentos] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setShow(false);
        setSelectedAlimentos([]);
        setArraySelectedAlimentos([]);
        setRefAlt(null);
        setRefeicaoSelected(0);
    };

    useEffect(() => {
        if (show) {
            const fetchAlimentos = async () => {
                setLoading(true);
                try {
                    const response = await Api.get(route("busca.alimentos"));
                    const newAlimentos = response.data.alimentos;

                    setAlimentos(newAlimentos);

                    setSelectedAlimentos(arraySelectedAlimentos);
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

    const handlePorcaoId = (alimentoId, porcao) => {
        console.log(alimentoId, porcao);
        setSelectedAlimentos((prevSelected) => {
            const alreadySelected = prevSelected.some(
                (item) => item.id === alimentoId
            );

            if (!parseFloat(porcao)) {
                SweetAlert.warning({
                    title: "Insira um numero!",
                });

                return prevSelected;
            }

            if (alreadySelected) {
                return prevSelected.map((item) => {
                    if (item.id === alimentoId) {
                        const updatedItem = { ...item };
                        updatedItem.gramas = parseFloat(porcao);

                        return updatedItem;
                    }
                    return item;
                });
            } else {
                SweetAlert.warning({
                    title: "Selecione o alimento primeiro!",
                });

                return prevSelected;
            }
        });
    };

    async function handleSave() {
        const missingPorcao = selectedAlimentos.some((item) => {
            const key = Object.keys(item.tipo_porcao);
            if (!item.tipo_porcao || !item.gramas) return true;
        });
        if (missingPorcao) {
            SweetAlert.warning({
                title: "Porções faltando!",
                text: "Certifique-se de declarar uma porção para todos os alimentos.",
            });
            return;
        }
        try {
            if (refeicaoSelected && refeicaoSelected != 0) {
                const response = await Api.post(route("editar.refeicao"), {
                    id: refeicaoSelected,
                    alimentos: selectedAlimentos,
                    dia: selectedDia,
                    horario: selectedHorario,
                    dieta_id: dieta_id,
                    ref_id: refAlt ?? null,
                });
                onUpdateRefeicao(response.data.refeicoes);
            } else {
                const response = await Api.post(route("salvar.refeicao"), {
                    alimentos: selectedAlimentos,
                    dia: selectedDia,
                    horario: selectedHorario,
                    dieta_id: dieta_id,
                    ref_id: refAlt ?? null,
                });
                onUpdateRefeicao(response.data.refeicoes);
            }
            handleClose();
        } catch (error) {
            console.error("Erro ao salvar alimentos na refeição:", error);
        }
    }

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton onClick={handleClose}>
                <Modal.Title>Adicionar Alimentos à Refeição</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <Spinner animation="border" role="status" />
                ) : (
                    <RenderAlimentos
                        handlePorcaoId={handlePorcaoId}
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
