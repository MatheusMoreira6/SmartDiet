import { Form } from "react-bootstrap";

const FormSelect = ({
    id,
    label,
    options,
    value,
    autoFocus,
    required,
    isInvalid,
    onChange,
    textError,
}) => {
    const selectOptions = [{ id: "", descricao: "Selecione..." }, ...options];

    return (
        <Form.Group controlId={id}>
            <Form.Label>{label}</Form.Label>

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
