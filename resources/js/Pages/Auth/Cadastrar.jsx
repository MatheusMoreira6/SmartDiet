import { useRef } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import FormInput from "@/Components/FormFields/FormInput";

const Cadastrar = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
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

            post(route("cadastrar"), {
                onFinish: () => reset("password"),
            });
        } else {
            formRef.current.classList.add("was-validated");
        }
    };

    return (
        <div className="d-flex vh-100 vw-100">
            <Head title="Cadastro" />

            <div className="card m-auto shadow-lg" style={{ width: "400px" }}>
                <div className="card-body py-4 px-5">
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
                                name={"name"}
                                type={"text"}
                                value={data.name}
                                autoFocus={true}
                                placeHolder={"Digite seu nome"}
                                textError={"Insira um nome"}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                        </div>

                        <div className="mb-3">
                            <FormInput
                                label={"CPF"}
                                name={"cpf"}
                                type={"text"}
                                value={data.cpf}
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
                                textError={"As senhas não conferem"}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                            />
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
                    <p className="text-center mb-0">
                        Já tem conta?{" "}
                        <Link href={route("/")}>Clique aqui para logar</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Cadastrar;
