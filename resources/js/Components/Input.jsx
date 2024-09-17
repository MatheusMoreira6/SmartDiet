const Input = ({ label, name, type = "text", value, onChange }) => {
    return (
        <>
            <label htmlFor={name} className="form-label">
                {label}
            </label>

            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="form-control"
            />
        </>
    );
};

export default Input;
