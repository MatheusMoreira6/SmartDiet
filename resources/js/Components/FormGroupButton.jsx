import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

const FormGroupButton = ({
    id,
    label,
    type,
    bold,
    value,
    autoFocus,
    placeHolder,
    textButton,
    buttonVariant,
    required,
    isInvalid,
    onChange,
    onButtonClick,
    textError,
}) => {
    return (
        <Form.Group controlId={id}>
            <Form.Label className={bold ? "fw-semibold" : ""}>
                {label}
            </Form.Label>

            <InputGroup>
                <Form.Control
                    type={type}
                    value={value}
                    autoFocus={autoFocus}
                    placeholder={placeHolder}
                    required={required}
                    isInvalid={isInvalid}
                    onChange={onChange}
                />

                <Button variant={buttonVariant} onClick={onButtonClick}>
                    {textButton}
                </Button>
            </InputGroup>

            {textError ? (
                <Form.Control.Feedback type="invalid">
                    {textError}
                </Form.Control.Feedback>
            ) : null}
        </Form.Group>
    );
};

export default FormGroupButton;
