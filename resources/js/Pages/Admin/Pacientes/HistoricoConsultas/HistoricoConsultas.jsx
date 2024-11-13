import { Table } from "react-bootstrap";

export default function HistoricoConsultas({ agenda_consultas }) {
    return (
        <Table hover striped bordered responsive className="mb-0">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Altura (cm)</th>
                    <th>Peso (kg)</th>
                    <th>IMC</th>
                    <th>Massa Muscular</th>
                    <th>Gordura (%)</th>
                    <th>Circunferência Cintura</th>
                    <th>Circunferência Pescoço</th>
                    <th>Circunferência Quadril</th>
                </tr>
            </thead>

            <tbody>
                {agenda_consultas.length == 0 ? (
                    <tr>
                        <td colSpan="12" className="text-center">
                            Nenhuma consulta encontrada!
                        </td>
                    </tr>
                ) : (
                    agenda_consultas.map((consulta, index) => (
                        <tr key={index}>
                            <td className="text-center">
                                {new Date(consulta.data).toLocaleDateString(
                                    "pt-BR"
                                )}
                            </td>

                            <td className="text-center">
                                {consulta.hora.slice(0, 5)}
                            </td>

                            <td className="text-center">
                                {consulta.dia_semana_id}
                            </td>

                            <td className="text-center">{consulta.altura}</td>
                            <td className="text-center">{consulta.peso}</td>
                            <td className="text-center">{consulta.imc}</td>

                            <td className="text-center">
                                {consulta.massa_muscular}
                            </td>

                            <td className="text-center">
                                {consulta.percentual_gordura}
                            </td>

                            <td className="text-center">
                                {consulta.circunferencia_cintura}
                            </td>

                            <td className="text-center">
                                {consulta.circunferencia_pescoco}
                            </td>

                            <td className="text-center">
                                {consulta.circunferencia_quadril}
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </Table>
    );
}
