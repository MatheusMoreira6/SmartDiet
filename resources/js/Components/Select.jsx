const Select = ({ name, options, value, onChange, required, autoFocus }) => {
    const selectOptions = [{ id: "", descricao: "Selecione..." }, ...options];

    return (
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            autoFocus={autoFocus}
            className="form-select"
        >
            {selectOptions.map((option, index) => (
                <option
                    key={index}
                    value={option.id}
                    disabled={option.id === ""}
                >
                    {option.descricao}
                </option>
            ))}
        </select>
    );
};

export default Select;
