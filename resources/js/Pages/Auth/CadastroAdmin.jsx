import { useRef } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import Form from "@/Components/Form";
import FormInput from "@/Components/FormFields/FormInput";
import FormSelect from "@/Components/FormFields/FormSelect";
import ContainerFluid from "@/Components/ContainerFluid";
import ButtonPrimary from "@/Components/ButtonPrimary";

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

    const formRef = useRef(null);

    const hendleSubmit = (e) => {
        e.preventDefault();

        if (formRef.current.checkValidity()) {
            formRef.current.classList.remove("was-validated");

            post(route("register.admin"), {
                onFinish: () => reset("password", "password_confirmation"),
            });
        } else {
            formRef.current.classList.add("was-validated");
        }
    };

    return (
        <div className="d-flex vh-100 vw-100 py-lg-3 px-lg-1 overflow-auto">
            <Head title="Cadastro Nutricionista" />

            <div className="card m-auto shadow-lg" style={{ width: "768px" }}>
                <div className="card-body py-4">
                    <ContainerFluid>
                        <h1 className="fs-4 card-title fw-bold mb-4">
                            Cadastre-se
                        </h1>

                        <Form formRef={formRef} hendleSubmit={hendleSubmit}>
                            <div className="row g-3">
                                <div className="col-12 col-md-4">
                                    <FormInput
                                        label={"Nome"}
                                        name={"nome"}
                                        type={"text"}
                                        value={data.nome}
                                        autoFocus={true}
                                        placeHolder={"Digite seu nome"}
                                        textError={"Informe seu nome"}
                                        onChange={(e) =>
                                            setData("nome", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-12 col-md-4">
                                    <FormInput
                                        label={"Sobrenome"}
                                        name={"sobrenome"}
                                        type={"text"}
                                        value={data.sobrenome}
                                        placeHolder={"Digite seu sobrenome"}
                                        textError={"Informe seu sobrenome"}
                                        onChange={(e) =>
                                            setData("sobrenome", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-12 col-md-4">
                                    <FormInput
                                        label={"Data de Nascimento"}
                                        name={"data_nascimento"}
                                        type={"text"}
                                        value={data.data_nascimento}
                                        mask={"99/99/9999"}
                                        placeHolder={"__/__/____"}
                                        textError={
                                            "Informe sua data de nascimento"
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "data_nascimento",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="col-12 col-md-4">
                                    <FormSelect
                                        label={"Sexo"}
                                        name={"sexo"}
                                        options={generos}
                                        value={data.genero_id}
                                        onChange={(e) =>
                                            setData("genero_id", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-12 col-md-4">
                                    <FormInput
                                        label={"CPF"}
                                        name={"cpf"}
                                        type={"text"}
                                        value={data.cpf}
                                        mask={"999.999.999-99"}
                                        placeHolder={"Digite seu CPF"}
                                        textError={"Informe seu CPF"}
                                        onChange={(e) =>
                                            setData("cpf", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-12 col-md-4">
                                    <FormInput
                                        label={"CRN"}
                                        name={"crn"}
                                        type={"text"}
                                        value={data.crn}
                                        mask={"9/99999/a"}
                                        placeHolder={"Digite seu CRN"}
                                        textError={"Informe seu CRN"}
                                        onChange={(e) =>
                                            setData(
                                                "crn",
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                    />
                                </div>

                                <div className="col-12 col-md-6">
                                    <FormInput
                                        label={"Telefone"}
                                        name={"telefone"}
                                        type={"text"}
                                        value={data.telefone}
                                        mask={"(99) 99999-9999"}
                                        placeHolder={"Digite seu telefone"}
                                        textError={"Informe seu telefone"}
                                        onChange={(e) =>
                                            setData("telefone", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-12 col-md-6">
                                    <FormInput
                                        label={"Telefone Fixo"}
                                        name={"telefone_fixo"}
                                        type={"text"}
                                        value={data.telefone_fixo}
                                        mask={"9999-9999"}
                                        placeHolder={"Digite seu telefone fixo"}
                                        onChange={(e) =>
                                            setData(
                                                "telefone_fixo",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="col-12">
                                    <FormInput
                                        label={"E-mail"}
                                        name={"email"}
                                        type={"email"}
                                        value={data.email}
                                        placeHolder={"Digite seu e-mail"}
                                        textError={"Insira um e-mail válido"}
                                        onChange={(e) =>
                                            setData(
                                                "email",
                                                e.target.value.toLowerCase()
                                            )
                                        }
                                    />
                                </div>

                                <div className="col-12 col-md-6">
                                    <FormInput
                                        label={"Senha"}
                                        name={"password"}
                                        type={"password"}
                                        value={data.password}
                                        placeHolder={"Digite sua senha"}
                                        textError={"Insira sua senha"}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-12 col-md-6">
                                    <FormInput
                                        label={"Confirme sua senha"}
                                        name={"password_confirmation"}
                                        type={"password"}
                                        value={data.password_confirmation}
                                        placeHolder={"Confirme sua senha"}
                                        textError={"Insira novamente sua senha"}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="col-12 text-center">
                                    {Object.keys(errors).map((key) => (
                                        <p
                                            key={key}
                                            className="fw-semibold text-danger m-0"
                                        >
                                            {errors[key]}
                                        </p>
                                    ))}
                                </div>

                                <div className="col-12">
                                    <div className="d-grid gap-2">
                                        <ButtonPrimary disabled={processing}>
                                            {processing
                                                ? "Carregando..."
                                                : "Cadastrar"}
                                        </ButtonPrimary>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </ContainerFluid>
                </div>

                <div className="card-footer py-3 border-0">
                    <p className="text-center fw-semibold mb-0">
                        Já tem conta?{" "}
                        <Link className="fw-normal" href={route("login.admin")}>
                            Clique aqui para logar
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CadastroAdmin;
