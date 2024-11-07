import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import WrapperContainer from "@/Components/WrapperContainer";
import PageTopic from "@/Components/PageTopic";
import Pendentes from "./Pendentes";
import Finalizadas from "./Finalizadas";
import { Tab, Tabs } from "react-bootstrap";

const Consultas = () => {
    return (
        <AdminLayout>
            <Head title="Consultas" />

            <WrapperContainer>
                <PageTopic>
                    <i className="bi bi-calendar3"></i>
                    Consultas
                </PageTopic>

                <Tabs id="configuracoes-tabs" defaultActiveKey="pendentes">
                    <Tab eventKey="pendentes" title="Pendentes">
                        <Pendentes />
                    </Tab>

                    <Tab eventKey="finalizadas" title="Finalizadas">
                        <Finalizadas />
                    </Tab>
                </Tabs>
            </WrapperContainer>
        </AdminLayout>
    );
};

export default Consultas;
