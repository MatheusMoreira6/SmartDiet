import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import ContainerFluid from "@/Components/ContainerFluid";
import Card from "@/Components/Card";

const Pacientes = ({ user, currentRoute }) => {
    return (
        <AdminLayout user={user} currentRoute={currentRoute}>
            <Head title="Pacientes" />

            <ContainerFluid>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-3">
                    <div className="col">
                        <div
                            class="card m-auto"
                            style={{ width: "280px", height: "350px" }}
                        >
                            <i
                                class="bi bi-person-fill-add m-auto"
                                style={{ fontSize: "120px" }}
                            ></i>
                        </div>
                    </div>

                    <div className="col">
                        <Card footer={"Nome Paciente"}>
                            <img src="..." class="card-img-top" alt="..." />
                        </Card>
                    </div>

                    <div className="col">
                        <Card footer={"Nome Paciente"}>
                            <img src="..." class="card-img-top" alt="..." />
                        </Card>
                    </div>

                    <div className="col">
                        <Card footer={"Nome Paciente"}>
                            <img src="..." class="card-img-top" alt="..." />
                        </Card>
                    </div>

                    <div className="col">
                        <Card footer={"Nome Paciente"}>
                            <img src="..." class="card-img-top" alt="..." />
                        </Card>
                    </div>
                </div>
            </ContainerFluid>
        </AdminLayout>
    );
};

export default Pacientes;
