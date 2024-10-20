import { useRef, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import ContainerFluid from "@/Components/ContainerFluid";
import Card from "@/Components/Card";
import FormModal from "@/Components/FormModal";
import SweetAlert from "@/Components/SweetAlert";
import FormInput from "@/Components/FormInput";
import FormSelect from "@/Components/FormSelect";

const Pacientes = ({ user, currentRoute, generos, pacientes }) => {
    const modalRef = useRef(null);
    const formRef = useRef(null);

    const [modalOpen, setModalOpen] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        nome: "",
        sobrenome: "",
        data_nascimento: "",
        genero_id: "",
        cpf: "",
        telefone: "",
        email: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formRef.current.checkValidity()) {
            formRef.current.classList.remove("was-validated");

            post(route("admin.pacientes"), {
                onSuccess: (page) => {
                    let title = page.props.title;
                    let text = page.props.text;

                    SweetAlert.success(title, text).then(() => {
                        setModalOpen(false);
                    });

                    reset();
                },
                onError: (errors) => {
                    SweetAlert.error(Object.values(errors).flat());
                },
            });
        } else {
            formRef.current.classList.add("was-validated");
        }
    };

    const modalShow = () => {
        setModalOpen(true);
    };

    const modalClose = () => {
        setModalOpen(false);
    };

    const renderPacientes = (pacientes) => {
        return pacientes.map((paciente) => (
            <div className="col" key={paciente.id}>
                <Card footer={`${paciente.nome} ${paciente.sobrenome}`}>
                    <img src="..." className="card-img-top" alt="..." />
                </Card>
            </div>
        ));
    };

    return (
        <>
            <AdminLayout user={user} currentRoute={currentRoute}>
                <Head title="Pacientes" />

                <ContainerFluid padding="py-4">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-3">
                        <div className="col">
                            <Card onClick={modalShow}>
                                <i
                                    className="bi bi-person-fill-add m-auto"
                                    style={{ fontSize: "120px" }}
                                ></i>
                            </Card>
                        </div>

                        {pacientes.length > 0 && renderPacientes(pacientes)}
                    </div>
                </ContainerFluid>
            </AdminLayout>

            <FormModal
                title={"Cadastrar Paciente"}
                modalRef={modalRef}
                modalOpen={modalOpen}
                formRef={formRef}
                processing={processing}
                handleSubmit={handleSubmit}
                performClose={modalClose}
            >
                <div className="row g-3">
                    <div className="col-12 col-lg-4">
                        <FormInput
                            label={"Nome"}
                            name={"nome"}
                            type={"text"}
                            value={data.nome}
                            autoFocus={true}
                            placeHolder={"Digite seu nome"}
                            textError={"Informe seu nome"}
                            onChange={(e) => setData("nome", e.target.value)}
                        />
                    </div>

                    <div className="col-12 col-lg-4">
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

                    <div className="col-12 col-lg-4">
                        <FormInput
                            label={"Data de Nascimento"}
                            name={"data_nascimento"}
                            type={"text"}
                            value={data.data_nascimento}
                            mask={"99/99/9999"}
                            placeHolder={"__/__/____"}
                            textError={"Informe sua data de nascimento"}
                            onChange={(e) =>
                                setData("data_nascimento", e.target.value)
                            }
                        />
                    </div>

                    <div className="col-12 col-lg-4">
                        <FormSelect
                            label={"Sexo"}
                            name={"sexo"}
                            options={generos}
                            value={data.genero_id}
                            textError={"Informe seu sexo"}
                            onChange={(e) =>
                                setData("genero_id", e.target.value)
                            }
                        />
                    </div>

                    <div className="col-12 col-lg-4">
                        <FormInput
                            label={"CPF"}
                            name={"cpf"}
                            type={"text"}
                            value={data.cpf}
                            mask={"999.999.999-99"}
                            placeHolder={"Digite seu CPF"}
                            textError={"Informe seu CPF"}
                            onChange={(e) => setData("cpf", e.target.value)}
                        />
                    </div>

                    <div className="col-12 col-lg-4">
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

                    <div className="col-12">
                        <FormInput
                            label={"E-mail"}
                            name={"email"}
                            type={"email"}
                            value={data.email}
                            placeHolder={"Digite seu e-mail"}
                            textError={"Insira um e-mail válido"}
                            onChange={(e) =>
                                setData("email", e.target.value.toLowerCase())
                            }
                        />
                    </div>
                </div>
            </FormModal>
        </>
    );
};

export default Pacientes;
