const Input = ({ name, type = "text", value, onChange, placeHolder }) => {
    return (
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeHolder}
            className="form-control"
        />
    );
};

export default Input;
