const Input = ({
    name,
    type = "text",
    value,
    onChange,
    placeHolder,
    required,
}) => {
    return (
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeHolder}
            className="form-control"
            required={required}
        />
    );
};

export default Input;
