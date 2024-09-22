const Input = ({
    name,
    type = "text",
    value,
    onChange,
    placeHolder,
    required,
    autoFocus,
}) => {
    return (
        <input
            id={name}
            name={name}
            type={type}
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
