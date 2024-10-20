import { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import FormInput from "@/Components/FormInput";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Col,
    Container,
    Form,
    Row,
} from "react-bootstrap";

const LoginAdmin = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
    });

    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity()) {
            post(route("login.admin"), {
                onError: () => errors.password && reset("password"),
            });
        } else {
            e.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <div className="d-flex vh-100 vw-100 overflow-auto">
            <Head title="Login Nutricionista" />

            <Card className="m-auto shadow-lg" style={{ width: "400px" }}>
                <CardBody className="py-4 px-md-4">
                    <Container fluid className="px-0">
                        <CardTitle className="fw-bold fs-4 mb-4">
                            Login
                            <span className="fw-normal fs-5 text-muted">
                                {" - Nutricionista"}
                            </span>
                        </CardTitle>

                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <Row className="g-3">
                                <Col xs={12}>
                                    <FormInput
                                        id={"email"}
                                        label={"E-mail"}
                                        type={"email"}
                                        value={data.email}
                                        autoFocus={true}
                                        placeHolder={"Digite seu e-mail"}
                                        required={true}
                                        isInvalid={errors.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        textError={
                                            errors.email ?? "Informe seu e-mail"
                                        }
                                    />
                                </Col>

                                <Col xs={12}>
                                    <FormInput
                                        id={"password"}
                                        label={"Senha"}
                                        type={"password"}
                                        value={data.password}
                                        placeHolder={"Digite sua senha"}
                                        required={true}
                                        isInvalid={errors.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        textError={
                                            errors.password ??
                                            "Informe sua senha"
                                        }
                                    />
                                </Col>

                                {errors.error && (
                                    <Col xs={12} className="mt-4">
                                        <p className="fw-semibold text-center text-danger m-0">
                                            {errors.error}
                                        </p>
                                    </Col>
                                )}

                                <Col xs={12} className="mt-4">
                                    <div className="d-grid gap-2">
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? "Carregando..."
                                                : "Login"}
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </CardBody>

                <CardFooter className="py-3">
                    <p className="mb-0 fw-semibold text-center">
                        {"Não tem uma conta? "}

                        <Link
                            className="fw-normal"
                            href={route("register.admin")}
                        >
                            Cadastre-se
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginAdmin;
