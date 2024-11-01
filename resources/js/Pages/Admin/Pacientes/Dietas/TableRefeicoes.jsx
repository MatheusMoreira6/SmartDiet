import { Container, Spinner, Table, Badge } from "react-bootstrap";
import "../../../../../css/tableDieta.css";
import ModalCadastroRefeicao from "./ModalCadastroRefeicao";
import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

export default function TableRefeicoes({
    refeicoes,
    horarios,
    dieta_id,
    dia_id,
}) {
    const [dynamincRef, setDynamicRef] = useState(refeicoes);
    const [visibleRef, setVisibleRef] = useState(false);
    const [selectedHorario, setSelectedHorario] = useState("");
    const [arraySelectedAlimentos, setArraySelectedAlimentos] = useState([]);

    const handleOpenModal = (horario) => {
        const refeicaoSelected = dynamincRef.filter(
            (ref) => ref.horario_id === horario.id
        );
        if (refeicaoSelected.length > 0) {
            console.log(refeicaoSelected);
            setArraySelectedAlimentos(refeicaoSelected[0].alimentos);
        }
        setSelectedHorario(horario.id);
        setVisibleRef(true);
    };

    console.log(dynamincRef);

    return (
        <AdminLayout>
            <Head title="Cadastro de Refeições" />
            <Container>
                <h3 className="text-center mt-4 mb-3">
                    Horários e Refeições da Dieta
                </h3>
                <Table bordered hover responsive className="diet-table mt-3">
                    <thead>
                        <tr>
                            <th className="time-header">Horário</th>
                            <th className="day-header">Refeição</th>
                            <th className="day-header">Kcal</th>
                            <th className="day-header">Carbs</th>
                            <th className="day-header">Proteínas</th>
                            <th className="day-header">Gorduras</th>
                        </tr>
                    </thead>
                    <tbody>
                        {horarios.map((horario) => {
                            const refeicoesHorario = dynamincRef.filter(
                                (ref) => ref.horario_id === horario.id
                            );
                            return (
                                <tr
                                    key={horario.id}
                                    style={{ borderColor: "black" }}
                                >
                                    <td className="time-cell">
                                        {horario.horario}
                                    </td>
                                    <td
                                        onClick={() => handleOpenModal(horario)}
                                        className="meal-cell"
                                    >
                                        {refeicoesHorario.length > 0 ? (
                                            <ul className="list-unstyled">
                                                {refeicoesHorario.map(
                                                    (refeicao) => (
                                                        <li key={refeicao.id}>
                                                            <ul>
                                                                {refeicao.alimentos.map(
                                                                    (
                                                                        alimento
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                alimento.id
                                                                            }
                                                                            style={{
                                                                                fontSize:
                                                                                    "0.85em",
                                                                                color: "#333",
                                                                            }}
                                                                        >
                                                                            {
                                                                                alimento.nome
                                                                            }{" "}
                                                                            -{" "}
                                                                            {
                                                                                alimento.porcao.nome_porcao
                                                                            }
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        ) : (
                                            <span
                                                style={{
                                                    color: "#888",
                                                    fontStyle: "italic",
                                                }}
                                            >
                                                Sem refeição cadastrada
                                            </span>
                                        )}
                                    </td>
                                    {[
                                        "Kcal",
                                        "Carbs",
                                        "Proteínas",
                                        "Gorduras",
                                    ].map((attr, index) => (
                                        <td
                                            key={index}
                                            className="text-center meal-cell-itens"
                                        >
                                            <span>0</span>
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>

                <ModalCadastroRefeicao
                    show={visibleRef}
                    setShow={setVisibleRef}
                    selectedDia={dia_id}
                    selectedHorario={selectedHorario}
                    onUpdateRefeicao={(param) => setDynamicRef(param)}
                    arraySelectedAlimentos={arraySelectedAlimentos}
                    dieta_id={dieta_id}
                />
            </Container>
        </AdminLayout>
    );
}
