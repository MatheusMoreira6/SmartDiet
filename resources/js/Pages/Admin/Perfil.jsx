import { useRef } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Container from "@/Components/Container";
import Form from "@/Components/Form";
import FormInput from "@/Components/FormFields/FormInput";
import ButtonPrimary from "@/Components/ButtonPrimary";
import LinkWarning from "@/Components/LinkWarning";

const Perfil = ({ user, previousUrl, dados }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        nome: dados.nome,
        sobrenome: dados.sobrenome,
        data_nascimento: dados.data_nascimento,
        cpf: dados.cpf,
        telefone: dados.telefone,
        email: dados.email,
    });

    const formRef = useRef(null);

    const hendleSubmit = (e) => {
        e.preventDefault();

        if (formRef.current.checkValidity()) {
            formRef.current.classList.remove("was-validated");
        } else {
            formRef.current.classList.add("was-validated");
        }
    };

    return (
        <AdminLayout user={user}>
            <Head title="Perfil" />

            <Container>
                <Form formRef={formRef} hendleSubmit={hendleSubmit}>
                    <div className="row g-3">
                        <div className="col-12 col-md-4 col-xl-3">
                            <FormInput
                                label={"Nome"}
                                name={"nome"}
                                type={"text"}
                                value={data.nome}
                                placeHolder={dados.nome}
                                onChange={(e) =>
                                    setData("nome", e.target.value)
                                }
                                textError={"O campo nome é obrigatório"}
                            />
                        </div>

                        <div className="col-12 col-md-4 col-xl-3">
                            <FormInput
                                label={"Sobrenome"}
                                name={"sobrenome"}
                                type={"text"}
                                value={data.sobrenome}
                                placeHolder={dados.sobrenome}
                                onChange={(e) =>
                                    setData("sobrenome", e.target.value)
                                }
                                textError={"O campo sobrenome é obrigatório"}
                            />
                        </div>

                        <div className="col-12 col-md-4 col-xl-3">
                            <FormInput
                                label={"Data de Nascimento"}
                                name={"data_nascimento"}
                                type={"text"}
                                mask={"99/99/9999"}
                                value={data.data_nascimento}
                                placeHolder={dados.data_nascimento}
                                onChange={(e) =>
                                    setData("data_nascimento", e.target.value)
                                }
                                textError={
                                    "O campo data de nascimento é obrigatório"
                                }
                            />
                        </div>

                        <div className="col-12 col-md-4 col-xl-3">
                            <FormInput
                                label={"CPF"}
                                name={"cpf"}
                                type={"text"}
                                mask={"999.999.999-99"}
                                value={data.cpf}
                                placeHolder={dados.cpf}
                                onChange={(e) => setData("cpf", e.target.value)}
                                textError={"O campo cpf é obrigatório"}
                            />
                        </div>

                        <div className="col-12 col-md-4 col-xl-3">
                            <FormInput
                                label={"Telefone"}
                                name={"telefone"}
                                type={"text"}
                                mask={"(99) 99999-9999"}
                                value={data.telefone}
                                placeHolder={dados.telefone}
                                onChange={(e) =>
                                    setData("telefone", e.target.value)
                                }
                                textError={"O campo telefone é obrigatório"}
                            />
                        </div>

                        <div className="col-12">
                            <div class="d-grid gap-2 d-md-block">
                                <ButtonPrimary>
                                    <i class="bi bi-floppy"></i>
                                    Salvar
                                </ButtonPrimary>

                                <LinkWarning href={route("admin.home")}>
                                    <i class="bi bi-arrow-return-left"></i>
                                    Cancelar
                                </LinkWarning>
                            </div>
                        </div>
                    </div>
                </Form>
            </Container>
        </AdminLayout>
    );
};

export default Perfil;
