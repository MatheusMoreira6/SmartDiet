import { Container, Spinner, Table, Badge, Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
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
    const [refAlt, setRefAlt] = useState(null);

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

    const handleAddRefeicao = ({ refeicao, horario }) => {
        setVisibleRef(true);
        setSelectedHorario(horario.id);
        setRefAlt(refeicao.id);
    };

    const somaNutriente = (arrayNumeros) => {
        let soma = 0;
        for (const i in arrayNumeros) {
            soma += arrayNumeros[i];
        }
        return parseFloat(soma.toFixed(1));
    };

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
                                        style={{ position: "relative" }}
                                    >
                                        {refeicoesHorario.length > 0 ? (
                                            <>
                                                <div className="add-refeicao-btn">
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleAddRefeicao({refeicao: refeicoesHorario[0], horario: horario});
                                                        }}
                                                        style={{ fontSize: 10 }}
                                                    >
                                                        <Plus />{" "}
                                                        <span className="d-none d-md-inline">
                                                            Refeição Alt
                                                        </span>
                                                    </Button>
                                                </div>
                                                <ul className="list-unstyled">
                                                    {refeicoesHorario.map(
                                                        (refeicao) => (
                                                            <li
                                                                key={
                                                                    refeicao.id
                                                                }
                                                            >
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
                                                                                    alimento
                                                                                        .porcao
                                                                                        .nome_porcao
                                                                                }
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </>
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
                                        "calorias",
                                        "carboidratos",
                                        "proteinas",
                                        "gorduras",
                                    ].map((attr, index) => {
                                        if (refeicoesHorario.length > 0) {
                                            const arrayAlimentos =
                                                refeicoesHorario[0].alimentos;
                                            const arrayNumeros = [];

                                            arrayAlimentos.forEach(
                                                (element) => {
                                                    arrayNumeros.push(
                                                        parseFloat(
                                                            element.porcao[attr]
                                                        )
                                                    );
                                                }
                                            );
                                            return (
                                                <td
                                                    key={index}
                                                    className="text-center meal-cell-itens"
                                                >
                                                    <span>
                                                        {somaNutriente(
                                                            arrayNumeros
                                                        )}
                                                    </span>
                                                </td>
                                            );
                                        } else {
                                            return (
                                                <td
                                                    key={index}
                                                    className="text-center meal-cell-itens"
                                                >
                                                    <span>0</span>
                                                </td>
                                            );
                                        }
                                    })}
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
                    setArraySelectedAlimentos={setArraySelectedAlimentos}
                    refAlt={refAlt}
                    setRefAlt={setRefAlt}
                />
            </Container>
        </AdminLayout>
    );
}
