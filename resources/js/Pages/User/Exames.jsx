import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import WrapperContainer from "@/Components/WrapperContainer";
import PageTopic from "@/Components/PageTopic";
import { Row, Table, Button } from "react-bootstrap";
import {
    PDFDownloadLink,
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const styles = StyleSheet.create({
    page: { padding: 30 },
    section: { marginBottom: 20 },
    title: { fontSize: 16, marginBottom: 10, fontWeight: "bold" },
    item: { fontSize: 12, marginBottom: 5 },
});

const ExamesPDF = ({ exames_pedidos }) => (
    <Document>
        <Page style={styles.page}>
            <Text style={styles.title}>Lista de Pedidos de Exames</Text>
            {exames_pedidos.map((pedido, index) => (
                <View key={pedido.id} style={styles.section}>
                    <Text style={styles.item}>{pedido.titulo_pedido}</Text>
                    <Text style={styles.item}>
                        Data do Pedido: {pedido.data_pedido}
                    </Text>
                    <Text style={styles.item}>Exames:</Text>
                    {pedido.itens_pedido_exame.map((item, i) => (
                        <Text key={item.id} style={styles.item}>
                            - {item.exame.nome} ({item.exame.unidade_medida})
                        </Text>
                    ))}
                </View>
            ))}
        </Page>
    </Document>
);

const Exames = ({ exames_pedidos, exames_resultados }) => {
    // Agrupar resultados de exames por `exame_id`
    const groupedResults = exames_resultados.reduce((acc, pedido) => {
        pedido.itens_pedido_exame.forEach((item) => {
            if (!acc[item.exame_id]) {
                acc[item.exame_id] = {
                    nome: item.exame.nome,
                    unidade: item.exame.unidade_medida,
                    datas: [],
                    resultados: [],
                };
            }
            acc[item.exame_id].datas.push(pedido.data_resultado);
            acc[item.exame_id].resultados.push(parseFloat(item.resultado));
        });
        return acc;
    }, {});

    return (
        <UserLayout>
            <Head title="Exames" />
            <WrapperContainer>
                <PageTopic>
                    <i className="bi bi-list"></i>
                    Exames
                </PageTopic>

                {exames_pedidos && exames_pedidos.length > 0 ? (
                    <>
                        <Row className="my-3">
                            <PDFDownloadLink
                                document={
                                    <ExamesPDF
                                        exames_pedidos={exames_pedidos}
                                    />
                                }
                                fileName="pedidos_exames.pdf"
                            >
                                {({ loading }) =>
                                    loading ? (
                                        "Carregando PDF..."
                                    ) : (
                                        <Button>Gerar PDF de pedidos</Button>
                                    )
                                }
                            </PDFDownloadLink>
                        </Row>

                        <Row>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Título do Pedido</th>
                                        <th>Data do Pedido</th>
                                        <th>Quantidade de Exames</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exames_pedidos.map((pedido, index) => (
                                        <tr key={pedido.id}>
                                            <td>{index + 1}</td>
                                            <td>{pedido.titulo_pedido}</td>
                                            <td>{pedido.data_pedido}</td>
                                            <td>
                                                {
                                                    pedido.itens_pedido_exame
                                                        .length
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Row>
                    </>
                ) : null}

                {Object.keys(groupedResults).length > 0 && (
                    <div className="mt-4">
                        {Object.entries(groupedResults).map(
                            ([exameId, exameData]) => (
                                <Row key={exameId} className="mb-5">
                                    <h5>
                                        {exameData.nome} ({exameData.unidade})
                                    </h5>
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    >
                                        <Line 
                                            data={{
                                                labels: exameData.datas,
                                                datasets: [
                                                    {
                                                        label: `Resultado do exame ${exameData.nome}`,
                                                        data: exameData.resultados,
                                                        borderColor:
                                                            "rgba(75, 192, 192, 1)",
                                                        backgroundColor:
                                                            "rgba(75, 192, 192, 0.2)",
                                                        fill: true,
                                                        tension: 0.1,
                                                    },
                                                ],
                                            }}
                                            options={{
                                                responsive: true,
                                                plugins: {
                                                    legend: { position: "top" },
                                                    title: {
                                                        display: true,
                                                        text: `Evolução dos Resultados: ${exameData.nome}`,
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                </Row>
                            )
                        )}
                    </div>
                )}
            </WrapperContainer>
        </UserLayout>
    );
};

export default Exames;
