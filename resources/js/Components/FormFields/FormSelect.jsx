import Label from "../Label";
import Select from "../Select";

const FormSelect = ({ name, label, options, value, onChange }) => {
    return (
        <>
            <Label htmlFor={name}>{label}</Label>

            <Select
                name={name}
                options={options}
                value={value}
                onChange={onChange}
            />
        </>
    );
};

export default FormSelect;
