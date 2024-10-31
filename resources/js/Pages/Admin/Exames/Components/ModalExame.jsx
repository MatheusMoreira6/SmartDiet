import FormInput from "@/Components/FormInput";
import FormModal from "@/Components/FormModal";
import FormSelect from "@/Components/FormSelect";
import { Col, Row } from "react-bootstrap";

const ModalExames = ({
    data,
    setData,
    erros,
    pacientes = [],
    showModal,
    validated,
    processing,
    handleClose,
    handleSubmit,
}) => {
    return (
        <FormModal
            show={showModal}
            title={"Cadastrar Exame"}
            validated={validated}
            processing={processing}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
        >
            <Row className="g-3">
                <Col xs={12} lg={6}>
                    <FormSelect
                        id={"paciente_id"}
                        label={"Paciente"}
                        options={pacientes}
                        value={data.paciente_id}
                        required={true}
                        isInvalid={erros.paciente_id}
                        onChange={(e) => setData("paciente_id", e.target.value)}
                        textError={erros.paciente_id ?? "Selecione o paciente"}
                    />
                </Col>

                <Col xs={12} lg={6}>
                    <FormInput
                        id={"data_exame"}
                        label={"Data do Exame"}
                        type={"text"}
                        mask={"99/99/9999"}
                        value={data.data_exame}
                        placeHolder={"__/__/____"}
                        required={true}
                        isInvalid={erros.data_exame}
                        onChange={(e) => setData("data_exame", e.target.value)}
                        textError={
                            erros.data_exame ?? "Informe a data do exame"
                        }
                    />
                </Col>

                <Col xs={12}>
                    
                </Col>
            </Row>
        </FormModal>
    );
};

export default ModalExames;
