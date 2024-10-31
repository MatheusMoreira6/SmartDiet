import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const FormCheck = ({
    id,
    label,
    bold,
    options,
    values,
    setValues,
    required,
    isInvalid,
    textError,
}) => {
    const [isRequired, setIsRequired] = useState(required);

    useEffect(() => {
        if (required) {
            const switchChecked = options.some((option) =>
                values.includes(option.id)
            );

            setIsRequired(!switchChecked);
        }
    }, [values, options, required]);

    return (
        <Form.Group controlId={id}>
            <Form.Label className={bold ? "fw-semibold" : ""}>
                {label}
            </Form.Label>

            {options.map((option) => (
                <Form.Check
                    key={option.id}
                    id={`switch_${option.id}`}
                    type={"switch"}
                    className={`switch-options-${id}`}
                    label={option.descricao}
                    required={isRequired}
                    checked={values.includes(option.id)}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setValues([...values, option.id]);
                        } else {
                            setValues(
                                values.filter((value) => value !== option.id)
                            );
                        }
                    }}
                />
            ))}

            {textError ? (
                <Form.Control.Feedback
                    type="invalid"
                    className={isInvalid ? "d-block" : "d-none"}
                >
                    {textError}
                </Form.Control.Feedback>
            ) : null}
        </Form.Group>
    );
};

export default FormCheck;
