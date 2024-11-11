import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import WrapperContainer from "@/Components/WrapperContainer";
import { Bar } from "@/Components/ChartJS";
import { Table, Row, Col } from "react-bootstrap";

const Home = ({
    consultas,
    consultas_mes,
    documentos_pendentes,
    documentos_concluidos,
}) => {
    const dataPendentes = {
        labels: ["Questionários", "Exames"],
        datasets: [
            {
                label: "Pendentes",
                data: documentos_pendentes,
            },
            {
                label: "Concluídos",
                data: documentos_concluidos,
            },
        ],
    };

    const optionsPendentes = {
        indexAxis: "y",
        plugins: {
            legend: {
                position: "bottom",
            },
        },
        scales: {
            x: {
                ticks: {
                    stepSize: 1,
                    beginAtZero: true,
                },
            },
        },
    };

    const dataConsultas = {
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
                data: consultas_mes,
            },
        ],
    };

    const optionsConsultas = {
        indexAxis: "y",
        plugins: {
            legend: {
                position: "bottom",
            },
        },
        scales: {
            x: {
                ticks: {
                    stepSize: 1,
                    beginAtZero: true,
                },
            },
        },
    };

    return (
        <AdminLayout>
            <Head title="Tela Inicial" />

            <WrapperContainer>
                <Row className="g-3">
                    <Col xs={12} lg={6}>
                        <h6>Consultas por Mês</h6>

                        <Bar data={dataConsultas} options={optionsConsultas} />
                    </Col>

                    <Col xs={12} lg={6}>
                        <h6>Documentos</h6>

                        <Bar data={dataPendentes} options={optionsPendentes} />
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
                                    <th>Paciente</th>
                                    <th>Data</th>
                                    <th>Hora</th>
                                    <th>Telefone</th>
                                </tr>
                            </thead>

                            <tbody>
                                {consultas.length > 0 ? (
                                    consultas.map((consulta, index) => (
                                        <tr key={index}>
                                            <td>{consulta.paciente}</td>

                                            <td className="text-center">
                                                {consulta.data}
                                            </td>

                                            <td className="text-center">
                                                {consulta.hora.slice(0, 5)}
                                            </td>

                                            <td className="text-center">
                                                {consulta.telefone}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">
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
