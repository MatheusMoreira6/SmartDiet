import { useEffect } from "react";
import { router, useForm } from "@inertiajs/react";
import SweetAlert from "@/Components/SweetAlert";
import { Accordion, Button, Table } from "react-bootstrap";

const YearCollapse = ({ ano_exames, data_resultado = false, handleUpdate }) => {
    const { data, setData, post, reset } = useForm({
        id: "",
    });

    useEffect(() => {
        if (data.id) {
            post(route("admin.exames.delete"), {
                onSuccess: (page) => {
                    SweetAlert.success({
                        title: page.props.title,
                        text: page.props.text,
                    }).then(() => {
                        if (page.props.nenhum_exame) {
                            router.visit(route("admin.exames"));
                        }
                    });
                },
                onFinish: () => {
                    reset();
                },
            });
        }
    }, [data.id]);

    const handleDelete = (exame_id) => {
        SweetAlert.confirm({
            title: "Excluir Pedido de Exame",
            text: "Deseja realmente excluir este pedido de exame?",
            confirmButton: "Sim, excluir",
            cancelButton: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                setData("id", exame_id);
            } else {
                reset();
            }
        });
    };

    return (
        <Accordion.Item eventKey={ano_exames.ano} key={ano_exames.ano}>
            <Accordion.Header>{ano_exames.ano}</Accordion.Header>

            <Accordion.Body>
                <Table hover striped bordered responsive className="mt-3 mb-0">
                    <thead>
                        <tr>
                            <th>Nome do Pedido</th>
                            <th>Data do Pedido</th>

                            {data_resultado && <th>Data do Resultado</th>}

                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {ano_exames.exames.map((exame) => (
                            <tr key={exame.id}>
                                <td>{exame.titulo_pedido}</td>

                                <td className="text-center">
                                    {exame.data_pedido}
                                </td>

                                {data_resultado && (
                                    <td className="text-center">
                                        {exame.data_resultado}
                                    </td>
                                )}

                                <td className="text-center d-grid gap-2 d-md-block">
                                    <Button
                                        variant="primary"
                                        title="Editar Pedido de Exame"
                                        onClick={() => handleUpdate(exame.id)}
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>

                                    <Button
                                        variant="danger"
                                        title="Excluir Pedido de Exame"
                                        onClick={() => handleDelete(exame.id)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default YearCollapse;
