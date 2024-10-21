import { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import FormInput from "@/Components/FormInput";
import FormSelect from "@/Components/FormSelect";
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

const CadastroAdmin = ({ generos }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        nome: "",
        sobrenome: "",
        data_nascimento: "",
        genero_id: "",
        cpf: "",
        crn: "",
        telefone: "",
        telefone_fixo: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity()) {
            post(route("register.admin"), {
                onError: () =>
                    errors.password &&
                    reset("password", "password_confirmation"),
            });
        } else {
            e.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <div className="d-flex vh-100 vw-100 overflow-auto">
            <Head title="Cadastro Nutricionista" />

            <Card className="m-auto shadow-lg" style={{ width: "768px" }}>
                <CardBody className="py-4 px-md-4">
                    <Container fluid className="px-0">
                        <CardTitle className="fw-bold fs-4 mb-4">
                            Cadastro
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
                                <Col xs={12} md={4}>
                                    <FormInput
                                        id={"nome"}
                                        label={"Nome"}
                                        type={"text"}
                                        value={data.nome}
                                        autoFocus={true}
                                        placeHolder={"Digite seu nome"}
                                        required={true}
                                        isInvalid={errors.nome}
                                        onChange={(e) =>
                                            setData("nome", e.target.value)
                                        }
                                        textError={
                                            errors.nome ?? "Informe seu nome"
                                        }
                                    />
                                </Col>

                                <Col xs={12} md={4}>
                                    <FormInput
                                        id={"sobrenome"}
                                        label={"Sobrenome"}
                                        type={"text"}
                                        value={data.sobrenome}
                                        placeHolder={"Digite seu sobrenome"}
                                        required={true}
                                        isInvalid={errors.sobrenome}
                                        onChange={(e) =>
                                            setData("sobrenome", e.target.value)
                                        }
                                        textError={
                                            errors.sobrenome ??
                                            "Informe seu sobrenome"
                                        }
                                    />
                                </Col>

                                <Col xs={12} md={4}>
                                    <FormInput
                                        id={"data_nascimento"}
                                        label={"Data de Nascimento"}
                                        type={"text"}
                                        mask={"99/99/9999"}
                                        value={data.data_nascimento}
                                        placeHolder={"__/__/____"}
                                        required={true}
                                        isInvalid={errors.data_nascimento}
                                        onChange={(e) =>
                                            setData(
                                                "data_nascimento",
                                                e.target.value
                                            )
                                        }
                                        textError={
                                            errors.data_nascimento ??
                                            "Informe sua data de nascimento"
                                        }
                                    />
                                </Col>

                                <Col xs={12} md={4}>
                                    <FormSelect
                                        id={"sexo"}
                                        label={"Sexo"}
                                        options={generos}
                                        value={data.genero_id}
                                        required={true}
                                        isInvalid={errors.genero_id}
                                        onChange={(e) =>
                                            setData("genero_id", e.target.value)
                                        }
                                        textError={
                                            errors.genero_id ??
                                            "Informe seu sexo"
                                        }
                                    />
                                </Col>

                                <Col xs={12} md={4}>
                                    <FormInput
                                        id={"cpf"}
                                        label={"CPF"}
                                        type={"text"}
                                        mask={"999.999.999-99"}
                                        value={data.cpf}
                                        placeHolder={"Digite seu CPF"}
                                        required={true}
                                        isInvalid={errors.cpf}
                                        onChange={(e) =>
                                            setData("cpf", e.target.value)
                                        }
                                        textError={
                                            errors.cpf ?? "Informe seu CPF"
                                        }
                                    />
                                </Col>

                                <Col xs={12} md={4}>
                                    <FormInput
                                        id={"crn"}
                                        label={"CRN"}
                                        type={"text"}
                                        mask={"9/99999/a"}
                                        value={data.crn}
                                        placeHolder={"Digite seu CRN"}
                                        required={true}
                                        isInvalid={errors.crn}
                                        onChange={(e) =>
                                            setData(
                                                "crn",
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                        textError={
                                            errors.crn ?? "Informe seu CRN"
                                        }
                                    />
                                </Col>

                                <Col xs={12} md={6}>
                                    <FormInput
                                        id={"telefone"}
                                        label={"Telefone"}
                                        type={"text"}
                                        mask={"(99) 99999-9999"}
                                        value={data.telefone}
                                        placeHolder={"Digite seu telefone"}
                                        required={true}
                                        isInvalid={errors.telefone}
                                        onChange={(e) =>
                                            setData("telefone", e.target.value)
                                        }
                                        textError={
                                            errors.telefone ??
                                            "Informe seu telefone"
                                        }
                                    />
                                </Col>

                                <Col xs={12} md={6}>
                                    <FormInput
                                        id={"telefone_fixo"}
                                        label={"Telefone Fixo"}
                                        type={"text"}
                                        mask={"9999-9999"}
                                        value={data.telefone_fixo}
                                        placeHolder={"Digite seu telefone fixo"}
                                        required={false}
                                        isInvalid={errors.telefone_fixo}
                                        onChange={(e) =>
                                            setData(
                                                "telefone_fixo",
                                                e.target.value
                                            )
                                        }
                                        textError={errors.telefone_fixo}
                                    />
                                </Col>

                                <Col xs={12}>
                                    <FormInput
                                        id={"email"}
                                        label={"E-mail"}
                                        type={"email"}
                                        value={data.email}
                                        placeHolder={"Digite seu e-mail"}
                                        required={true}
                                        isInvalid={errors.email}
                                        onChange={(e) =>
                                            setData(
                                                "email",
                                                e.target.value.toLowerCase()
                                            )
                                        }
                                        textError={
                                            errors.email ??
                                            "Insira um e-mail válido"
                                        }
                                    />
                                </Col>

                                <Col xs={12} md={6}>
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
                                            !errors.password
                                                ? "Insira sua senha"
                                                : ""
                                        }
                                    />
                                </Col>

                                <Col xs={12} md={6}>
                                    <FormInput
                                        id={"password_confirmation"}
                                        label={"Confirme sua senha"}
                                        type={"password"}
                                        value={data.password_confirmation}
                                        placeHolder={"Confirme sua senha"}
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
                                                ? "Insira novamente sua senha"
                                                : ""
                                        }
                                    />
                                </Col>

                                {(errors.password || errors.error) && (
                                    <Col xs={12} className="mt-4">
                                        <p className="fw-semibold text-center text-danger m-0">
                                            {errors.password ?? errors.error}
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
                                                : "Cadastrar"}
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </CardBody>

                <CardFooter className="py-3">
                    <p className="mb-0 fw-semibold text-center">
                        {"Já tem conta? "}

                        <Link className="fw-normal" href={route("login.admin")}>
                            Clique aqui para logar
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default CadastroAdmin;
