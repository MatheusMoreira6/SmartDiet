import { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import WrapperContainer from "@/Components/WrapperContainer";
import PageTopic from "@/Components/PageTopic";
import LinkPrimary from "@/Components/LinkPrimary";
import { Button, Col, Row, Table } from "react-bootstrap";
import SweetAlert from "@/Components/SweetAlert";

const Questionarios = ({ questionarios, errors = {} }) => {
    const { data, setData, post, reset } = useForm({
        id: "",
    });

    useEffect(() => {
        if (errors && (errors.id || errors.error)) {
            SweetAlert.error({
                title: errors.id ?? errors.error,
            });
        }
    }, [errors]);

    useEffect(() => {
        if (data.id) {
            post(route("admin.questionarios.delete"), {
                onSuccess: (page) => {
                    SweetAlert.success({
                        title: page.props.title,
                    });
                },
                onFinish: () => {
                    reset();
                },
            });
        }
    }, [data.id]);

    const handleDelete = (questionario_id) => {
        SweetAlert.confirm({
            title: "Excluir Questionário",
            text: "Deseja realmente excluir este questionário?",
            confirmButton: "Sim, excluir",
            cancelButton: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                setData("id", questionario_id);
            } else {
                reset();
            }
        });
    };

    return (
        <AdminLayout>
            <Head title="Questionários" />

            <WrapperContainer>
                <PageTopic>
                    <i className="bi bi-list"></i>
                    Questionários
                </PageTopic>

                <Row className="g-3">
                    <Col xs={12}>
                        <div className="d-grid gap-2 d-md-block">
                            <LinkPrimary
                                href={route("admin.questionarios.create")}
                            >
                                Novo Questionário
                            </LinkPrimary>
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
                                    <th>Titulo</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {questionarios.map((questionario) => (
                                    <tr key={questionario.id}>
                                        <td>{questionario.titulo}</td>

                                        <td className="text-center d-grid gap-2 d-md-block">
                                            <LinkPrimary
                                                href={route(
                                                    "admin.questionarios.edit",
                                                    {
                                                        id: questionario.id,
                                                    }
                                                )}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </LinkPrimary>

                                            <Button
                                                variant="danger"
                                                onClick={() =>
                                                    handleDelete(
                                                        questionario.id
                                                    )
                                                }
                                            >
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </WrapperContainer>
        </AdminLayout>
    );
};

export default Questionarios;
