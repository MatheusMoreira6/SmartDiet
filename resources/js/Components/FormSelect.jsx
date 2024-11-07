import { Form } from "react-bootstrap";

const FormSelect = ({
    id,
    label,
    bold,
    options,
    value,
    autoFocus,
    required,
    isInvalid,
    onChange,
    textError,
}) => {
    if (!Array.isArray(options)) {
        options = Object.values(options);
    }

    const selectOptions = [{ id: "", descricao: "Selecione..." }, ...options];

    return (
        <Form.Group controlId={id}>
            <Form.Label className={bold ? "fw-semibold" : ""}>
                {label}
            </Form.Label>

            <Form.Select
                value={value}
                autoFocus={autoFocus}
                isInvalid={isInvalid}
                onChange={onChange}
                required={required}
            >
                {selectOptions.map((option, index) => (
                    <option
                        key={index}
                        value={option.id}
                        disabled={required && option.id === ""}
                    >
                        {option.descricao}
                    </option>
                ))}
            </Form.Select>

            {textError ? (
                <Form.Control.Feedback type="invalid">
                    {textError}
                </Form.Control.Feedback>
            ) : null}
        </Form.Group>
    );
};

export default FormSelect;
