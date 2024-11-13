import { Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import DietContainer from "./DietasContainer";
import { useState } from "react";
import { useEffect } from "react";
import { ModalCadastroDieta } from "./ModalCadastroDieta";

const Dietas = ({ dietas = [], id_paciente, id_nutricionista }) => {
    const [DietasDynaminc, setDietasDynamic] = useState(dietas);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    useEffect(() => {
        setDietasDynamic(dietas);
    }, [dietas]);

    return (
        <>
            <Row className="g-3">
                <Col xs={12} className="mt-4">
                    <div className="d-grid gap-2 d-md-block">
                        <Button variant="primary" onClick={handleShow}>
                            <i className="bi bi-plus-lg"></i>
                            Cadastrar dieta
                        </Button>
                    </div>
                </Col>
                {dietas.length == 0 && (
                    <Col xs={12}>
                        <p className="bg-warning-subtle text-center py-3 mb-0">
                            Nenhuma dieta cadastrada.
                        </p>
                    </Col>
                )}
                {DietasDynaminc.length > 0 && (
                    <>
                        <Tabs id="ditas-tabs">
                            {DietasDynaminc.map((dieta) => {
                                return (
                                    <Tab
                                        eventKey={`${dieta.nome_dieta}${dieta.id}`}
                                        title={`${dieta.nome_dieta}`}
                                    >
                                        <DietContainer
                                            dieta={dieta}
                                            id_paciente={id_paciente}
                                            id_nutricionista={id_nutricionista}
                                            setDietas={setDietasDynamic}
                                        />
                                    </Tab>
                                );
                            })}
                        </Tabs>
                    </>
                )}
            </Row>

            <ModalCadastroDieta
                visible={show}
                setShow={setShow}
                setDietas={setDietasDynamic}
                id_paciente={id_paciente}
                id_nutricionista={id_nutricionista}
            />
        </>
    );
};

export default Dietas;
