import InputMask from "react-input-mask";

const Input = ({
    name,
    type = "text",
    mask,
    value,
    onChange,
    placeHolder,
    required,
    autoFocus,
}) => {
    return (
        <InputMask
            id={name}
            name={name}
            type={type}
            mask={mask}
            value={value}
            onChange={onChange}
            autoFocus={autoFocus}
            placeholder={placeHolder}
            className="form-control"
            required={required}
        />
    );
};

export default Input;
