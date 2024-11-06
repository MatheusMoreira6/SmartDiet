import Form from "react-bootstrap/Form";
import Flatpickr from "react-flatpickr";

const FormDate = ({
    id,
    label,
    bold,
    value,
    autoFocus,
    required,
    isValid,
    isInvalid,
    onChange,
    textError,
}) => {
    return (
        <Form.Group controlId={id}>
            <Form.Label className={bold ? "fw-semibold" : ""}>
                {label}
            </Form.Label>

            <Flatpickr
                onChange={([selectedDate]) => {
                    if (selectedDate) {
                        onChange(selectedDate.toISOString().split("T")[0]);
                    } else {
                        onChange("");
                    }
                }}
                render={({ value, ...props }, ref) => (
                    <Form.Control
                        ref={ref}
                        type="text"
                        value={value}
                        autoFocus={autoFocus}
                        required={required}
                        isValid={isValid}
                        isInvalid={isInvalid}
                        {...props}
                    />
                )}
                options={{
                    dateFormat: "d/m/Y",
                    defaultDate: value,
                }}
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
