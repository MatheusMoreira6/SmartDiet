import {
    Row,
    Col,
    Button,
    Card,
    Alert,
    ButtonGroup,
    Accordion,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Api from "@/Api";
import "../../../../../css/tableDieta.css";
import { router } from "@inertiajs/react";
import ModalEditDia from "./ModalEditDia";
import { ModalCadastroGrupo } from "./ModalCadastroGrupo";
import SweetAlert from "@/Components/SweetAlert";
import { Pie } from "@/Components/ChartJS";
import TableRefeicoes from "./TableRefeicoes";
import DietaPDF from "./DietaPDF";
import { pdf } from "@react-pdf/renderer";

const DietContainer = ({ dieta, id_paciente, id_nutricionista, setDietas }) => {
    const [addGrupo, setAddGrupo] = useState(false);
    const [dietaDynamic, setDietaDynamic] = useState(dieta);
    const [diasSemana, setDias] = useState([]);
    const [horarios, setHorarios] = useState([]);

    const [selectedDia, setSelectedDia] = useState({});
    const [update, setUpdate] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        setDietaDynamic(dieta);
    }, [dieta]);

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

    const handleDownload = async (dieta) => {
        const blob = await pdf(
            <DietaPDF
                dieta={dieta}
                diasSemana={diasSemana}
                horarios={horarios}
            />
        ).toBlob();
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "Dietas.pdf";
        link.click();

        URL.revokeObjectURL(url);
    };

    return (
        <Row className="g-3">
            <Col xs={12}>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Text>
                            Descrição da Dieta:
                            {dietaDynamic.descricao ||
                                "Nenhuma descrição fornecida."}
                        </Card.Text>
                        <Card.Text>
                            <small className="text-muted">
                                Criado em:{" "}
                                {new Date(
                                    dietaDynamic.created_at
                                ).toLocaleDateString()}
                            </small>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>

            <Col xs={12}>
                {dietaDynamic.ativa ? (
                    <Alert variant={"success"}>
                        <i className="bi bi-patch-check"></i> Essa dieta está
                        ativa!
                    </Alert>
                ) : (
                    <Alert variant={"warning"}>
                        <i className="bi bi-exclamation-triangle"></i> Essa
                        dieta está desativada!
                    </Alert>
                )}
            </Col>

            <Row className="my-3">
                <Col>
                    <div className="d-grid gap-2 d-md-block">
                        <ButtonGroup>
                            <Button
                                variant="primary"
                                onClick={() => setAddGrupo(true)}
                            >
                                <i className="bi bi-plus-lg"></i> Cadastrar
                                grupo
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => handleDownload(dieta)}
                            >
                                <i className="bi bi-printer"></i> Imprimir
                            </Button>
                            {!dietaDynamic.ativa ? (
                                <Button
                                    variant="success"
                                    onClick={() => updateStatus(true)}
                                >
                                    <i className="bi bi-patch-check"></i> Ativar
                                    dieta
                                </Button>
                            ) : (
                                <Button
                                    variant="danger"
                                    onClick={() => updateStatus(false)}
                                >
                                    <i className="bi bi-x-circle"></i> Desativar
                                    dieta
                                </Button>
                            )}
                        </ButtonGroup>
                    </div>
                </Col>
            </Row>

            <Col xs={12}>
                <Accordion defaultActiveKey="0">
                    {diasSemana.map((dia, index) => (
                        <Accordion.Item eventKey={index} key={dia.id}>
                            <Accordion.Header>
                                {dia.nome_grupo}
                                <ButtonGroup>
                                    <Button
                                        variant="link"
                                        className="p-0 ms-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEditDia({
                                                grupo_dia: dia,
                                            });
                                        }}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </Button>
                                    <Button
                                        variant="link"
                                        className="p-0"
                                        style={{ color: "red" }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete({
                                                dieta_id: dietaDynamic.id,
                                                dia_id: dia.id,
                                            });
                                        }}
                                    >
                                        <i className="bi-trash"></i>
                                    </Button>
                                </ButtonGroup>
                            </Accordion.Header>
                            <Accordion.Body>
                                <TableRefeicoes
                                    dia_id={dia.id}
                                    dieta_id={dieta.id}
                                    refeicoes={dieta.refeicoes}
                                />
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Col>

            {dietaDynamic.refeicoes.length > 0 && (
                <div style={{ margin: "5%", marginTop: 0 }}>
                    <h2 className="text-center mt-4 mb-3">Gráficos:</h2>
                    <Row className="mt-4">
                        {diasSemana.map((dia, index) => {
                            const refReturn = dietaDynamic.refeicoes.filter(
                                (refeicao) => refeicao.dia_semana_id === dia.id
                            );
                            if (refReturn.length === 0) return;

                            return (
                                <Col
                                    key={`${dia.id}-${dia.nome_grupo}`}
                                    xs={12}
                                    lg={4}
                                >
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
                            );
                        })}
                    </Row>
                </div>
            )}

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
