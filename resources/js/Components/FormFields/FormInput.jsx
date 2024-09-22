import Label from "../Label";
import Input from "../Input";
import InvalidFeedback from "../InvalidFeedback";

const FormInput = ({
    label,
    name,
    type,
    value,
    onChange,
    placeHolder,
    textError,
    autoFocus,
}) => {
    return (
        <>
            <Label htmlFor={name} required={textError ? true : false}>
                {label}
            </Label>

            <Input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeHolder={placeHolder}
                required={textError ? true : false}
                autoFocus={autoFocus}
            />

            {textError ? <InvalidFeedback>{textError}</InvalidFeedback> : null}
        </>
    );
};

export default FormInput;
