import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 12 },
    header: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: "center",
        fontWeight: "bold",
    },
    section: { marginVertical: 10 },
    row: { flexDirection: "row", marginBottom: 5 },
    label: { fontWeight: "bold" },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: { flexDirection: "row" },
    tableColHeaderLeft: {
        width: "70%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: "#eaeaea",
        padding: 5,
        textAlign: "center",
        fontWeight: "bold",
    },
    tableColHeaderRight: {
        width: "30%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: "#eaeaea",
        padding: 5,
        textAlign: "center",
        fontWeight: "bold",
    },
    tableColLeft: {
        width: "70%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
    },
    tableColRight: {
        width: "30%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
        textAlign: "center",
    },
});

const PedidoExame = ({ exame }) => (
    <Document>
        <Page style={styles.page}>
            <Text style={styles.header}>Pedido de Exame</Text>

            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>Título do Pedido: </Text>
                    <Text style={styles.value}>{exame.titulo_pedido}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Data do Pedido: </Text>
                    <Text style={styles.value}>{exame.data_pedido}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Total de Exames: </Text>
                    <Text style={styles.value}>{exame.total_exames}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.header}>Dados do Paciente</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Nome: </Text>
                    <Text style={styles.value}>{exame.paciente.nome}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Gênero: </Text>
                    <Text style={styles.value}>{exame.paciente.genero}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Data de Nascimento: </Text>

                    <Text style={styles.value}>
                        {exame.paciente.data_nascimento}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>CPF: </Text>
                    <Text style={styles.value}>{exame.paciente.cpf}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Telefone: </Text>
                    <Text style={styles.value}>{exame.paciente.telefone}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.header}>Dados do Nutricionista</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Nome: </Text>
                    <Text style={styles.value}>{exame.nutricionista.nome}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Gênero: </Text>

                    <Text style={styles.value}>
                        {exame.nutricionista.genero}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Data de Nascimento: </Text>

                    <Text style={styles.value}>
                        {exame.nutricionista.data_nascimento}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>CPF: </Text>
                    <Text style={styles.value}>{exame.nutricionista.cpf}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>CRN: </Text>
                    <Text style={styles.value}>{exame.nutricionista.crn}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Telefone: </Text>

                    <Text style={styles.value}>
                        {exame.nutricionista.telefone}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Telefone Fixo: </Text>

                    <Text style={styles.value}>
                        {exame.nutricionista.telefone_fixo}
                    </Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.header}>Itens do Pedido de Exame</Text>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeaderLeft}>Nome</Text>

                        <Text style={styles.tableColHeaderRight}>
                            Unidade de Medida
                        </Text>
                    </View>

                    {exame.itens_pedido_exame.map((item, index) => (
                        <View style={styles.tableRow} key={index}>
                            <Text style={styles.tableColLeft}>{item.nome}</Text>

                            <Text style={styles.tableColRight}>
                                {item.unidade_medida}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);

export default PedidoExame;
