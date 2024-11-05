import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import WrapperContainer from "@/Components/WrapperContainer";
import PageTopic from "@/Components/PageTopic";
import Seguranca from "./Seguranca";
import Exames from "./Exames";
import Horarios from "./Horarios";
import { Tab, Tabs } from "react-bootstrap";

const Configuracoes = () => {
    return (
        <AdminLayout>
            <Head title="Configurações" />

            <WrapperContainer>
                <PageTopic>
                    <i className="bi bi-gear-fill"></i>
                    Configurações
                </PageTopic>

                <Tabs id="configuracoes-tabs" defaultActiveKey="seguranca">
                    <Tab eventKey="seguranca" title="Segurança">
                        <Seguranca />
                    </Tab>

                    <Tab eventKey="horarios" title="Horários">
                        <Horarios />
                    </Tab>

                    <Tab eventKey="exames" title="Exames">
                        <Exames />
                    </Tab>
                </Tabs>
            </WrapperContainer>
        </AdminLayout>
    );
};

export default Configuracoes;
