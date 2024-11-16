import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    PDFDownloadLink,
} from "@react-pdf/renderer";

// Define os estilos para o PDF
const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 5,
        marginTop: 5,
        textAlign: "center",
    },
    table: {
        display: "table",
        width: "auto",
        borderCollapse: "collapse",
        marginTop: 20,
    },
    tableRow: {
        flexDirection: "row",
    },
    tableColHeader: {
        fontSize: 14,
        border: "1px solid #000",
        backgroundColor: "#f2f2f2",
        padding: 5,
        flex: 1,
        textAlign: "center",
        fontWeight: "bold",
    },
    tableCol: {
        border: "1px solid #000",
        padding: 5,
        flex: 1,
        textAlign: "center",
        fontSize: 10,
    },
    tableCell: {
        margin: "auto",
        textAlign: "center",
    },
});

const DietaPDF = ({ dieta, diasSemana, horarios }) => {
    const somaNutriente = (arrayNumeros) => {
        let soma = 0;
        for (const i in arrayNumeros) {
            soma += arrayNumeros[i];
        }
        return parseFloat(soma.toFixed(1));
    };

    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.title}>Tabela de Refeições</Text>
                {diasSemana.map((dia) => {
                    const newHorarios = horarios.filter(
                        (hr) => hr.grupo_id == dia.id
                    );

                    return (
                        <>
                            <Text style={styles.subtitle}>{dia.nome_grupo}</Text>;
                            <View style={styles.table}>
                                <View style={styles.tableRow}>
                                    <Text style={styles.tableColHeader}>
                                        Horário
                                    </Text>
                                    <Text style={styles.tableColHeader}>
                                        Refeição
                                    </Text>
                                    <Text style={styles.tableColHeader}>
                                        Kcal
                                    </Text>
                                    <Text style={styles.tableColHeader}>
                                        Carbs
                                    </Text>
                                    <Text style={styles.tableColHeader}>
                                        Proteínas
                                    </Text>
                                    <Text style={styles.tableColHeader}>
                                        Gorduras
                                    </Text>
                                </View>
                                {newHorarios.map((horario) => {
                                    const refeicoesHorario =
                                        dieta.refeicoes.filter(
                                            (ref) =>
                                                ref.horario_id === horario.id
                                        );
                                    return (
                                        <>
                                            <View style={styles.tableRow}>
                                                <Text style={styles.tableCol}>
                                                    {horario.horario}
                                                </Text>
                                                {refeicoesHorario.length > 0 ? (
                                                    <>
                                                        {refeicoesHorario.map(
                                                            (refeicao) => {
                                                                return (
                                                                    <>
                                                                        <Text
                                                                            style={
                                                                                styles.tableCol
                                                                            }
                                                                        >
                                                                            {refeicao.alimentos.map(
                                                                                (
                                                                                    alimentos
                                                                                ) =>
                                                                                    alimentos.nome +
                                                                                    ", "
                                                                            )}
                                                                        </Text>
                                                                    </>
                                                                );
                                                            }
                                                        )}
                                                    </>
                                                ) : (
                                                    <Text
                                                        style={styles.tableCol}
                                                    >
                                                        Sem refeição cadastrada
                                                    </Text>
                                                )}

                                                {[
                                                    "calorias",
                                                    "carboidratos",
                                                    "proteinas",
                                                    "gorduras",
                                                ].map((attr, index) => {
                                                    if (
                                                        refeicoesHorario.length >
                                                        0
                                                    ) {
                                                        const arrayAlimentos =
                                                            refeicoesHorario[0]
                                                                .alimentos;
                                                        const arrayNumeros = [];

                                                        arrayAlimentos.forEach(
                                                            (element) => {
                                                                arrayNumeros.push(
                                                                    parseFloat(
                                                                        element
                                                                            .porcao[
                                                                            attr
                                                                        ]
                                                                    )
                                                                );
                                                            }
                                                        );
                                                        return (
                                                            <Text
                                                                style={
                                                                    styles.tableCol
                                                                }
                                                            >
                                                                {somaNutriente(
                                                                    arrayNumeros
                                                                )}
                                                            </Text>
                                                        );
                                                    } else {
                                                        return (
                                                            <Text
                                                                style={
                                                                    styles.tableCol
                                                                }
                                                            >
                                                                0
                                                            </Text>
                                                        );
                                                    }
                                                })}
                                            </View>
                                        </>
                                    );
                                })}
                            </View>
                        </>
                    );
                })}
            </Page>
        </Document>
    );
};

export default DietaPDF;
