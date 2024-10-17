import Label from "../Label";
import Select from "../Select";
import InvalidFeedback from "../InvalidFeedback";

const FormSelect = ({
    name,
    label,
    options,
    value,
    onChange,
    autoFocus,
    textError,
}) => {
    return (
        <>
            <Label htmlFor={name}>{label}</Label>

            <Select
                name={name}
                options={options}
                value={value}
                onChange={onChange}
                autoFocus={autoFocus}
                required={textError ? true : false}
            />

            {textError ? <InvalidFeedback>{textError}</InvalidFeedback> : null}
        </>
    );
};

export default FormSelect;
