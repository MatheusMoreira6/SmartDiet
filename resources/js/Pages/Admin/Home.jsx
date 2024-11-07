import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Table, Row, Col } from "react-bootstrap";
import { Pie, Bar } from "react-chartjs-2";
import WrapperContainer from "@/Components/WrapperContainer";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

const Home = ({ pacientes, agenda_consultas }) => {
    const genderCounts = pacientes.reduce(
        (acc, paciente) => {
            if (paciente.genero.descricao === "Masculino") acc.male++;
            if (paciente.genero.descricao === "Feminino") acc.female++;
            return acc;
        },
        { male: 0, female: 0 }
    );

    const pieData = {
        labels: ["Masculino", "Feminino"],
        datasets: [
            {
                data: [genderCounts.male, genderCounts.female],
                backgroundColor: ["#36A2EB", "#FF6384"],
            },
        ],
    };

    const pieOptions = {
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    };

    const monthlyConsultations = agenda_consultas.reduce((acc, consulta) => {
        const month = new Date(consulta.data).getMonth();
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, Array(12).fill(0));

    const barData = {
        labels: [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
        ],
        datasets: [
            {
                label: "Consultas",
                data: monthlyConsultations,
                backgroundColor: "#36A2EB",
            },
        ],
    };

    const barOptions = {
        scales: {
            y: {
                ticks: {
                    stepSize: 1,
                    beginAtZero: true,
                    callback: function (value) {
                        if (Number.isInteger(value)) {
                            return value;
                        }
                    },
                },
            },
        },
    };

    const upcomingConsultations = agenda_consultas
        .sort((a, b) => new Date(a.data) - new Date(b.data))
        .slice(0, 10);

    return (
        <AdminLayout>
            <Head title="Tela Inicial" />
            <WrapperContainer>
                <Row className="g-3">
                    <Col md={4}>
                        <h6>Pacientes por Gênero</h6>

                        <Pie data={pieData} options={pieOptions} />
                    </Col>

                    <Col md={8}>
                        <h6>Consultas por Mês</h6>

                        <Bar data={barData} options={barOptions} />
                    </Col>

                    <Col xs={12}>
                        <h6>Próximas 10 Consultas</h6>

                        <Table
                            hover
                            striped
                            bordered
                            responsive
                            className="mb-0"
                        >
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Hora</th>
                                    <th>Nome do Paciente</th>
                                </tr>
                            </thead>

                            <tbody>
                                {upcomingConsultations.length > 0 ? (
                                    upcomingConsultations.map(
                                        (consulta, index) => {
                                            if (consulta.finalizada == true)
                                                return;
                                            return (
                                                <tr key={index}>
                                                    <td>{consulta.data}</td>
                                                    <td>{consulta.hora}</td>

                                                    <td>
                                                        {
                                                            pacientes.find(
                                                                (paciente) =>
                                                                    paciente.id ===
                                                                    consulta.paciente_id
                                                            )?.nome
                                                        }
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            Nenhuma consulta agendada
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </WrapperContainer>
        </AdminLayout>
    );
};

export default Home;
