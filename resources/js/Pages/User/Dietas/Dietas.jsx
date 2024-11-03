import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import { Table, Button, Modal, Accordion } from "react-bootstrap";
import { useState } from "react";
import "../../../../css/tableDieta.css";

const Dietas = ({ dieta, horarios, dias }) => {
    const [showAltModal, setShowAltModal] = useState(false);
    const [altRefeicao, setAltRefeicao] = useState(null);
    const handleOpenAltModal = (refeicao) => {
        console.log(refeicao);
        setAltRefeicao(refeicao);
        setShowAltModal(true);
    };

    const handleCloseAltModal = () => {
        setAltRefeicao(null);
        setShowAltModal(false);
    };

    return (
        <UserLayout>
            <Head title="Dietas" />
            <h3 className="text-center mt-4 mb-3">{dieta.nome_dieta}</h3>
            <div style={{ margin: "5%", marginTop: 0 }}>
                <Accordion defaultActiveKey="0" style={{ width: "100%" }}>
                    {dias.map((dia, index) => (
                        <Accordion.Item
                            eventKey={index.toString()}
                            key={dia.id}
                        >
                            <Accordion.Header>
                                {dia.nome_grupo}
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
                                            <th className="day-header">Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {horarios.map((horario) => {
                                            const refeicoesHorario =
                                                dieta.refeicoes.filter(
                                                    (refeicao) =>
                                                        refeicao.horario_id ===
                                                            horario.id &&
                                                        refeicao.dia_semana_id ===
                                                            dia.id
                                                );

                                            return (
                                                <tr key={horario.id}>
                                                    <td className="time-cell">
                                                        {horario.horario}
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
                                                                {refeicoesHorario[0].alimentos.reduce(
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
                                                                )}
                                                            </td>
                                                            <td className="meal-cell-itens">
                                                                {refeicoesHorario[0].alimentos.reduce(
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
                                                                ).toFixed(1)}
                                                            </td>
                                                            <td className="meal-cell-itens">
                                                                {refeicoesHorario[0].alimentos.reduce(
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
                                                                ).toFixed(1)}
                                                            </td>
                                                            <td className="meal-cell-itens">
                                                                {refeicoesHorario[0].alimentos.reduce(
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
                                                                ).toFixed(1)}
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
                                                                        Ver Ref.
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
                                                                Sem refeição
                                                                cadastrada
                                                            </span>
                                                        </td>
                                                    )}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>

            <Modal show={showAltModal} onHide={handleCloseAltModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Refeição Alternativa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {altRefeicao ? (
                        <div>
                            <h5>Alimentos:</h5>
                            <ul>
                                {altRefeicao.alimentos.map((alimento) => (
                                    <li key={alimento.id}>
                                        <strong>{alimento.nome}</strong> -{" "}
                                        {alimento.tipo_porcao.find(
                                                    (porcao) =>
                                                        porcao?.id ===
                                                        alimento.pivot.porcao_id
                                                )?.nome_porcao ||
                                                    "Porção não especificada"}
                                        <ul>
                                            <li>
                                                Calorias:{" "}
                                                {alimento.tipo_porcao.find(
                                                    (porcao) =>
                                                        porcao?.id ===
                                                        alimento.pivot.porcao_id
                                                )?.calorias ||
                                                    "Porção não especificada"}
                                            </li>
                                            <li>
                                                Carboidratos:{" "}
                                                {alimento.tipo_porcao.find(
                                                    (porcao) =>
                                                        porcao?.id ===
                                                        alimento.pivot.porcao_id
                                                )?.carboidratos ||
                                                    "Porção não especificada"}
                                            </li>
                                            <li>
                                                Proteínas:{" "}
                                                {alimento.tipo_porcao.find(
                                                    (porcao) =>
                                                        porcao?.id ===
                                                        alimento.pivot.porcao_id
                                                )?.proteinas ||
                                                    "Porção não especificada"}
                                            </li>
                                            <li>
                                                Gorduras:{" "}
                                                {alimento.tipo_porcao.find(
                                                    (porcao) =>
                                                        porcao?.id ===
                                                        alimento.pivot.porcao_id
                                                )?.gorduras ||
                                                    "Porção não especificada"}
                                            </li>
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>Sem informações de refeição alternativa.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAltModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </UserLayout>
    );
};

export default Dietas;
