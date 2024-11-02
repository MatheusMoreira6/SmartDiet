import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";

const ModalRenderRefeicaoAlternativa = ({ show, handleClose, refeicao }) => {
    console.log(refeicao);
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Detalhes da Refeição</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Refeição: {refeicao?.nome}</h5>
                <ListGroup>
                    {refeicao?.map((alimento) => (
                        <ListGroup.Item key={alimento.id}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span>{alimento.nome}</span>
                                <span>
                                    {alimento.tipo_porcao.find(
                                        (porcao) =>
                                            porcao.id ===
                                            alimento.pivot.porcao_id
                                    )?.nome_porcao || "Porção não especificada"}
                                    {"  | "}
                                    {alimento.tipo_porcao.find(
                                        (porcao) =>
                                            porcao.id ===
                                            alimento.pivot.porcao_id
                                    )?.calorias || "Porção não especificada"}
                                    {"Kcal"}
                                </span>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRenderRefeicaoAlternativa;
