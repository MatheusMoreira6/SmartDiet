import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import WrapperContainer from "@/Components/WrapperContainer";
import PageTopic from "@/Components/PageTopic";
import PedidoExame from "./PedidoExame";
import { Line } from "@/Components/ChartJS";
import { pdf } from "@react-pdf/renderer";
import { Row, Table, Button, Col } from "react-bootstrap";

const Exames = ({ pendentes, exames_finalizados }) => {
    const handleDownload = async (exame) => {
        const blob = await pdf(<PedidoExame exame={exame} />).toBlob();
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "Pedido de Exame.pdf";
        link.click();

        URL.revokeObjectURL(url);
    };

    return (
        <UserLayout>
            <Head title="Exames" />

            <WrapperContainer>
                <PageTopic>
                    <i className="bi bi-list"></i>
                    Exames
                </PageTopic>

                <Row className="g-3">
                    <Col xs={12}>
                        <Table
                            hover
                            striped
                            bordered
                            responsive
                            className="mb-0"
                        >
                            <thead>
                                <tr>
                                    <th>Título do Pedido</th>
                                    <th>Data do Pedido</th>
                                    <th>Quantidade de Exames</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {pendentes && pendentes.length > 0 ? (
                                    pendentes.map((exame) => (
                                        <tr key={exame.id}>
                                            <td>{exame.titulo_pedido}</td>

                                            <td className="text-center">
                                                {exame.data_pedido}
                                            </td>

                                            <td className="text-center">
                                                {exame.total_exames}
                                            </td>

                                            <td className="text-center d-grid gap-2 d-md-block">
                                                <Button
                                                    variant="primary"
                                                    title="Imprimir Pedido"
                                                    onClick={() => {
                                                        handleDownload(exame);
                                                    }}
                                                >
                                                    <i className="bi bi-printer"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            Nenhum exame pendente.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Row className="g-3 mt-3">
                    {exames_finalizados.length > 0 &&
                        exames_finalizados.map((exame) => (
                            <Col key={exame.id} xs={12} lg={6}>
                                <h6>{exame.nome}</h6>

                                <Line
                                    data={{
                                        labels: exame.datas_resultados,
                                        datasets: [
                                            {
                                                label: `Resultado (${exame.unidade_medida})`,
                                                data: exame.resultados,
                                                tension: 0.1,
                                            },
                                        ],
                                    }}
                                />
                            </Col>
                        ))}
                </Row>
            </WrapperContainer>
        </UserLayout>
    );
};

export default Exames;
