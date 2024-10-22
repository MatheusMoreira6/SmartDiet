import axios from "axios";
import { useRef, useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import Container from "@/Components/Container";
import Form from "@/Components/FormReact";
import FormInput from "@/Components/FormInput";
import ButtonPrimary from "@/Components/ButtonPrimary";
import LinkWarning from "@/Components/LinkWarning";
import PageTopic from "@/Components/PageTopic";
import FormSelect from "@/Components/FormSelect";
import SweetAlert from "@/Components/SweetAlert";

const Perfil = ({ generos, dados }) => {
    const props = usePage().props;

    const { data, setData } = useForm({
        _token: props.csrf_token,
        nome: dados.nome,
        sobrenome: dados.sobrenome,
        data_nascimento: dados.data_nascimento,
        genero_id: dados.genero_id,
        cpf: dados.cpf,
        telefone: dados.telefone,
    });

    const [processing, setProcessing] = useState(false);

    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formRef.current.checkValidity()) {
            formRef.current.classList.remove("was-validated");

            setProcessing(true);

            axios({
                data: data,
                method: "put",
                responseType: "json",
                url: route("user.perfil"),
            })
                .then(function (response) {
                    SweetAlert.fire({
                        title: "Cadastro atualizado com sucesso!",
                        icon: "success",
                    });
                })
                .catch(function (error) {
                    let errorMessage = "Erro ao atualizar o perfil!";

                    if (error.response.data.errors) {
                        errorMessage = Object.values(
                            error.response.data.errors
                        ).join("\n");
                    }

                    SweetAlert.fire({
                        title: errorMessage,
                        icon: "error",
                    });
                })
                .finally(() => {
                    setProcessing(false);
                });
        } else {
            formRef.current.classList.add("was-validated");
        }
    };

    return (
        <UserLayout>
            <Head title="Perfil" />

            <Container>
                <Form formRef={formRef} handleSubmit={handleSubmit}>
                    <PageTopic>
                        <i className="bi bi-person-lines-fill"></i>
                        Perfil
                    </PageTopic>

                    <div className="row g-3">
                        <div className="col-12 col-md-6">
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

                        <div className="col-12 col-md-6">
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

                        <div className="col-12 col-md-6 col-xl-3">
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

                        <div className="col-12 col-md-6 col-xl-3">
                            <FormSelect
                                label={"Sexo"}
                                name={"sexo"}
                                options={generos}
                                value={data.genero_id}
                                onChange={(e) =>
                                    setData("genero_id", e.target.value)
                                }
                                textError={"O campo sexo é obrigatório"}
                            />
                        </div>

                        <div className="col-12 col-md-6 col-xl-3">
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

                        <div className="col-12 col-md-6 col-xl-3">
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
                            <div className="d-grid gap-2 d-md-block">
                                <ButtonPrimary disabled={processing}>
                                    <i className="bi bi-floppy"></i>
                                    {processing ? "Salvando..." : "Salvar"}
                                </ButtonPrimary>

                                <LinkWarning href={route("user.home")}>
                                    <i className="bi bi-arrow-return-left"></i>
                                    Cancelar
                                </LinkWarning>
                            </div>
                        </div>
                    </div>
                </Form>
            </Container>
        </UserLayout>
    );
};

export default Perfil;
