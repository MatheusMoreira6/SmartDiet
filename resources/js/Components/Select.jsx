const Select = ({ name, options, value, onChange, autoFocus }) => {
    return (
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            autoFocus={autoFocus}
            className="form-select"
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
