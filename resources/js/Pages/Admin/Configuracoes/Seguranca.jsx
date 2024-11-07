import { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import FormInput from "@/Components/FormInput";
import LinkWarning from "@/Components/LinkWarning";
import SweetAlert from "@/Components/SweetAlert";
import { Button, Col, Form, Row } from "react-bootstrap";

const Seguranca = () => {
    const { dados } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        email: dados.email,
        password_old: "",
        password_new: "",
    });

    useEffect(() => {
        const inputPasswordOld = document.getElementById("password_old");
        const inputPasswordNew = document.getElementById("password_new");

        const toggleRequiredAttribute = (input, condition) => {
            if (condition) {
                input.setAttribute("required", true);
            } else {
                input.removeAttribute("required");
            }
        };

        toggleRequiredAttribute(inputPasswordOld, data.password_old);
        toggleRequiredAttribute(inputPasswordNew, data.password_old);
    }, [data.password_old]);

    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity()) {
            post(route("admin.configuracoes.seguranca.update"), {
                onSuccess: (page) => {
                    SweetAlert.success({
                        title: page.props.title,
                        text: page.props.text,
                    });

                    reset("password_old", "password_new");
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
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                        onChange={(e) => setData("email", e.target.value)}
                        textError={
                            errors.email ?? "O campo e-mail é obrigatório"
                        }
                    />
                </Col>

                <Col xs={12} md={6}>
                    <FormInput
                        id="password_old"
                        label="Senha atual"
                        type="password"
                        bold={true}
                        value={data.password_old}
                        required={false}
                        isInvalid={errors.password_old}
                        onChange={(e) =>
                            setData("password_old", e.target.value)
                        }
                        textError={
                            errors.password_old ??
                            "O campo senha atual é obrigatório"
                        }
                    />
                </Col>

                <Col xs={12} md={6}>
                    <FormInput
                        id="password_new"
                        label="Nova senha"
                        type="password"
                        bold={true}
                        value={data.password_new}
                        required={false}
                        isInvalid={errors.password_new}
                        onChange={(e) =>
                            setData("password_new", e.target.value)
                        }
                        textError={
                            errors.password_new ??
                            "O campo nova senha é obrigatório"
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

                        <LinkWarning href={route("admin.home")}>
                            <i className="bi bi-arrow-return-left"></i>
                            Cancelar
                        </LinkWarning>
                    </div>
                </Col>
            </Row>
        </Form>
    );
};

export default Seguranca;