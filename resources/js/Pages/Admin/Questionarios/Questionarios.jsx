import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import WrapperContainer from "@/Components/WrapperContainer";
import PageTopic from "@/Components/PageTopic";
import LinkPrimary from "@/Components/LinkPrimary";
import { Col, Row } from "react-bootstrap";

const Questionarios = () => {
    return (
        <AdminLayout>
            <Head title="Questionários" />

            <WrapperContainer>
                <PageTopic>
                    <i className="bi bi-list"></i>
                    Questionários
                </PageTopic>

                <Row>
                    <Col xs={12}>
                        <LinkPrimary
                            href={route("admin.questionarios.cadastrar")}
                        >
                            Novo Questionário
                        </LinkPrimary>
                    </Col>
                </Row>
            </WrapperContainer>
        </AdminLayout>
    );
};

export default Questionarios;
