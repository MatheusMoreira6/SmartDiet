import { Row, Col, Button, Form, Alert, Table, Spinner } from "react-bootstrap";
import { ModalCadastroDieta } from "./ModalCadastroDieta";
import { useState } from "react";
import "../../../../css/tableDieta.css";
import { useEffect } from "react";
import Api from "@/Api";

const DietContainer = ({ dietas, id_paciente, id_nutricionista }) => {
    const [show, setShow] = useState(false);
    const [dietasDynamic, setDietas] = useState(dietas);
    const [diasSemana, setDias] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setDias(dietasDynamic);
    }, [dietas]);

    useEffect(() => {
        const fn = async () => {
            setLoading(true);
            const response = await Api.get(route("dias.horarios"));

            setDias(response.data.dias);
            setHorarios(response.data.horarios);
            setLoading(false);
        };

        fn();
    }, []);

    return (
        <>
            {dietasDynamic.length > 0 ? (
                <>
                    <Table bordered responsive className="diet-table mt-3">
                        {loading ? (
                            <>
                                <Spinner
                                    animation="border"
                                    role="status"
                                    variant="primary"
                                />
                            </>
                        ) : (
                            <>
                                <thead>
                                    <tr>
                                        <th className="time-header">
                                            Horários
                                        </th>
                                        {diasSemana.map((dia, index) => (
                                            <th
                                                key={index}
                                                className="day-header"
                                            >
                                                {dia.dia}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {horarios.map((horario, hIndex) => (
                                        <tr key={hIndex}>
                                            <td className="time-cell">
                                                {horario.horario}
                                            </td>
                                            {diasSemana.map((dia, dIndex) => (
                                                <td
                                                    key={dIndex}
                                                    className="meal-cell"
                                                >
                                                    {dietas[dia]?.[horario] ||
                                                        "Sem refeição"}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </>
                        )}
                    </Table>
                </>
            ) : (
                <>
                    <Row className="g-3 mb-3" md={6}>
                        <Col md={6}>
                            <Button variant="primary" onClick={handleShow}>
                                <i className="bi bi-plus-lg"></i>
                                Cadastrar dieta
                            </Button>
                        </Col>
                    </Row>
                    <Row className="g-3 mb-3">
                        <Col>Nenhuma dieta cadastrada</Col>
                    </Row>
                </>
            )}

            <ModalCadastroDieta
                visible={show}
                handleClose={handleClose}
                setDietas={setDietas}
                id_paciente={id_paciente}
                id_nutricionista={id_nutricionista}
            />
        </>
    );
};

export default DietContainer;
