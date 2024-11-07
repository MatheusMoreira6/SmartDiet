import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Row, Col, Container } from "react-bootstrap";
import WrapperContainer from "@/Components/WrapperContainer";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend
);

const Home = ({ consultas }) => {
    const dates = consultas.map((consulta) => consulta.data);

    const weightHeightImcData = {
        labels: dates,
        datasets: [
            {
                label: "Peso (kg)",
                data: consultas.map((consulta) => parseFloat(consulta.peso)),
                borderColor: "#36A2EB",
                fill: false,
            },
            {
                label: "Altura (cm)",
                data: consultas.map((consulta) => parseFloat(consulta.altura)),
                borderColor: "#FF6384",
                fill: false,
            },
            {
                label: "IMC",
                data: consultas.map((consulta) => parseFloat(consulta.imc)),
                borderColor: "#FFCE56",
                fill: false,
            },
        ],
    };

    const circumferencesData = {
        labels: dates,
        datasets: [
            {
                label: "Cintura (cm)",
                data: consultas.map((consulta) =>
                    parseFloat(consulta.circunferencia_cintura)
                ),
                borderColor: "#36A2EB",
                fill: false,
            },
            {
                label: "Pescoço (cm)",
                data: consultas.map((consulta) =>
                    parseFloat(consulta.circunferencia_pescoco)
                ),
                borderColor: "#FF6384",
                fill: false,
            },
            {
                label: "Quadril (cm)",
                data: consultas.map((consulta) =>
                    parseFloat(consulta.circunferencia_quadril)
                ),
                borderColor: "#FFCE56",
                fill: false,
            },
        ],
    };

    const fatMuscleData = {
        labels: dates,
        datasets: [
            {
                label: "Percentual de Gordura (%)",
                data: consultas.map((consulta) =>
                    parseFloat(consulta.percentual_gordura)
                ),
                borderColor: "#36A2EB",
                fill: false,
            },
            {
                label: "Massa Muscular (kg)",
                data: consultas.map((consulta) =>
                    parseFloat(consulta.massa_muscular)
                ),
                borderColor: "#FF6384",
                fill: false,
            },
        ],
    };

    return (
        <UserLayout>
            <Head title="Tela Inicial" />
            <Container>
                <Row>
                    <Col md={6} sm={12} lg={6}>
                        <Container className="rounded shadow-lg my-3 p-3">
                            <h4>Progresso de Peso, Altura e IMC</h4>
                            <Line data={weightHeightImcData} />
                        </Container>
                    </Col>
                    <Col md={6} sm={12} lg={6}>
                        <Container className="rounded shadow-lg my-3 p-3">
                            <h4>Progresso das Circunferências</h4>
                            <Line data={circumferencesData} />
                        </Container>
                    </Col>
                    <Col md={12} sm={12} lg={6}>
                        <Container className="rounded shadow-lg my-3 p-3">
                            <h4>Percentual de Gordura e Massa Muscular</h4>
                            <Line data={fatMuscleData} />
                        </Container>
                    </Col>
                </Row>
            </Container>
        </UserLayout>
    );
};

export default Home;
