import Label from "../Label";
import Input from "../Input";

const FormInput = ({ label, name, type, value, onChange, placeHolder }) => {
    return (
        <>
            <Label htmlFor={name}>{label}</Label>

            <Input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeHolder={placeHolder}
            />
        </>
    );
};

export default FormInput;
