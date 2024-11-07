import { Table } from "react-bootstrap";

export default function HistoricoConsultas({ agenda_consultas }) {
    return (
        <Table striped bordered hover responsive>
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
                {agenda_consultas.map((consulta, index) => (
                    <tr key={index}>
                        <td>{consulta.data}</td>
                        <td>{consulta.hora}</td>
                        <td>{consulta.dia_semana_id}</td>
                        <td>{consulta.altura}</td>
                        <td>{consulta.peso}</td>
                        <td>{consulta.imc}</td>
                        <td>{consulta.massa_muscular}</td>
                        <td>{consulta.percentual_gordura}</td>
                        <td>{consulta.circunferencia_cintura}</td>
                        <td>{consulta.circunferencia_pescoco}</td>
                        <td>{consulta.circunferencia_quadril}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
