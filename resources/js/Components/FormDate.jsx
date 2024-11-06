import Form from "react-bootstrap/Form";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/l10n/pt.js";

const FormDate = ({
    id,
    label,
    bold,
    value,
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
                        required={required}
                        isValid={isValid}
                        isInvalid={isInvalid}
                        {...props}
                    />
                )}
                options={{
                    dateFormat: "d/m/Y",
                    defaultDate: value,
                    locale: "pt",
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
