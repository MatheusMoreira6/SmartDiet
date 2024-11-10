import { usePage } from "@inertiajs/react";
import YearCollapse from "./YearCollapse";
import { Accordion, Col, Row } from "react-bootstrap";

const Concluidos = ({ handleUpdate }) => {
    const { exames_concluido } = usePage().props;

    return (
        <Row className="g-3 mb-3">
            <Col xs={12} className="mt-4">
                {exames_concluido && exames_concluido.length > 0 ? (
                    <Accordion>
                        {exames_concluido.map((ano_exames) => (
                            <YearCollapse
                                key={ano_exames.ano}
                                ano_exames={ano_exames}
                                data_resultado={true}
                                handleUpdate={handleUpdate}
                            />
                        ))}
                    </Accordion>
                ) : (
                    <p className="bg-warning-subtle text-center py-3 mb-0">
                        Nenhum exame concluído.
                    </p>
                )}
            </Col>
        </Row>
    );
};

export default Concluidos;
