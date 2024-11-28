import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import {
    Table,
    Button,
    Modal,
    Accordion,
    Row,
    Col,
    Tab,
    Tabs,
} from "react-bootstrap";
import { useState } from "react";
import "../../../../css/tableDieta.css";
import { Pie } from "@/Components/ChartJS";
import WrapperContainer from "@/Components/WrapperContainer";
import PageTopic from "@/Components/PageTopic";
import { pdf } from "@react-pdf/renderer";
import DietaPDF from "./DietaPDF";

const Dietas = ({ dietas }) => {
    const [showAltModal, setShowAltModal] = useState(false);
    const [altRefeicao, setAltRefeicao] = useState(null);
    const handleOpenAltModal = (refeicao) => {
        setAltRefeicao(refeicao);
        setShowAltModal(true);
    };

    const handleCloseAltModal = () => {
        setAltRefeicao(null);
        setShowAltModal(false);
    };

    const getChartData = (dia, dieta) => {
        const refeicoesDias = dieta.refeicoes.filter(
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
                    backgroundColor: ["#36A2EB", "#FFCE56", "#FFA726"],
                    hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#FFA726"],
                },
            ],
        };
    };

    const handleDownload = async (dieta) => {
        const blob = await pdf(
            <DietaPDF
                dieta={dieta}
                diasSemana={dieta.dias}
                horarios={dieta.horarios}
            />
        ).toBlob();
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "Dietas.pdf";
        link.click();

        URL.revokeObjectURL(url);
    };

    if (!dietas || dietas.length == 0) {
        return (
            <UserLayout>
                <Head title="Dietas" />
                <WrapperContainer>
                    <PageTopic>
                        <i className="bi bi-list"></i>
                        Dietas
                    </PageTopic>
                    <Table hover striped bordered responsive className="mb-0">
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Nenhuma dieta encontrada!
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </WrapperContainer>
            </UserLayout>
        );
    }

    return (
        <UserLayout>
            <Head title="Dietas" />
            <WrapperContainer>
                <PageTopic>
                    <i className="bi bi-list"></i>
                    Dietas
                </PageTopic>
                {/* <PageTopic>
                    <i className="bi bi-calendar3"></i>
                    {dieta.nome_dieta}
                </PageTopic>
                <h6 className="text-center mt-4 mb-3">
                    Descrição: {dieta.descricao}
                </h6> */}
                <Tabs id="paciente-tabs" defaultActiveKey={1}>
                    {dietas.map((dieta) => {
                        return (
                            <Tab
                                eventKey={`${dieta.nome_dieta}${dieta.id}`}
                                title={`${dieta.nome_dieta}`}
                            >
                                <h3 className="text-center mt-4 mb-3">
                                    Descrição: {dieta.descricao}
                                </h3>

                                <Accordion
                                    defaultActiveKey="0"
                                    style={{ width: "100%" }}
                                >
                                    {dieta.dias.map((dia, index) => (
                                        <Accordion.Item
                                            eventKey={index.toString()}
                                            key={dia.id}
                                        >
                                            <Accordion.Header>
                                                {dia.nome_grupo}
                                                <Button
                                                    variant="link"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDownload(dieta);
                                                    }}
                                                >
                                                    <i className="bi bi-printer"></i>
                                                </Button>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <Table
                                                    bordered
                                                    hover
                                                    responsive
                                                    className="mt-3 diet-table"
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th className="time-header">
                                                                Horário
                                                            </th>
                                                            <th className="day-header">
                                                                Refeição
                                                            </th>
                                                            <th className="day-header">
                                                                Calorias
                                                            </th>
                                                            <th className="day-header">
                                                                Carboidratos
                                                            </th>
                                                            <th className="day-header">
                                                                Proteínas
                                                            </th>
                                                            <th className="day-header">
                                                                Gorduras
                                                            </th>
                                                            <th className="day-header">
                                                                Ação
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {dieta.horarios.map(
                                                            (horario) => {
                                                                if (
                                                                    horario.grupo_id !==
                                                                    dia.id
                                                                )
                                                                    return;
                                                                if (
                                                                    !dieta.refeicoes
                                                                )
                                                                    return;
                                                                const refeicoesHorario =
                                                                    dieta.refeicoes.filter(
                                                                        (
                                                                            refeicao
                                                                        ) =>
                                                                            refeicao.horario_id ===
                                                                                horario.id &&
                                                                            refeicao.dia_semana_id ===
                                                                                dia.id
                                                                    );

                                                                return (
                                                                    <tr
                                                                        key={
                                                                            horario.id
                                                                        }
                                                                    >
                                                                        <td className="time-cell">
                                                                            {
                                                                                horario.horario
                                                                            }
                                                                        </td>
                                                                        {refeicoesHorario.length >
                                                                        0 ? (
                                                                            <>
                                                                                <td className="meal-cell">
                                                                                    <ul className="list-unstyled">
                                                                                        {refeicoesHorario[0].alimentos.map(
                                                                                            (
                                                                                                alimento
                                                                                            ) => (
                                                                                                <li
                                                                                                    key={
                                                                                                        alimento.id
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        alimento.nome
                                                                                                    }{" "}
                                                                                                    -{" "}
                                                                                                    {
                                                                                                        alimento
                                                                                                            .porcao
                                                                                                            .nome_porcao
                                                                                                    }
                                                                                                </li>
                                                                                            )
                                                                                        )}
                                                                                    </ul>
                                                                                </td>
                                                                                <td className="meal-cell-itens">
                                                                                    {refeicoesHorario[0].alimentos
                                                                                        .reduce(
                                                                                            (
                                                                                                acc,
                                                                                                item
                                                                                            ) =>
                                                                                                acc +
                                                                                                parseFloat(
                                                                                                    item
                                                                                                        .porcao
                                                                                                        .calorias
                                                                                                ),
                                                                                            0
                                                                                        )
                                                                                        .toFixed(
                                                                                            1
                                                                                        )}
                                                                                </td>
                                                                                <td className="meal-cell-itens">
                                                                                    {refeicoesHorario[0].alimentos
                                                                                        .reduce(
                                                                                            (
                                                                                                acc,
                                                                                                item
                                                                                            ) =>
                                                                                                acc +
                                                                                                parseFloat(
                                                                                                    item
                                                                                                        .porcao
                                                                                                        .carboidratos
                                                                                                ),
                                                                                            0
                                                                                        )
                                                                                        .toFixed(
                                                                                            1
                                                                                        )}
                                                                                </td>
                                                                                <td className="meal-cell-itens">
                                                                                    {refeicoesHorario[0].alimentos
                                                                                        .reduce(
                                                                                            (
                                                                                                acc,
                                                                                                item
                                                                                            ) =>
                                                                                                acc +
                                                                                                parseFloat(
                                                                                                    item
                                                                                                        .porcao
                                                                                                        .proteinas
                                                                                                ),
                                                                                            0
                                                                                        )
                                                                                        .toFixed(
                                                                                            1
                                                                                        )}
                                                                                </td>
                                                                                <td className="meal-cell-itens">
                                                                                    {refeicoesHorario[0].alimentos
                                                                                        .reduce(
                                                                                            (
                                                                                                acc,
                                                                                                item
                                                                                            ) =>
                                                                                                acc +
                                                                                                parseFloat(
                                                                                                    item
                                                                                                        .porcao
                                                                                                        .gorduras
                                                                                                ),
                                                                                            0
                                                                                        )
                                                                                        .toFixed(
                                                                                            1
                                                                                        )}
                                                                                </td>
                                                                                <td className="meal-cell-itens">
                                                                                    {refeicoesHorario[0]
                                                                                        .refeicao_alternativa ? (
                                                                                        <Button
                                                                                            variant="primary"
                                                                                            size="sm"
                                                                                            onClick={() =>
                                                                                                handleOpenAltModal(
                                                                                                    refeicoesHorario[0]
                                                                                                        .refeicao_alternativa
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            Ver
                                                                                            Ref.
                                                                                            Alternativa
                                                                                        </Button>
                                                                                    ) : (
                                                                                        <span
                                                                                            style={{
                                                                                                color: "#888",
                                                                                                fontStyle:
                                                                                                    "italic",
                                                                                            }}
                                                                                        >
                                                                                            Sem
                                                                                            alternativa
                                                                                        </span>
                                                                                    )}
                                                                                </td>
                                                                            </>
                                                                        ) : (
                                                                            <td colSpan="7">
                                                                                <span
                                                                                    style={{
                                                                                        color: "#888",
                                                                                        fontStyle:
                                                                                            "italic",
                                                                                    }}
                                                                                >
                                                                                    Sem
                                                                                    refeição
                                                                                    cadastrada
                                                                                </span>
                                                                            </td>
                                                                        )}
                                                                    </tr>
                                                                );
                                                            }
                                                        )}
                                                    </tbody>
                                                </Table>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>

                                <h3 className="text-center mt-4 mb-3">
                                    Gráficos:
                                </h3>

                                <Row className="mt-4">
                                    {dieta.dias.map((dia) => (
                                        <Col
                                            key={`${dia.id}-${dia.nome_grupo}`}
                                            xs={12}
                                            sm={6}
                                            className="text-center"
                                        >
                                            <h5>
                                                Distribuição de Nutrientes -{" "}
                                                {dia.nome_grupo}
                                            </h5>

                                            <Pie
                                                data={getChartData(
                                                    dia.id,
                                                    dieta
                                                )}
                                            />
                                        </Col>
                                    ))}
                                </Row>

                                <Modal
                                    show={showAltModal}
                                    onHide={handleCloseAltModal}
                                    centered
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title>
                                            Refeição Alternativa
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {altRefeicao ? (
                                            <div>
                                                <h5>Alimentos:</h5>
                                                <ul>
                                                    {altRefeicao.alimentos.map(
                                                        (alimento) => (
                                                            <li
                                                                key={
                                                                    alimento.id
                                                                }
                                                            >
                                                                <strong>
                                                                    {
                                                                        alimento.nome
                                                                    }
                                                                </strong>{" "}
                                                                -{" "}
                                                                {alimento.porcao
                                                                    .nome_porcao ||
                                                                    "Porção não especificada"}
                                                                <ul>
                                                                    <li>
                                                                        Calorias:{" "}
                                                                        {alimento.porcao.calorias.toFixed(
                                                                            1
                                                                        ) ||
                                                                            "Porção não especificada"}
                                                                    </li>
                                                                    <li>
                                                                        Carboidratos:{" "}
                                                                        {alimento.porcao.carboidratos.toFixed(
                                                                            1
                                                                        ) ||
                                                                            "Porção não especificada"}
                                                                    </li>
                                                                    <li>
                                                                        Proteínas:{" "}
                                                                        {alimento.porcao.proteinas.toFixed(
                                                                            1
                                                                        ) ||
                                                                            "Porção não especificada"}
                                                                    </li>
                                                                    <li>
                                                                        Gorduras:{" "}
                                                                        {alimento.porcao.gorduras.toFixed(
                                                                            1
                                                                        ) ||
                                                                            "Porção não especificada"}
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        ) : (
                                            <p>
                                                Sem informações de refeição
                                                alternativa.
                                            </p>
                                        )}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button
                                            variant="secondary"
                                            onClick={handleCloseAltModal}
                                        >
                                            Fechar
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Tab>
                        );
                    })}
                </Tabs>
            </WrapperContainer>
        </UserLayout>
    );
};

export default Dietas;
