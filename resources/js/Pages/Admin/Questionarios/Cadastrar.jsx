import { useState } from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import WrapperContainer from "@/Components/WrapperContainer";
import PageTopic from "@/Components/PageTopic";
import FormInput from "@/Components/FormInput";
import LinkWarning from "@/Components/LinkWarning";
import { Button, Col, Form, Row } from "react-bootstrap";

const Cadastrar = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity()) {
        } else {
            e.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <AdminLayout>
            <Head title="Cadastrar Questionário" />

            <WrapperContainer>
                <PageTopic>
                    <i className="bi bi-file-earmark-text"></i>
                    Cadastrar Questionário
                </PageTopic>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="g-3 mb-3">
                        <Col xs={12}>
                            <FormInput
                                id={"titulo"}
                                label={"Título do Questionário"}
                                type={"text"}
                                bold={true}
                                value={""}
                                autoFocus={true}
                                placeHolder={"Digite o título do questionário"}
                                required={true}
                                isInvalid={false}
                                onChange={() => {}}
                                textError={
                                    "O título do questionário é obrigatório"
                                }
                            />
                        </Col>
                    </Row>

                    <Row className="g-3">
                        <div className="d-grid gap-2 d-md-block">
                            <Button variant="primary" type="submit">
                                Cadastrar
                            </Button>

                            <LinkWarning href={route("admin.questionarios")}>
                                <i class="bi bi-arrow-return-left"></i>
                                Cancelar
                            </LinkWarning>
                        </div>
                    </Row>
                </Form>
            </WrapperContainer>
        </AdminLayout>
    );
};

export default Cadastrar;
