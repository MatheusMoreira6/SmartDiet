import Label from "../Label";
import Select from "../Select";

const FormSelect = ({ name, label, options, value, onChange, autoFocus }) => {
    return (
        <>
            <Label htmlFor={name}>{label}</Label>

            <Select
                name={name}
                options={options}
                value={value}
                onChange={onChange}
                autoFocus={autoFocus}
            />
        </>
    );
};

export default FormSelect;
