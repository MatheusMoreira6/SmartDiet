import { Row, Col, Button, Card, Alert } from "react-bootstrap";
import { ModalCadastroDieta } from "./ModalCadastroDieta";
import { useState, useEffect } from "react";
import Api from "@/Api";
import "../../../../../css/tableDieta.css";
import { router } from "@inertiajs/react";
import ModalEditDia from "./ModalEditDia";
import { ModalCadastroGrupo } from "./ModalCadastroGrupo";
import SweetAlert from "@/Components/SweetAlert";
import { Pie } from "@/Components/ChartJS";

const DietContainer = ({ dieta, id_paciente, id_nutricionista, setDietas }) => {
    const [addGrupo, setAddGrupo] = useState(false);
    const [dietaDynamic, setDietaDynamic] = useState(dieta);
    const [diasSemana, setDias] = useState([]);
    const [horarios, setHorarios] = useState([]);

    const [selectedDia, setSelectedDia] = useState({});
    const [update, setUpdate] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        setDietaDynamic(dieta)
    }, [dieta])

    useEffect(() => {
        if (dietaDynamic) {
            fetchDiasHorarios();
        }
    }, [dietaDynamic]);

    const fetchDiasHorarios = async () => {
        const response = await Api.get(
            route("dias.horarios", { id: dieta.id })
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
        const refeicoesDias = dietaDynamic.refeicoes.filter(
            (refeicao) => refeicao.dia_semana_id === dia
        );

        let totalCarboidratos = 0;
        let totalProteinas = 0;
        let totalGorduras = 0;

        refeicoesDias.forEach((refeicao) => {
            refeicao.alimentos.forEach((alimento) => {
                totalCarboidratos += parseFloat(alimento.porcao.carboidratos);
                totalProteinas += parseFloat(alimento.porcao.proteinas);
                totalGorduras += parseFloat(alimento.porcao.gorduras);
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

    const updateStatus = async (status) => {
        SweetAlert.confirm({
            title: "Deseja realmente alterar o status da dieta?",
            confirmButton: "Sim, allterar",
            cancelButton: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await Api.post(route("edita.status.dieta"), {
                        dieta_id: dieta.id,
                        status: status,
                    });

                    setUpdate((prevState) => !prevState);
                    SweetAlert.success({
                        title: "Status da dieta atualizada com sucesso!",
                    });
                } catch (error) {
                    SweetAlert.error({
                        title: "Erro ao atualizar status da dieta!",
                    });
                }
            }
        });
    };

    return (
        <Row className="g-3">
            {dietaDynamic.ativa ? (
                <Alert variant={"success"}>
                    <i className="bi bi-patch-check"></i> Essa dieta está ativa!
                </Alert>
            ) : (
                <Alert variant={"warning"}>
                    <i className="bi bi-exclamation-triangle"></i> Essa dieta
                    está desativada!
                </Alert>
            )}
            <Col md={12}>
                {!dietaDynamic.ativa ? (
                    <Button
                        variant={"primary"}
                        onClick={() => updateStatus(true)}
                    >
                        <i className="bi bi-patch-check"></i> Ativar dieta!
                    </Button>
                ) : (
                    <Button
                        variant={"danger"}
                        onClick={() => updateStatus(false)}
                    >
                        <i className="bi bi-x-circle"></i> Desativar dieta!
                    </Button>
                )}
            </Col>
            <Col md={12} style={{ marginBottom: 15 }}>
                <div className="d-grid gap-2 d-md-block">
                    <Button variant="primary" onClick={() => setAddGrupo(true)}>
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
                                                route("admin.refeicoes", {
                                                    dieta_id: dietaDynamic.id,
                                                    dia_id: dia.id,
                                                })
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
                                                dieta_id: dietaDynamic.id,
                                                dia_id: dia.id,
                                            })
                                        }
                                    >
                                        <i className="bi-trash"></i>
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
                        <Col key={`${dia.id}-${dia.nome_grupo}`} xs={12} lg={4}>
                            <h5>
                                Distribuição de Nutrientes - {dia.nome_grupo}
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
                dieta_id={dietaDynamic.id}
                ordem={diasSemana.length}
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
