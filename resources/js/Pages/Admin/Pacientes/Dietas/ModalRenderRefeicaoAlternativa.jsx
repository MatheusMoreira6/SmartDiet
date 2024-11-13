import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";

const ModalRenderRefeicaoAlternativa = ({ show, handleClose, refeicao, handleEdit }) => {
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
                                    {alimento.porcao.nome_porcao || "Porção não especificada"}
                                    {"  | "}
                                    {alimento.porcao.calorias.toFixed(1) || "Porção não especificada"}
                                    {"Kcal"}
                                </span>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleEdit}>
                    <i className="bi bi-pencil"></i> Editar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRenderRefeicaoAlternativa;
