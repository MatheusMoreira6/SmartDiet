import { Row, Col, Button, Form, Alert } from "react-bootstrap";
import { ModalCadastroDieta } from "./ModalCadastroDieta";
import { useState } from "react";

const DietContainer = ({ dietas }) => {
    const [show, setShow] = useState(false);
    const [dietasDynamic, setDietas] = useState(dietas);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const columns = [
        { name: "Nome", selector: (row) => row.nome, sortable: true },
        { name: "Descrição", selector: (row) => row.descricao, sortable: true },
        { name: "Calorias", selector: (row) => row.calorias, sortable: true },
    ];

    return (
        <>
            <Row className="g-3 mb-3">
                <Col md={4}>
                    <Button type="submit" onClick={handleShow}>
                        <i className="bi bi-plus-lg"></i> Cadastrar Dieta
                    </Button>
                </Col>
            </Row>

            {dietas.length === 0 ? (
                <Row className="g-3 mb-3">
                    <Col md={4}>Nenhuma Dieta</Col>
                </Row>
            ) : (
                <>
                    <Row className="g-3 mb-3">
                        <Col md={4}>
                            <h3>Dietas</h3>
                        </Col>
                    </Row>
                    {dietas.map((dieta) => (
                        <Row className="g-3 mb-3" key={dieta.id}>
                            <Col md={4}>
                                <div>{dieta.nome}</div>
                            </Col>
                        </Row>
                    ))}
                </>
            )}
            <ModalCadastroDieta
                visible={show}
                handleClose={handleClose}
                setDietas={setDietas}
            />
        </>
    );
};

export default DietContainer;
