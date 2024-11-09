import { Row, Col, Button, Table, Spinner, Card } from "react-bootstrap";
import { ModalCadastroDieta } from "./ModalCadastroDieta";
import { useState, useEffect } from "react";
import Api from "@/Api";
import "../../../../../css/tableDieta.css";
import { router } from "@inertiajs/react";
import ModalEditDia from "./ModalEditDia";
import { ModalCadastroGrupo } from "./ModalCadastroGrupo";
import SweetAlert from "@/Components/SweetAlert";

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

    return (
        <Row>
            {dietasDynamic.length > 0 ? (
                <>
                    <Col md={12} style={{ marginBottom: 15 }}>
                        <Button
                            variant="primary"
                            onClick={() => setAddGrupo(true)}
                        >
                            <i className="bi bi-plus-lg"></i>
                            Cadastrar grupo
                        </Button>
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
                                        <Button
                                            variant="outline-primary"
                                            style={{
                                                textDecoration: "none",
                                            }}
                                            onClick={() => {
                                                router.visit(
                                                    route("admin.refeicoes", {
                                                        dieta_id:
                                                            dietasDynamic[0].id,
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
                                                    dieta_id:
                                                        dietasDynamic[0].id,
                                                    dia_id: dia.id,
                                                })
                                            }
                                        >
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))}
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
