import Form from "react-bootstrap/Form";

const FormDate = ({
    id,
    label,
    bold,
    value,
    autoFocus,
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
                type={"date"}
                value={value}
                autoFocus={autoFocus}
                required={required}
                isInvalid={isInvalid}
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

export default FormDate;
