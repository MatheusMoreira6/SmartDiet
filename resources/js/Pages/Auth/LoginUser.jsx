import { useRef } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import Form from "@/Components/Form";
import FormInput from "@/Components/FormFields/FormInput";

const LoginUser = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
    });

    const formRef = useRef(null);

    const hendleSubmit = (e) => {
        e.preventDefault();

        if (formRef.current.checkValidity()) {
            formRef.current.classList.remove("was-validated");

            post(route("login.user"), {
                onFinish: () => reset("password"),
            });
        } else {
            formRef.current.classList.add("was-validated");
        }
    };

    return (
        <div className="d-flex vh-100 vw-100 py-3 px-1 overflow-auto">
            <Head title="Login Paciente" />

            <div className="card m-auto shadow-lg" style={{ width: "400px" }}>
                <div className="card-body p-4">
                    <h1 className="fs-4 card-title fw-bold mb-4">
                        Login
                        <span className="fs-5 fw-normal text-muted">
                            {" "}
                            - Paciente
                        </span>
                    </h1>

                    <Form formRef={formRef} hendleSubmit={hendleSubmit}>
                        <div className="mb-3">
                            <FormInput
                                label={"E-mail"}
                                name={"email"}
                                type={"email"}
                                value={data.email}
                                autoFocus={true}
                                placeHolder={"Digite seu e-mail"}
                                textError={"Insira um e-mail válido"}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                        </div>

                        <div className="mb-4">
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

                        <div className="mb-4 text-center fw-semibold text-danger">
                            {Object.keys(errors).map((key) => (
                                <span key={key}>{errors[key]}</span>
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="btn btn-primary w-100"
                        >
                            {processing ? "Carregando..." : "Login"}
                        </button>
                    </Form>
                </div>

                <div className="card-footer py-3 border-0">
                    <p className="text-center fw-semibold mb-0">
                        Nutricionista?{" "}
                        <Link className="fw-normal" href={route("login.admin")}>
                            Clique aqui para logar
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginUser;
