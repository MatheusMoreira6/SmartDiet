import { usePage } from "@inertiajs/react";
import YearCollapse from "./YearCollapse";
import { Accordion, Col, Row } from "react-bootstrap";

const Pendentes = ({ handleUpdate }) => {
    const { exames_pendente } = usePage().props;

    return (
        <Row className="g-3 mb-3">
            <Col xs={12} className="mt-4">
                {exames_pendente && exames_pendente.length > 0 ? (
                    <Accordion>
                        {exames_pendente.map((ano_exames) => (
                            <YearCollapse
                                key={ano_exames.ano}
                                ano_exames={ano_exames}
                                data_resultado={false}
                                handleUpdate={handleUpdate}
                            />
                        ))}
                    </Accordion>
                ) : (
                    <p className="bg-warning-subtle text-center py-3 mb-0">
                        Nenhum exame pendente.
                    </p>
                )}
            </Col>
        </Row>
    );
};

export default Pendentes;
