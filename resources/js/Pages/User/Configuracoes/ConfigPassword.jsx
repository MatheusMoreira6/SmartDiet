import { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import FormInput from "@/Components/FormInput";
import PageTopic from "@/Components/PageTopic";
import WrapperContainer from "@/Components/WrapperContainer";
import LinkWarning from "@/Components/LinkWarning";
import SweetAlert from "@/Components/SweetAlert";
import { Button, Col, Form, Row } from "react-bootstrap";

const Configuracoes = ({ dados }) => {
    const { data, setData, put, processing, errors } = useForm({
        email: dados.email,
        password: "",
        password_confirmation: "",
    });

    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity()) {
            put(route("user.alterar-senha-padrao"), {
                onSuccess: (page) => {
                    SweetAlert.success({
                        title: page.props.title,
                        text: page.props.text,
                    }).then(() => {
                        router.visit(route("user.configuracoes"));
                    });
                },
                onError: () => {
                    (errors.password || errors.error) &&
                        SweetAlert.error({
                            title: errors.password ?? errors.error,
                        });
                },
            });
        } else {
            e.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <UserLayout>
            <Head title="Configurações" />

            <WrapperContainer>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <PageTopic>
                        <i className="bi bi-gear-fill"></i>
                        Configurações - Troca de Senha Padrão
                    </PageTopic>

                    <Row className="g-3">
                        <Col xs={12}>
                            <FormInput
                                id="email"
                                label="E-mail"
                                type="email"
                                bold={true}
                                value={data.email}
                                placeHolder={dados.email}
                                required={true}
                                isInvalid={errors.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                textError={
                                    errors.email ??
                                    "O campo e-mail é obrigatório"
                                }
                            />
                        </Col>

                        <Col xs={12} md={6}>
                            <FormInput
                                id="password"
                                label="Nova Senha"
                                type="password"
                                bold={true}
                                value={data.password}
                                required={false}
                                isInvalid={errors.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                textError={
                                    !errors.password
                                        ? "Insira sua nova senha"
                                        : ""
                                }
                            />
                        </Col>

                        <Col xs={12} md={6}>
                            <FormInput
                                id="password_confirmation"
                                label="Confirme sua Senha"
                                type="password"
                                bold={true}
                                value={data.password_confirmation}
                                required={true}
                                isInvalid={errors.password}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                textError={
                                    !errors.password
                                        ? "Insira novamente sua nova senha"
                                        : ""
                                }
                            />
                        </Col>

                        <Col xs={12}>
                            <div className="d-grid gap-2 d-md-block">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={processing}
                                >
                                    <i className="bi bi-floppy"></i>
                                    {processing ? "Salvando..." : "Salvar"}
                                </Button>

                                <LinkWarning href={route("user.home")}>
                                    <i className="bi bi-arrow-return-left"></i>
                                    Cancelar
                                </LinkWarning>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </WrapperContainer>
        </UserLayout>
    );
};

export default Configuracoes;
