import { useEffect } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import WrapperContainer from "@/Components/WrapperContainer";
import PageTopic from "@/Components/PageTopic";
import LinkPrimary from "@/Components/LinkPrimary";
import { Button, Col, Row, Table } from "react-bootstrap";
import SweetAlert from "@/Components/SweetAlert";

const Questionarios = ({ questionarios }) => {
    const { data, setData, post, reset } = useForm({
        id_questionario: "",
    });

    useEffect(() => {
        if (data.id_questionario) {
            post(route("admin.questionarios.excluir"), {
                onSuccess: (page) => {
                    SweetAlert.success({
                        title: page.props.title,
                    }).then(() => {
                        router.visit(route("admin.questionarios"));
                    });
                },
                onError: (errors) => {
                    SweetAlert.error({
                        title: errors.id_questionario ?? errors.error,
                    });
                },
                onFinish: () => {
                    reset();
                },
            });
        }
    }, [data.id_questionario]);

    const handleDelete = (event) => {
        const id_questionario = event.currentTarget.getAttribute("data-value");

        SweetAlert.confirm({
            title: "Excluir Questionário",
            text: "Deseja realmente excluir este questionário?",
            confirmButton: "Sim, excluir",
            cancelButton: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                setData("id_questionario", id_questionario);
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
                                href={route("admin.questionarios.cadastrar")}
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
                                    <th className="text-center">Titulo</th>
                                    <th className="text-center">Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {questionarios.map((questionario) => (
                                    <tr key={questionario.id}>
                                        <td className="align-middle">
                                            {questionario.titulo}
                                        </td>

                                        <td className="align-middle text-center d-grid gap-2 d-md-block">
                                            <LinkPrimary
                                                href={route(
                                                    "admin.questionarios.editar",
                                                    {
                                                        id: questionario.id,
                                                    }
                                                )}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </LinkPrimary>

                                            <Button
                                                variant="danger"
                                                data-value={questionario.id}
                                                onClick={(e) => handleDelete(e)}
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
