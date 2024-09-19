import { useState } from "react";
import FormInput from "@/Components/FormFields/FormInput";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-primary">
            <div className="card p-4" style={{ width: "400px" }}>
                <h2 className="text-start mb-4">Login</h2>

                <p className="text-center text-muted">
                    Digite os seus dados de acesso no campo abaixo.
                </p>

                <form className="needs-validation" noValidate>
                    <div className="mb-3">
                        <FormInput
                            label={"E-mail"}
                            name={"email"}
                            type={"text"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeHolder={"Digite seu e-mail"}
                            textError={"Insira um e-mail válido"}
                        />
                    </div>

                    <div className="mb-3">
                        <FormInput
                            label={"Senha"}
                            name={"password"}
                            type={"text"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeHolder={"Digite sua senha"}
                            textError={"Insira sua senha"}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
