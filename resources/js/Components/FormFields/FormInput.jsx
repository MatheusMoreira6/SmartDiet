import Label from "../Label";
import Input from "../Input";
import InvalidFeedback from "../InvalidFeedback";

const FormInput = ({
    label,
    name,
    type,
    mask,
    value,
    onChange,
    autoFocus,
    placeHolder,
    textError,
}) => {
    return (
        <>
            <Label htmlFor={name} required={textError ? true : false}>
                {label}
            </Label>

            <Input
                name={name}
                type={type}
                mask={mask}
                value={value}
                onChange={onChange}
                autoFocus={autoFocus}
                placeHolder={placeHolder}
                required={textError ? true : false}
            />

            {textError ? <InvalidFeedback>{textError}</InvalidFeedback> : null}
        </>
    );
};

export default FormInput;
