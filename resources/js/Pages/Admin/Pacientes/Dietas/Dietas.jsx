import { Row, Col, Button, Table, Spinner, Card } from "react-bootstrap";
import { ModalCadastroDieta } from "./ModalCadastroDieta";
import { useState, useEffect } from "react";
import Api from "@/Api";
import "../../../../../css/tableDieta.css";
import { router } from "@inertiajs/react";
import ModalEditDia from "./ModalEditDia";
import { ModalCadastroGrupo } from "./ModalCadastroGrupo";
import SweetAlert from "@/Components/SweetAlert";
import { Pie } from "react-chartjs-2";

const DietContainer = ({ dietas, id_paciente, id_nutricionista }) => {
    const [show, setShow] = useState(false);
    const [addGrupo, setAddGrupo] = useState(false);

    const [dietasDynamic, setDietas] = useState(dietas);
    const [diasSemana, setDias] = useState([]);
    const [horarios, setHorarios] = useState([]);

    const [selectedDia, setSelectedDia] = useState({});
    const [update, setUpdate] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleShow = () => setShow(true);
    useEffect(() => {
        setDietas(dietas);
    }, [dietas]);

    useEffect(() => {
        if (dietasDynamic.length > 0) {
            fetchDiasHorarios();
        }
    }, [dietasDynamic]);

    const fetchDiasHorarios = async () => {
        const response = await Api.get(
            route("dias.horarios", { id: dietas[0].id })
        );

        setDias(response.data.dias);
        setHorarios(response.data.horarios);
    };

    useEffect(() => {
        const fn = async () => {
            const response = await Api.get(
                route("busca.dieta", { id: id_paciente })
            );
            setDietas(response.data.dietas);
        };

        fn();
    }, [update]);

    const handleEditDia = ({ grupo_dia }) => {
        setSelectedDia(grupo_dia);
        setShowEditModal(true);
    };

    async function handleDelete({ dieta_id, dia_id }) {
        try {
            const result = await SweetAlert.confirm({
                title: "Você tem certeza?",
                text: "Essa ação irá remover a dieta permanentemente.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sim, remover!",
                cancelButtonText: "Cancelar",
            });

            if (result.isConfirmed) {
                const response = await Api.post(route("delete.grupo"), {
                    dieta_id,
                    dia_id,
                    id_paciente,
                    id_nutricionista,
                });
                console.log(response);
                setDietas(response.data.dietas);
                SweetAlert.success({
                    title: "Dieta removida com sucesso!",
                });
            }
        } catch (error) {
            SweetAlert.error({
                title: "Erro ao remover dieta!",
            });
        }
    }

    const getChartData = (dia) => {
        console.log;
        const refeicoesDias = dietasDynamic[0].refeicoes.filter(
            (refeicao) => refeicao.dia_semana_id === dia
        );

        let totalCarboidratos = 0;
        let totalProteinas = 0;
        let totalGorduras = 0;

        refeicoesDias.forEach((refeicao) => {
            console.log(refeicao.alimentos);
            refeicao.alimentos.forEach((alimento) => {
                totalCarboidratos += parseFloat(
                    alimento.tipo_porcao[0].carboidratos
                );
                totalProteinas += parseFloat(alimento.tipo_porcao[0].proteinas);
                totalGorduras += parseFloat(alimento.tipo_porcao[0].gorduras);
            });
        });

        return {
            labels: ["Carboidratos", "Proteínas", "Gorduras"],
            datasets: [
                {
                    data: [
                        totalCarboidratos.toFixed(1),
                        totalProteinas.toFixed(1),
                        totalGorduras.toFixed(1),
                    ],
                    backgroundColor: ["#e36e6e", "#FFCE56", "#FFA726"],
                    hoverBackgroundColor: ["#e36e6e ", "#FFCE56", "#FFA726"],
                },
            ],
        };
    };

    return (
        <Row>
            {dietasDynamic.length > 0 ? (
                <>
                    <Col md={12} style={{ marginBottom: 15 }}>
                        <div className="d-grid gap-2 d-md-block">
                            <Button
                                variant="primary"
                                onClick={() => setAddGrupo(true)}
                            >
                                <i className="bi bi-plus-lg"></i>
                                Cadastrar grupo
                            </Button>
                        </div>
                    </Col>
                    {diasSemana.map((dia) => (
                        <Card key={dia.id} className="mb-2 card-hover">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <strong>{dia.nome_grupo}</strong>
                                        <Button
                                            variant="link"
                                            onClick={(e) => {
                                                handleEditDia({
                                                    grupo_dia: dia,
                                                });
                                            }}
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </Button>
                                    </Col>
                                    <Col className="text-end">
                                        <div className="d-grid gap-2 d-md-block">
                                            <Button
                                                variant="outline-primary"
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                                onClick={() => {
                                                    router.visit(
                                                        route(
                                                            "admin.refeicoes",
                                                            {
                                                                dieta_id:
                                                                    dietasDynamic[0]
                                                                        .id,
                                                                dia_id: dia.id,
                                                            }
                                                        )
                                                    );
                                                }}
                                            >
                                                <span>Ver Dieta </span>
                                                <i className="bi bi-arrow-right-circle"></i>
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() =>
                                                    handleDelete({
                                                        dieta_id:
                                                            dietasDynamic[0].id,
                                                        dia_id: dia.id,
                                                    })
                                                }
                                            >
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))}

                    <div style={{ margin: "5%", marginTop: 0 }}>
                        <h2 className="text-center mt-4 mb-3">Gráficos:</h2>
                        <Row className="mt-4">
                            {diasSemana.map((dia, index) => (
                                <Col key={`${dia.id}-${dia.nome_grupo}`} md={3}>
                                    <h5>
                                        Distribuição de Nutrientes -{" "}
                                        {dia.nome_grupo}
                                    </h5>
                                    <div
                                        style={{
                                            width: 300,
                                            height: 300,
                                        }}
                                    >
                                        <Pie data={getChartData(dia.id)} />
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    <ModalCadastroGrupo
                        visible={addGrupo}
                        setShow={setAddGrupo}
                        setDietas={setDietas}
                        id_paciente={id_paciente}
                        id_nutricionista={id_nutricionista}
                        dieta_id={dietasDynamic[0].id}
                        ordem={diasSemana.length}
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

            <ModalEditDia
                show={showEditModal}
                handleClose={() => {
                    setSelectedDia({});
                    setShowEditModal(false);
                }}
                grupo_dia={selectedDia}
                setUpdate={setUpdate}
            />
        </Row>
    );
};

export default DietContainer;
