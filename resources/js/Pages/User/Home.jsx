import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import WrapperContainer from "@/Components/WrapperContainer";
import { Line } from "@/Components/ChartJS";
import { Row, Col } from "react-bootstrap";

const Home = ({ datas_consultas, dados_consultas }) => {
    const dataPesoAlturaIMC = {
        labels: datas_consultas,
        datasets: [
            {
                label: "Peso (kg)",
                data: dados_consultas.peso,
            },
            {
                label: "Altura (cm)",
                data: dados_consultas.altura,
            },
            {
                label: "IMC",
                data: dados_consultas.imc,
            },
        ],
    };

    const dataCinturaPesoQuadril = {
        labels: datas_consultas,
        datasets: [
            {
                label: "Cintura (cm)",
                data: dados_consultas.cintura,
            },
            {
                label: "Quadril (cm)",
                data: dados_consultas.quadril,
            },
            {
                label: "Pescoço (cm)",
                data: dados_consultas.pescoco,
            },
        ],
    };

    const dataGorduraMassa = {
        labels: datas_consultas,
        datasets: [
            {
                label: "Percentual de Gordura (%)",
                data: dados_consultas.percentual_gordura,
            },
            {
                label: "Massa Muscular (kg)",
                data: dados_consultas.massa_muscular,
            },
        ],
    };

    return (
        <UserLayout>
            <Head title="Tela Inicial" />

            <WrapperContainer>
                <Row className="g-3">
                    <Col xs={12} lg={6}>
                        <h6>Progresso de Peso, Altura e IMC</h6>
                        <Line data={dataPesoAlturaIMC} />
                    </Col>

                    <Col xs={12} lg={6}>
                        <h6>Progresso das Circunferências</h6>
                        <Line data={dataCinturaPesoQuadril} />
                    </Col>

                    <Col xs={12} lg={6}>
                        <h6>Percentual de Gordura e Massa Muscular</h6>
                        <Line data={dataGorduraMassa} />
                    </Col>
                </Row>
            </WrapperContainer>
        </UserLayout>
    );
};

export default Home;
