import { useRef } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
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
            <Head title="Login" />

            <div className="card m-auto shadow-lg" style={{ width: "400px" }}>
                <div className="card-body p-4">
                    <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>

                    <form
                        noValidate
                        ref={formRef}
                        onSubmit={hendleSubmit}
                        className="needs-validation"
                    >
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
                            {errors.email && <span>{errors.email}</span>}
                            {errors.password && <span>{errors.password}</span>}
                            {errors.error && <span>{errors.error}</span>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="btn btn-primary w-100"
                        >
                            {processing ? "Carregando..." : "Login"}
                        </button>
                    </form>
                </div>

                <div className="card-footer py-3 border-0">
                    <p className="text-center mb-0">
                        Não tem uma conta?{" "}
                        <Link href={route("register.admin")}>Cadastre-se</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginUser;
