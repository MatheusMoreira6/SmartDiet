import { Container, Spinner, Table, Button } from "react-bootstrap";
import "../../../../../css/tableDieta.css";
import ModalCadastroRefeicao from "./ModalCadastroRefeicao";
import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

export default function TableRefeicoes({ refeicoes, horarios }) {
    const [visibleRef, setVisibleRef] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedHorario, setSelectedHorario] = useState("");
    const [selectedDia, setSelectedDia] = useState(""); 
    const [arraySelectedAlimentos, setArraySelectedAlimentos] = useState([]);

    const handleOpenModal = (horario) => {
        setSelectedHorario(horario.id);
        setVisibleRef(true);
    };

    return (
        <AdminLayout>
            <Head title="Cadastrar Questionário" />
        <Container>
            <Table bordered responsive className="diet-table mt-3">
                {loading ? (
                    <Spinner animation="border" role="status" variant="primary" />
                ) : (
                    <>
                        <thead>
                            <tr>
                                <th>Horário</th>
                                <th>Refeições</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {horarios.map((horario) => {
                                const refeicoesHorario = refeicoes.filter(ref => ref.horario_id === horario.id);
                                return (
                                    <tr key={horario.id}>
                                        <td>{horario.horario}</td>
                                        <td>
                                            {refeicoesHorario.length > 0 ? (
                                                <ul>
                                                    {refeicoesHorario.map(refeicao => (
                                                        <li key={refeicao.id}>
                                                            Refeição ID: {refeicao.id} - Dia da Semana: {refeicao.dia_semana_id}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span>Sem refeição cadastrada</span>
                                            )}
                                        </td>
                                        <td>
                                            <Button variant="primary" onClick={() => handleOpenModal(horario)}>
                                                Adicionar Refeição
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </>
                )}
            </Table>

            {/* Modal para cadastrar nova refeição */}
            <ModalCadastroRefeicao
                show={visibleRef}
                setShow={setVisibleRef}
                selectedDia={selectedDia}
                selectedHorario={selectedHorario}
                onUpdateRefeicao={() => setLoading(!loading)}
                arraySelectedAlimentos={arraySelectedAlimentos}
            />
        </Container>
        </AdminLayout>
    );
}
