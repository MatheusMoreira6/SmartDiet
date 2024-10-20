import InputMask from "react-input-mask";
import Form from "react-bootstrap/Form";

const FormInput = ({
    id,
    label,
    type,
    mask,
    value,
    autoFocus,
    placeHolder,
    isInvalid,
    onChange,
    textError,
}) => {
    return (
        <Form.Group controlId={id}>
            <Form.Label>{label}</Form.Label>

            <Form.Control
                as={InputMask}
                type={type}
                mask={mask}
                value={value}
                autoFocus={autoFocus}
                placeholder={placeHolder}
                isInvalid={isInvalid}
                onChange={onChange}
                required={textError ? true : false}
            />

            {textError ? (
                <Form.Control.Feedback type="invalid">
                    {textError}
                </Form.Control.Feedback>
            ) : null}
        </Form.Group>
    );
};

export default FormInput;
