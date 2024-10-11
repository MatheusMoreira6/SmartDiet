import { useRef } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import FormInput from "@/Components/FormFields/FormInput";

const Cadastrar = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        nome: "",
        sobrenome: "",
        data_nascimento: "",
        cpf: "",
        telefone: "",
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
        <div className="d-flex vh-100 vw-100 py-3 px-1 overflow-auto">
            <Head title="Cadastro Nutricionista" />

            <div className="card m-auto shadow-lg" style={{ width: "400px" }}>
                <div className="card-body p-4">
                    <h1 className="fs-4 card-title fw-bold mb-4">
                        Cadastre-se
                    </h1>

                    <form
                        noValidate
                        ref={formRef}
                        onSubmit={hendleSubmit}
                        className="needs-validation"
                    >
                        <div className="mb-3">
                            <FormInput
                                label={"Nome"}
                                name={"nome"}
                                type={"text"}
                                value={data.nome}
                                autoFocus={true}
                                placeHolder={"Digite seu nome"}
                                textError={"Insira um nome"}
                                onChange={(e) =>
                                    setData("nome", e.target.value)
                                }
                            />
                        </div>

                        <div className="mb-3">
                            <FormInput
                                label={"Sobrenome"}
                                name={"sobrenome"}
                                type={"text"}
                                value={data.sobrenome}
                                placeHolder={"Digite seu sobrenome"}
                                textError={"Insira um sobrenome"}
                                onChange={(e) =>
                                    setData("sobrenome", e.target.value)
                                }
                            />
                        </div>

                        <div className="mb-3">
                            <FormInput
                                label={"Data de Nascimento"}
                                name={"data_nascimento"}
                                type={"text"}
                                value={data.data_nascimento}
                                mask={"99/99/9999"}
                                placeHolder={"__/__/____"}
                                textError={"Insira uma data de nascimento"}
                                onChange={(e) =>
                                    setData("data_nascimento", e.target.value)
                                }
                            />
                        </div>

                        <div className="mb-3">
                            <FormInput
                                label={"CPF"}
                                name={"cpf"}
                                type={"text"}
                                value={data.cpf}
                                mask={"999.999.999-99"}
                                placeHolder={"Digite seu CPF"}
                                textError={"Insira um CPF válido"}
                                onChange={(e) => setData("cpf", e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <FormInput
                                label={"Telefone"}
                                name={"telefone"}
                                type={"text"}
                                value={data.telefone}
                                mask={"(99) 99999-9999"}
                                placeHolder={"Digite seu telefone"}
                                textError={"Insira um telefone válido"}
                                onChange={(e) =>
                                    setData("telefone", e.target.value)
                                }
                            />
                        </div>

                        <div className="mb-3">
                            <FormInput
                                label={"E-mail"}
                                name={"email"}
                                type={"email"}
                                value={data.email}
                                placeHolder={"Digite seu e-mail"}
                                textError={"Insira um e-mail válido"}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                        </div>

                        <div className="mb-3">
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

                        <div className="mb-4">
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

                        <div className="mb-4 text-center fw-semibold text-danger">
                            {Object.keys(errors).map((key) => (
                                <span>{errors[key]}</span>
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="btn btn-primary w-100"
                        >
                            {processing ? "Carregando..." : "Cadastrar"}
                        </button>
                    </form>
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

export default Cadastrar;
