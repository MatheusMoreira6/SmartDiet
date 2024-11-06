import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import WrapperContainer from "@/Components/WrapperContainer";
import PageTopic from "@/Components/PageTopic";
import { Row } from "react-bootstrap";

const Exames = ({ exames_pedidos }) => {
    console.log(exames_pedidos);
    return (
        <UserLayout>
            <Head title="Exames" />
            <WrapperContainer>
                <PageTopic>
                    <i className="bi bi-list"></i>
                    Exames
                </PageTopic>

                <Row></Row>
            </WrapperContainer>
        </UserLayout>
    );
};

export default Exames;
