import Form from "react-bootstrap/Form";
import DatePicker from "react-date-picker";

const FormDatePicker = ({
    id,
    label,
    bold,
    value,
    required,
    isInvalid,
    onChange,
    textError,
}) => {
    return (
        <Form.Group controlId={id}>
            <Form.Label className={bold ? "fw-semibold" : ""}>
                {label}
            </Form.Label>

            <Form.Control
                as={DatePicker}
                value={value}
                format="dd/MM/yyyy"
                required={required}
                onChange={onChange}
            />

            {textError ? (
                <Form.Control.Feedback type="invalid">
                    {textError}
                </Form.Control.Feedback>
            ) : null}
        </Form.Group>
    );
};

export default FormDatePicker;
