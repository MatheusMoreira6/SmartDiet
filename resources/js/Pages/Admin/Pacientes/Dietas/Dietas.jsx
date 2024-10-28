import { Row, Col, Button, Table, Spinner } from "react-bootstrap";
import { ModalCadastroDieta } from "./ModalCadastroDieta";
import { useState, useEffect } from "react";
import Api from "@/Api";
import ModalCadastroRefeicao from "./ModalCadastroRefeicao";
import "../../../../../css/tableDieta.css";

const DietContainer = ({ dietas, id_paciente, id_nutricionista }) => {
    const [show, setShow] = useState(false);
    const [visibleRef, setVisibleRef] = useState(false);
    const [dietasDynamic, setDietas] = useState(dietas);
    const [diasSemana, setDias] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedHorario, setSelectedHorario] = useState("");
    const [selectedDia, setSelectedDia] = useState("");
    const [update, setUpdate] = useState(false);
    const [arraySelectedAlimentos, setArraySelectedAlimentos] = useState([]);

    const handleShow = () => setShow(true);

    useEffect(() => {
        setDietas(dietas);
    }, [dietas]);

    useEffect(() => {
        const fetchDiasHorarios = async () => {
            setLoading(true);
            const response = await Api.get(route("dias.horarios"));

            setDias(response.data.dias);
            setHorarios(response.data.horarios);
            setLoading(false);
        };

        fetchDiasHorarios();
    }, []);

    useEffect(() => {
        const fn = async () => {
            const response = await Api.get(
                route("busca.dieta", { id: id_paciente })
            );
            console.log(response.data);
            setDietas(response.data.dietas);
        };

        fn();
    }, [update]);

    const onUpdateRefeicao = () => setUpdate(!update);

    const renderMeals = (horarioId) => {
        return diasSemana.map((dia) => {
            const refeicao = dietasDynamic
                .flatMap((dieta) => dieta.refeicoes)
                .find(
                    (ref) =>
                        ref.dia_semana_id === dia.id &&
                        ref.horario_id === horarioId
                );

            const alimentos = refeicao ? refeicao.alimentos : [];

            return (
                <td
                    key={dia.id}
                    className="meal-cell"
                    onClick={() => {
                        setArraySelectedAlimentos(alimentos);
                        setVisibleRef(true);
                        setSelectedDia(dia.id);
                        setSelectedHorario(horarioId);
                    }}
                >
                    {alimentos.length > 0
                        ? alimentos.map((alimento) => (
                              <div key={alimento.id}>{alimento.nome}</div>
                          ))
                        : "Sem refeição"}
                </td>
            );
        });
    };

    return (
        <>
            {dietasDynamic.length > 0 ? (
                <>
                    <Table bordered responsive className="diet-table mt-3">
                        {loading ? (
                            <Spinner
                                animation="border"
                                role="status"
                                variant="primary"
                            />
                        ) : (
                            <>
                                <thead>
                                    <tr>
                                        <th className="time-header">
                                            Horários
                                        </th>
                                        {diasSemana.map((dia) => (
                                            <th
                                                key={dia.id}
                                                className="day-header"
                                            >
                                                {dia.dia}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {horarios.map((horario) => (
                                        <tr key={horario.id}>
                                            <td className="time-cell">
                                                {horario.horario}
                                            </td>
                                            {renderMeals(horario.id)}
                                        </tr>
                                    ))}
                                </tbody>
                            </>
                        )}
                    </Table>

                    <ModalCadastroRefeicao
                        show={visibleRef}
                        setShow={setVisibleRef}
                        selectedDia={selectedDia}
                        selectedHorario={selectedHorario}
                        dieta_id={dietasDynamic[0].id}
                        onUpdateRefeicao={onUpdateRefeicao}
                        arraySelectedAlimentos={arraySelectedAlimentos}
                    />
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
                setShow={setShow}
                setDietas={setDietas}
                id_paciente={id_paciente}
                id_nutricionista={id_nutricionista}
            />
        </>
    );
};

export default DietContainer;
