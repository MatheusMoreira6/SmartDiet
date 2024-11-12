import { Table } from "react-bootstrap";

export default function HistoricoConsultas({ agenda_consultas }) {
    return (
        <Table hover striped bordered responsive className="mb-0">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Dia da Semana</th>
                    <th>Altura</th>
                    <th>Peso</th>
                    <th>IMC</th>
                    <th>Massa Muscular</th>
                    <th>% Gordura</th>
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
                    <>
                        {agenda_consultas.map((consulta, index) => (
                            <tr key={index}>
                                <td className="text-center d-grid">
                                    {consulta.data}
                                </td>
                                <td className="text-center d-grid">
                                    {consulta.hora}
                                </td>
                                <td className="text-center d-grid">
                                    {consulta.dia_semana_id}
                                </td>
                                <td className="text-center d-grid">
                                    {consulta.altura}
                                </td>
                                <td className="text-center d-grid">
                                    {consulta.peso}
                                </td>
                                <td className="text-center d-grid">
                                    {consulta.imc}
                                </td>
                                <td className="text-center d-grid">
                                    {consulta.massa_muscular}
                                </td>
                                <td className="text-center d-grid">
                                    {consulta.percentual_gordura}
                                </td>
                                <td className="text-center d-grid">
                                    {consulta.circunferencia_cintura}
                                </td>
                                <td className="text-center d-grid">
                                    {consulta.circunferencia_pescoco}
                                </td>
                                <td className="text-center d-grid">
                                    {consulta.circunferencia_quadril}
                                </td>
                            </tr>
                        ))}
                    </>
                )}
            </tbody>
        </Table>
    );
}
