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
}) => {
    const [alimentos, setAlimentos] = useState([]);
    const [selectedAlimentos, setSelectedAlimentos] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log(refAlt)

    const handleClose = () => {
        setShow(false);
        setSelectedAlimentos([]);
        setArraySelectedAlimentos([]);
        setRefAlt(null);
    };

    useEffect(() => {
        if (show) {
            const fetchAlimentos = async () => {
                setLoading(true);
                try {
                    const response = await Api.get(route("busca.alimentos"));
                    const newAlimentos = response.data.alimentos;
                    for (const i in newAlimentos) {
                        newAlimentos[i].forEach((element) => {
                            element.tipo_porcao.forEach((porcao, id) => {
                                element.tipo_porcao[porcao.id] = porcao;
                                delete element.tipo_porcao[id];
                            });
                        });
                    }

                    const updatedArraySelectedAlimentos =
                        arraySelectedAlimentos.map((selectedAlimento) => {
                            const tipoAlimento =
                                newAlimentos[selectedAlimento.tipo_alimento] ||
                                [];
                            const matchingAlimento = tipoAlimento.find(
                                (alimento) =>
                                    alimento.id === selectedAlimento.id
                            );

                            if (matchingAlimento) {
                                selectedAlimento.tipo_porcao =
                                    matchingAlimento.tipo_porcao;
                            }

                            return selectedAlimento;
                        });

                    setAlimentos(newAlimentos);

                    setSelectedAlimentos(updatedArraySelectedAlimentos);
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

    const handlePorcaoId = (alimentoId, porcao_id) => {
        setSelectedAlimentos((prevSelected) => {
            const alreadySelected = prevSelected.some(
                (item) => item.id === alimentoId
            );

            if (alreadySelected) {
                return prevSelected.map((item) => {
                    if (item.id === alimentoId) {
                        const updatedItem = { ...item };
                        updatedItem.tipo_porcao = item.tipo_porcao[porcao_id];

                        console.log(updatedItem, "update");
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
            if (!item.tipo_porcao || item.tipo_porcao[key] !== undefined)
                return true;
        });
        if (missingPorcao) {
            SweetAlert.warning({
                title: "Porções faltando!",
                text: "Certifique-se de selecionar uma porção para todos os alimentos.",
            });
            return;
        }
        try {
            const response = await Api.post(route("salvar.refeicao"), {
                alimentos: selectedAlimentos,
                dia: selectedDia,
                horario: selectedHorario,
                dieta_id: dieta_id,
                ref_id: refAlt ?? null
            });
            onUpdateRefeicao(response.data.refeicoes);
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
