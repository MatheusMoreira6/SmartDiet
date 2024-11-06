import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import WrapperContainer from "@/Components/WrapperContainer";
import PageTopic from "@/Components/PageTopic";
import { Row, Table, Button } from "react-bootstrap";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

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
                    <Text style={styles.item}>Data do Pedido: {pedido.data_pedido}</Text>
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

                <Row className="my-3">
                    <PDFDownloadLink
                        document={<ExamesPDF exames_pedidos={exames_pedidos} />}
                        fileName="pedidos_exames.pdf"
                    >
                        {({ loading }) =>
                            loading ? "Carregando PDF..." : <Button>Gerar PDF</Button>
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
                                    <td>{pedido.itens_pedido_exame.length}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </WrapperContainer>
        </UserLayout>
    );
};

export default Exames;
