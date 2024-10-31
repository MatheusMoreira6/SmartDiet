import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import WrapperContainer from "@/Components/WrapperContainer";
import PageTopic from "@/Components/PageTopic";
import { Button, Col, Row, Table } from "react-bootstrap";
import ModalExames from "./Components/ModalExame";
import { useState } from "react";

const Exames = ({ pacientes, pacientes_exame }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        id: "",
    });

    const [showModal, setShowModal] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleShow = () => setShowModal(true);

    const handleClose = () => {
        setShowModal(false);
        setValidated(false);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity()) {
            post(route("admin.exames"), {
                onSuccess: (page) => {
                    const title = page.props.title;
                    const text = page.props.text;

                    SweetAlert.success({ title: title, text: text }).then(() =>
                        handleClose()
                    );
                },
                onError: () => {
                    errors.error && SweetAlert.error({ title: errors.error });
                },
            });
        } else {
            e.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <AdminLayout>
            <Head title="Exames" />

            <WrapperContainer>
                <PageTopic>
                    <i className="bi bi-clipboard2-pulse"></i>
                    Exames
                </PageTopic>

                <Row className="g-3">
                    <Col xs={12}>
                        <div className="d-grid gap-2 d-md-block">
                            <Button variant="primary" onClick={handleShow}>
                                <i className="bi bi-plus-lg"></i>
                                Novo Exame
                            </Button>
                        </div>
                    </Col>

                    <Col xs={12}>
                        <Table
                            hover
                            striped
                            bordered
                            responsive
                            className="mb-0"
                        >
                            <thead>
                                <tr>
                                    <th>Paciente</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {pacientes_exame ? (
                                    pacientes_exame.map((paciente) => (
                                        <tr key={paciente.id}>
                                            <td>{paciente.nome}</td>

                                            <td className="text-center d-grid gap-2 d-md-block">
                                                <Button
                                                    variant="danger"
                                                    onClick={() =>
                                                        console.log(
                                                            "Excluir exame"
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="text-center">
                                            Nenhum paciente com exame
                                            cadastrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <ModalExames
                    data={data}
                    setData={setData}
                    erros={errors}
                    pacientes={pacientes}
                    showModal={showModal}
                    validated={validated}
                    processing={processing}
                    handleClose={handleClose}
                    handleSubmit={handleSubmit}
                />
            </WrapperContainer>
        </AdminLayout>
    );
};

export default Exames;
