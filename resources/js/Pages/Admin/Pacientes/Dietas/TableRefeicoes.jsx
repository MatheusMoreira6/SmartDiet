import {
    Container,
    Spinner,
    Table,
    Badge,
    Button,
    Form,
} from "react-bootstrap";
import { Eye, Plus } from "react-bootstrap-icons";
import "../../../../../css/tableDieta.css";
import ModalCadastroRefeicao from "./ModalCadastroRefeicao";
import { useState } from "react";
import ModalRenderRefeicaoAlternativa from "./ModalRenderRefeicaoAlternativa";
import Api from "@/Api";
import SweetAlert from "@/Components/SweetAlert";
import { useEffect } from "react";

export default function TableRefeicoes({ refeicoes, dieta_id, dia_id }) {
    const [dynamincRef, setDynamicRef] = useState(refeicoes);
    const [dynamicHorarios, setDynamicHorarios] = useState([]);
    const [visibleRef, setVisibleRef] = useState(false);
    const [selectedHorario, setSelectedHorario] = useState("");
    const [arraySelectedAlimentos, setArraySelectedAlimentos] = useState([]);
    const [refAlt, setRefAlt] = useState(null);
    const [visibleRefAltModal, setVisiblerefAltModal] = useState(false);
    const [alimentosRefAlt, setAlimentosRefAlt] = useState([]);
    const [refeicaoSelected, setRefeicaoSelected] = useState(0);
    const [editingHorario, setEditingHorario] = useState(null);
    const [newHorario, setNewHorario] = useState("");

    useEffect(() => {
        const fn = async () => {
            const response = await Api.get(
                route("busca.horario.dia", {
                    dia_id: dia_id,
                    dieta_id: dieta_id,
                })
            );
            setDynamicHorarios(response.data.horarios);
        };

        fn();
    }, []);

    const handleOpenModal = (horario) => {
        const refeicaoSelected = dynamincRef.filter(
            (ref) => ref.horario_id === horario.id
        );
        if (refeicaoSelected.length > 0) {
            setArraySelectedAlimentos(refeicaoSelected[0].alimentos);
            setRefeicaoSelected([refeicaoSelected[0].id]);
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

    const vizualizeRefAlt = ({ alimentos, refeicao_id, horario }) => {
        setSelectedHorario(horario);
        setVisiblerefAltModal(true);
        setAlimentosRefAlt(alimentos);
        setArraySelectedAlimentos(alimentos);
        setRefeicaoSelected(refeicao_id);
    };

    const handleHorarioEdit = (horario) => {
        setEditingHorario(horario.id);
        setNewHorario(horario.horario);
    };

    const handleHorarioChange = (e) => {
        setNewHorario(e.target.value);
    };

    const handleHorarioBlur = (horarioId) => {
        updateHorario(horarioId, newHorario);
        setEditingHorario(null);
    };

    const updateHorario = async (horarioId, novoHorario) => {
        try {
            const response = await Api.post(route("horario.editar"), {
                horario: novoHorario,
                id: horarioId,
                dieta_id: dieta_id,
                dia_id: dia_id,
            });

            const updatedHorarios = response.data.horarios;
            setDynamicHorarios(updatedHorarios);
        } catch (error) {
            console.error(error);
            SweetAlert.warning({
                title: "Falha ao atualizar o horário!",
            });
        }
    };

    return (
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
                    {dynamicHorarios.map((horario) => {
                        const refeicoesHorario = dynamincRef.filter(
                            (ref) => ref.horario_id === horario.id
                        );

                        return (
                            <tr
                                key={horario.id}
                                style={{ borderColor: "black" }}
                            >
                                <td className="time-cell">
                                    {editingHorario === horario.id ? (
                                        <Form.Control
                                            type="time"
                                            value={newHorario}
                                            onChange={handleHorarioChange}
                                            onBlur={() =>
                                                handleHorarioBlur(horario.id)
                                            }
                                            autoFocus
                                        />
                                    ) : (
                                        <span
                                            onClick={() =>
                                                handleHorarioEdit(horario)
                                            }
                                        >
                                            {horario.horario}
                                        </span>
                                    )}
                                </td>
                                <td
                                    onClick={() => handleOpenModal(horario)}
                                    className="meal-cell"
                                    style={{ position: "relative" }}
                                >
                                    {refeicoesHorario.length > 0 ? (
                                        <>
                                            {refeicoesHorario[0]
                                                .refeicao_alternativa ? (
                                                <>
                                                    <div className="add-refeicao-btn">
                                                        <Button
                                                            variant="primary"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                vizualizeRefAlt(
                                                                    {
                                                                        alimentos:
                                                                            refeicoesHorario[0]
                                                                                .refeicao_alternativa
                                                                                .alimentos,
                                                                        refeicao_id:
                                                                            refeicoesHorario[0]
                                                                                .refeicao_alternativa
                                                                                .id,
                                                                        horario:
                                                                            horario.id,
                                                                    }
                                                                );
                                                            }}
                                                            style={{
                                                                fontSize: 10,
                                                            }}
                                                        >
                                                            <Eye />{" "}
                                                            <span className="d-none d-md-inline">
                                                                Ver ref. alt.
                                                            </span>
                                                        </Button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="add-refeicao-btn">
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleAddRefeicao({
                                                                refeicao:
                                                                    refeicoesHorario[0],
                                                                horario:
                                                                    horario,
                                                            });
                                                        }}
                                                        style={{
                                                            fontSize: 10,
                                                        }}
                                                    >
                                                        <Plus />{" "}
                                                        <span className="d-none d-md-inline">
                                                            Refeição Alt
                                                        </span>
                                                    </Button>
                                                </div>
                                            )}
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

                                        arrayAlimentos.forEach((element) => {
                                            arrayNumeros.push(
                                                parseFloat(element.porcao[attr])
                                            );
                                        });
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
                refeicaoSelected={refeicaoSelected}
                setRefeicaoSelected={setRefeicaoSelected}
            />
            <ModalRenderRefeicaoAlternativa
                show={visibleRefAltModal}
                refeicao={alimentosRefAlt}
                handleClose={() => {
                    setVisiblerefAltModal(false);
                    setAlimentosRefAlt([]);
                }}
                handleEdit={() => {
                    setVisiblerefAltModal(false);
                    setVisibleRef(true);
                }}
            />
        </Container>
    );
}
